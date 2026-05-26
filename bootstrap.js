const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const workspaceRoot = __dirname;
const packageManager = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const sqliteBinaryPath = path.join(
  workspaceRoot,
  'node_modules',
  'better-sqlite3',
  'build',
  'Release',
  'better_sqlite3.node'
);

function runPackageCommand(args, label) {
  console.log(label);

  const result = spawnSync(packageManager, args, {
    cwd: workspaceRoot,
    stdio: 'inherit',
    shell: false
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`Falha ao executar ${packageManager} ${args.join(' ')}`);
  }
}

function isAbiMismatch(error) {
  const message = String(error && error.message ? error.message : error);
  return (
    message.includes('NODE_MODULE_VERSION') ||
    message.includes('was compiled against a different Node.js version') ||
    message.includes('ERR_DLOPEN_FAILED')
  );
}

function ensureSqliteModule() {
  try {
    require('better-sqlite3');
    return;
  } catch (error) {
    if (!isAbiMismatch(error)) {
      throw error;
    }

    console.log('Incompatibilidade detectada no better-sqlite3 para esta versao do Node.js.');

    if (fs.existsSync(sqliteBinaryPath)) {
      fs.rmSync(sqliteBinaryPath, { force: true });
    }

    try {
      runPackageCommand(['rebuild', 'better-sqlite3'], 'Reconstruindo better-sqlite3...');
    } catch (_rebuildError) {
      runPackageCommand(['install'], 'Reconstrucao falhou. Reinstalando dependencias...');
    }

    delete require.cache[require.resolve('better-sqlite3')];
    require('better-sqlite3');
  }
}

function main() {
  ensureSqliteModule();

  if (process.argv.includes('--check-only')) {
    console.log('bootstrap-ok');
    return;
  }

  require('./server');
}

main();