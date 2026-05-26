function main() {
  if (process.argv.includes('--check-only')) {
    console.log('bootstrap-ok');
    return;
  }

  require('./server');
}

main();