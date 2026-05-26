@echo off
setlocal

cd /d "%~dp0"

set "PORT=3210"
set "BASE_URL=http://localhost:%PORT%"
set "OPEN_BROWSER=1"

if /I "%~1"=="server" set "OPEN_BROWSER=0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js nao encontrado no servidor. Instale o Node.js e tente novamente.
  exit /b 1
)

if not exist node_modules (
  echo Instalando dependencias...
  call npm install
  if errorlevel 1 (
    echo Falha ao instalar dependencias.
    exit /b 1
  )
)

if not exist data mkdir data

call :check_running
if "%APP_RUNNING%"=="1" (
  echo Organizador ja esta em execucao em %BASE_URL%
  if "%OPEN_BROWSER%"=="1" start "" %BASE_URL%
  exit /b 0
)

echo Iniciando o organizador em uma nova janela...
start "Organizador Rafael" /D "%~dp0" cmd /k "npm start"

call :wait_until_ready
if "%APP_RUNNING%"=="1" (
  echo Organizador iniciado com sucesso em %BASE_URL%
  if "%OPEN_BROWSER%"=="1" start "" %BASE_URL%
  exit /b 0
)

echo O processo foi iniciado, mas a aplicacao nao respondeu em ate 20 segundos.
echo Verifique a janela "Organizador Rafael" para conferir o erro do servidor.
exit /b 1

endlocal

:check_running
set "APP_RUNNING="
powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $response = Invoke-WebRequest -UseBasicParsing '%BASE_URL%/api/bootstrap' -TimeoutSec 2; if ($response.StatusCode -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }"
if errorlevel 1 (
  set "APP_RUNNING=0"
) else (
  set "APP_RUNNING=1"
)
exit /b 0

:wait_until_ready
set "APP_RUNNING=0"
powershell -NoProfile -ExecutionPolicy Bypass -Command "$deadline = (Get-Date).AddSeconds(20); do { try { $response = Invoke-WebRequest -UseBasicParsing '%BASE_URL%/api/bootstrap' -TimeoutSec 2; if ($response.StatusCode -eq 200) { exit 0 } } catch {} Start-Sleep -Milliseconds 500 } while ((Get-Date) -lt $deadline); exit 1"
if errorlevel 1 (
  set "APP_RUNNING=0"
) else (
  set "APP_RUNNING=1"
)
exit /b 0