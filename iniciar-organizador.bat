@echo off
setlocal

cd /d "%~dp0"

if not exist node_modules (
  echo Instalando dependencias...
  call npm install
)

if not exist data mkdir data

start "" http://localhost:3210
call npm start

endlocal