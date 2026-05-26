# Organizador de Tarefas

Aplicacao web simples para organizar tarefas corporativas com categorias, checkboxes, filtro e cadastro de novos itens.

## Requisitos

- Node.js 20 ou superior
- npm 10 ou superior

## Como iniciar

1. Em uso local, execute o arquivo iniciar-organizador.bat
2. Em servidor, execute iniciar-organizador.bat server para nao abrir navegador
3. A aplicacao nao depende de modulos nativos, entao funciona de forma mais estavel em servidores Windows
4. Se preferir pelo terminal, rode npm install e depois npm start
5. Abra http://localhost:3210

## Recursos

- Banco local em arquivo JSON criado automaticamente em data/organizador.json
- Categorias iniciais com as tarefas informadas
- Inclusao de novas categorias e novas tarefas
- Marcacao de tarefas concluidas
- Filtro por busca, status e prioridade
- Edicao, exclusao e mudanca de categoria

## Estrutura

- server.js: backend Express e API
- public/: interface web
- iniciar-organizador.bat: inicializacao rapida para servidor Windows