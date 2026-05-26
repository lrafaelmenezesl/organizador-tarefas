const fs = require('fs');
const path = require('path');
const express = require('express');
const Database = require('better-sqlite3');

const PORT = Number(process.env.PORT) || 3210;
const app = express();

const dataDirectory = path.join(__dirname, 'data');
const databasePath = path.join(dataDirectory, 'organizador.db');

if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, { recursive: true });
}

const db = new Database(databasePath);
db.pragma('journal_mode = WAL');

const seedData = [
  {
    name: 'Certificado de Conteudo Local',
    color: '#c89a00',
    tasks: [
      'Solicitar emissao do certificado da NFe 007',
      'Solicitar emissao do certificado da NFe 006',
      'Solicitar emissao do certificado da NFe 044',
      'Solicitar emissao do certificado da NFe 043',
      'Solicitar emissao do certificado da NFe 041',
      'Solicitar emissao do certificado da NFe 012',
      'Solicitar emissao do certificado da NFe 013',
      'Solicitar emissao do certificado da NFe 014',
      'Refazer pedido de compra no novo sistema para emissao dos certificados'
    ].map((title) => ({ title, priority: 'alta' }))
  },
  {
    name: 'Organograma',
    color: '#111111',
    tasks: [
      { title: 'Elaborar um sistema de organograma para a empresa', priority: 'alta' }
    ]
  },
  {
    name: 'Sistema de Locacoes',
    color: '#5f5f5f',
    tasks: [
      { title: 'Testar e aprimorar o sistema de medicoes apos fichas cadastradas', priority: 'alta' },
      { title: 'Implementar medicoes em massa de locacoes', priority: 'alta' },
      { title: 'Corrigir a numeracao para padrao PT-BR', priority: 'media' }
    ]
  },
  {
    name: 'Sistema de RDC',
    color: '#8f6f00',
    tasks: [
      { title: 'Alimentar o sistema de RDC com BOQ', priority: 'alta' },
      { title: 'Alimentar com efetivo diario do contrato PF', priority: 'alta' },
      { title: 'Alimentar com efetivo diario do contrato NPO', priority: 'alta' },
      { title: 'Alimentar o banco de funcionarios PF', priority: 'media' },
      { title: 'Atualizar o banco de dados de funcionarios da NPO', priority: 'media' }
    ]
  },
  {
    name: 'Sistema EAP',
    color: '#222222',
    tasks: [
      { title: 'Alimentar sistema com peso dos contratos da P-84', priority: 'alta' },
      { title: 'Alimentar sistema com peso dos contratos da P-85', priority: 'alta' },
      { title: 'Alimentar controle de HH e peso mensal', priority: 'alta' },
      { title: 'Alimentar modulo de medicoes', priority: 'media' }
    ]
  },
  {
    name: 'Fechamento Speed',
    color: '#424242',
    tasks: [
      { title: 'Verificar custos', priority: 'alta' },
      { title: 'Emitir relatorio de faturamento e peso', priority: 'alta' },
      { title: 'Verificar saldo contratual', priority: 'alta' },
      { title: 'Analisar pagamentos de notas fiscais', priority: 'alta' },
      { title: 'Consultar aditivos', priority: 'media' },
      { title: 'Elaborar documentacao de encerramento', priority: 'alta' },
      { title: 'Cobrar carta de correcao da ultima nota fiscal recebida', priority: 'alta' },
      { title: 'Emitir nota fiscal de retorno de material industrializado', priority: 'alta' },
      { title: 'Emitir nota fiscal de retorno de material nao utilizado', priority: 'alta' },
      { title: 'Emitir nota fiscal de sucata', priority: 'media' },
      { title: 'Arquivar recibos de carga', priority: 'baixa' },
      { title: 'Realizar reuniao para conferir notas recebidas e notas em aberto', priority: 'alta' }
    ]
  },
  {
    name: 'Sistema de Custos',
    color: '#a67c00',
    tasks: [
      { title: 'Alimentar sistema com custos de abril', priority: 'alta' },
      { title: 'Alimentar sistema com custos de maio', priority: 'alta' },
      { title: 'Alimentar sistema com medicoes', priority: 'media' },
      { title: 'Alimentar sistema com notas fiscais', priority: 'media' }
    ]
  },
  {
    name: 'Orcamento Anual',
    color: '#000000',
    tasks: [
      { title: 'Implementar modulo de orcamento anual', priority: 'alta' },
      { title: 'Fazer cursos e treinamentos', priority: 'media' },
      { title: 'Verificar custo de aplicacao', priority: 'media' },
      { title: 'Alimentar com custos fechados da OS da Sylvamo', priority: 'alta' },
      { title: 'Fazer rateio de contratos atuais da Seatrium e lancar no orcamento anual', priority: 'alta' },
      { title: 'Verificar se o modulo pode ser limitado a OSs', priority: 'media' },
      { title: 'Aprender como acompanhar os saldos do orcamento', priority: 'media' },
      { title: 'Emitir relatorios', priority: 'media' }
    ]
  },
  {
    name: 'Petrobras',
    color: '#756000',
    tasks: [
      { title: 'Preencher formulario de cadastro Petrobras', priority: 'alta' },
      { title: 'Solicitar DRE 2025 da Metalmecanica e Servicos', priority: 'alta' }
    ]
  },
  {
    name: 'Contabilidade DRE',
    color: '#2d2d2d',
    tasks: [
      { title: 'Verificar com o cliente Seatrium adiantamentos e descontos', priority: 'alta' },
      { title: 'Verificar porque existe saldo no estoque de contratos encerrados', priority: 'alta' },
      { title: 'Realizar reuniao para ajustar e devolver materiais de estoque', priority: 'alta' },
      { title: 'Verificar e-mails anteriores relacionados a isso', priority: 'media' },
      { title: 'Conferir a melhor maneira de ajustar saldo de estoque de terceiro sem impactar o SPED', priority: 'alta' }
    ]
  },
  {
    name: 'Indicadores',
    color: '#4b3900',
    tasks: [
      { title: 'Preparar indicadores padrao para apresentar nas reunioes mensais', priority: 'alta' }
    ]
  },
  {
    name: 'Medicoes',
    color: '#121212',
    tasks: [
      { title: 'Acompanhar e cobrar medicoes da P-84 ja no portal', priority: 'alta' },
      { title: 'Acompanhar e cobrar medicoes da P-85 ainda indisponiveis no portal', priority: 'alta' },
      { title: 'Executar medicoes via RDC de P3 da P-84', priority: 'alta' },
      { title: 'Executar medicoes dos Trimers', priority: 'media' },
      { title: 'Executar medicao de mobilizacao Sylvamo', priority: 'media' },
      { title: 'Executar medicao de preparativos Sylvamo', priority: 'media' },
      { title: 'Executar medicao de servicos Sylvamo', priority: 'media' },
      { title: 'Executar medicao de databook Sylvamo', priority: 'media' },
      { title: 'Acompanhar correcao das notas fiscais da Cenibra e datas de pagamento', priority: 'alta' }
    ]
  },
  {
    name: 'Sistema Cenibra',
    color: '#906f00',
    tasks: [
      { title: 'Corrigir o sistema para inserir tabelas padrao de peso e gerar relatorio', priority: 'alta' },
      { title: 'Balancear itens de soldagem', priority: 'media' },
      { title: 'Conferir todos os itens do contrato com Paulo e Nathan', priority: 'alta' },
      { title: 'Desenvolver sistema que desenhe isometricos', priority: 'alta' }
    ]
  },
  {
    name: 'Sistema Comercial',
    color: '#1f1f1f',
    tasks: [
      { title: 'Alimentar medicoes', priority: 'media' }
    ]
  },
  {
    name: 'Contratos',
    color: '#c09600',
    tasks: [
      { title: 'Emitir documentacao de termino de servico de todos os contratos da Seatrium', priority: 'alta' },
      { title: 'Verificar saldo e vencimento de todos os contratos vigentes', priority: 'alta' }
    ]
  }
];

function normalizePriority(priority) {
  const allowed = ['alta', 'media', 'baixa'];
  return allowed.includes(priority) ? priority : 'media';
}

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function mapTask(row) {
  return {
    id: row.id,
    categoryId: row.category_id,
    title: row.title,
    details: row.details,
    priority: row.priority,
    completed: Boolean(row.completed),
    position: row.position,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function setupDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      color TEXT NOT NULL DEFAULT '#111111',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      details TEXT NOT NULL DEFAULT '',
      priority TEXT NOT NULL DEFAULT 'media',
      completed INTEGER NOT NULL DEFAULT 0,
      position INTEGER NOT NULL DEFAULT 0,
      is_seed INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    );
  `);

  const totalCategories = db.prepare('SELECT COUNT(*) AS total FROM categories').get().total;

  if (totalCategories > 0) {
    return;
  }

  const insertCategory = db.prepare(
    'INSERT INTO categories (name, color, sort_order) VALUES (?, ?, ?)'
  );
  const insertTask = db.prepare(
    `INSERT INTO tasks (category_id, title, details, priority, completed, position, is_seed)
     VALUES (?, ?, ?, ?, 0, ?, 1)`
  );

  const seedTransaction = db.transaction(() => {
    seedData.forEach((category, categoryIndex) => {
      const result = insertCategory.run(category.name, category.color, categoryIndex);
      category.tasks.forEach((task, taskIndex) => {
        insertTask.run(
          result.lastInsertRowid,
          task.title,
          task.details || '',
          normalizePriority(task.priority),
          taskIndex
        );
      });
    });
  });

  seedTransaction();
}

function getCategoriesWithTasks() {
  const categories = db
    .prepare('SELECT id, name, color, sort_order AS sortOrder, created_at AS createdAt FROM categories ORDER BY sort_order, id')
    .all()
    .map((category) => ({ ...category, tasks: [] }));

  const tasks = db
    .prepare(
      `SELECT id, category_id, title, details, priority, completed, position, created_at, updated_at
       FROM tasks
       ORDER BY completed ASC,
                CASE priority WHEN 'alta' THEN 0 WHEN 'media' THEN 1 ELSE 2 END,
                position,
                id`
    )
    .all()
    .map(mapTask);

  const categoryMap = new Map(categories.map((category) => [category.id, category]));
  tasks.forEach((task) => {
    const category = categoryMap.get(task.categoryId);
    if (category) {
      category.tasks.push(task);
    }
  });

  return categories;
}

setupDatabase();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/R.jpg', (_request, response) => {
  response.sendFile(path.join(__dirname, 'R.jpg'));
});

app.get('/api/bootstrap', (_request, response) => {
  const categories = getCategoriesWithTasks();
  const allTasks = categories.flatMap((category) => category.tasks);
  const summary = {
    total: allTasks.length,
    completed: allTasks.filter((task) => task.completed).length,
    pending: allTasks.filter((task) => !task.completed).length,
    highPriority: allTasks.filter((task) => !task.completed && task.priority === 'alta').length
  };

  response.json({ categories, summary });
});

app.post('/api/categories', (request, response) => {
  const name = normalizeString(request.body.name);
  const color = normalizeString(request.body.color) || '#111111';

  if (!name) {
    return response.status(400).json({ error: 'Informe um nome para a categoria.' });
  }

  const nextOrder = db.prepare('SELECT COALESCE(MAX(sort_order), -1) + 1 AS nextOrder FROM categories').get().nextOrder;
  const result = db.prepare('INSERT INTO categories (name, color, sort_order) VALUES (?, ?, ?)').run(name, color, nextOrder);

  return response.status(201).json({
    id: result.lastInsertRowid,
    name,
    color,
    sortOrder: nextOrder,
    tasks: []
  });
});

app.post('/api/tasks', (request, response) => {
  const title = normalizeString(request.body.title);
  const details = normalizeString(request.body.details);
  const categoryId = Number(request.body.categoryId);
  const priority = normalizePriority(normalizeString(request.body.priority));

  if (!title) {
    return response.status(400).json({ error: 'Informe um titulo para a tarefa.' });
  }

  const category = db.prepare('SELECT id FROM categories WHERE id = ?').get(categoryId);
  if (!category) {
    return response.status(400).json({ error: 'Categoria invalida.' });
  }

  const nextPosition = db
    .prepare('SELECT COALESCE(MAX(position), -1) + 1 AS nextPosition FROM tasks WHERE category_id = ?')
    .get(categoryId).nextPosition;

  const result = db.prepare(
    `INSERT INTO tasks (category_id, title, details, priority, completed, position, updated_at)
     VALUES (?, ?, ?, ?, 0, ?, CURRENT_TIMESTAMP)`
  ).run(categoryId, title, details, priority, nextPosition);

  const task = db
    .prepare(
      `SELECT id, category_id, title, details, priority, completed, position, created_at, updated_at
       FROM tasks
       WHERE id = ?`
    )
    .get(result.lastInsertRowid);

  return response.status(201).json(mapTask(task));
});

app.patch('/api/tasks/:id', (request, response) => {
  const taskId = Number(request.params.id);
  const currentTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(taskId);

  if (!currentTask) {
    return response.status(404).json({ error: 'Tarefa nao encontrada.' });
  }

  const title = request.body.title === undefined ? currentTask.title : normalizeString(request.body.title);
  const details = request.body.details === undefined ? currentTask.details : normalizeString(request.body.details);
  const priority = request.body.priority === undefined ? currentTask.priority : normalizePriority(normalizeString(request.body.priority));
  const completed = request.body.completed === undefined ? currentTask.completed : request.body.completed ? 1 : 0;
  const categoryId = request.body.categoryId === undefined ? currentTask.category_id : Number(request.body.categoryId);

  if (!title) {
    return response.status(400).json({ error: 'Informe um titulo valido.' });
  }

  const category = db.prepare('SELECT id FROM categories WHERE id = ?').get(categoryId);
  if (!category) {
    return response.status(400).json({ error: 'Categoria invalida.' });
  }

  db.prepare(
    `UPDATE tasks
     SET category_id = ?, title = ?, details = ?, priority = ?, completed = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`
  ).run(categoryId, title, details, priority, completed, taskId);

  const updatedTask = db
    .prepare(
      `SELECT id, category_id, title, details, priority, completed, position, created_at, updated_at
       FROM tasks
       WHERE id = ?`
    )
    .get(taskId);

  return response.json(mapTask(updatedTask));
});

app.delete('/api/tasks/:id', (request, response) => {
  const taskId = Number(request.params.id);
  const result = db.prepare('DELETE FROM tasks WHERE id = ?').run(taskId);

  if (!result.changes) {
    return response.status(404).json({ error: 'Tarefa nao encontrada.' });
  }

  return response.status(204).send();
});

app.get('/', (_request, response) => {
  response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Organizador disponivel em http://localhost:${PORT}`);
});