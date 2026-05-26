# Organizador de Tarefas

Aplicacao web simples para organizar tarefas corporativas com categorias, checkboxes, filtro e cadastro de novos itens.

## Requisitos

- Node.js 20 ou superior
- npm 10 ou superior

## Como iniciar

1. Execute o arquivo iniciar-organizador.bat
2. Se preferir pelo terminal, rode npm install e depois npm start
3. Abra http://localhost:3210

## Recursos

- Banco de dados SQLite local criado automaticamente em data/organizador.db
- Categorias iniciais com as tarefas informadas
- Inclusao de novas categorias e novas tarefas
- Marcacao de tarefas concluidas
- Filtro por busca, status e prioridade
- Edicao, exclusao e mudanca de categoria

## Estrutura

- server.js: backend Express e API
- public/: interface web
- iniciar-organizador.bat: inicializacao rapida para servidor Windows