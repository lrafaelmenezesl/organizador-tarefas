const fs = require('fs');
const path = require('path');
const express = require('express');

const PORT = Number(process.env.PORT) || 3210;
const app = express();

const dataDirectory = path.join(__dirname, 'data');
const databasePath = path.join(dataDirectory, 'organizador.json');

if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, { recursive: true });
}

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

function createTimestamp() {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

function createInitialStore() {
  const createdAt = createTimestamp();
  let nextCategoryId = 1;
  let nextTaskId = 1;

  const categories = seedData.map((category, categoryIndex) => {
    const categoryId = nextCategoryId;
    nextCategoryId += 1;

    return {
      id: categoryId,
      name: category.name,
      color: category.color,
      sortOrder: categoryIndex,
      createdAt
    };
  });

  const tasks = seedData.flatMap((category, categoryIndex) => {
    const categoryId = categoryIndex + 1;

    return category.tasks.map((task, taskIndex) => {
      const item = {
        id: nextTaskId,
        categoryId,
        title: task.title,
        details: task.details || '',
        priority: normalizePriority(task.priority),
        completed: false,
        position: taskIndex,
        createdAt,
        updatedAt: createdAt
      };

      nextTaskId += 1;
      return item;
    });
  });

  return {
    meta: {
      nextCategoryId,
      nextTaskId
    },
    categories,
    tasks
  };
}

function writeStore(store) {
  fs.writeFileSync(databasePath, JSON.stringify(store, null, 2), 'utf8');
}

function ensureStore() {
  if (!fs.existsSync(databasePath)) {
    writeStore(createInitialStore());
    return;
  }

  const currentStore = readStore();
  if (!Array.isArray(currentStore.categories) || !Array.isArray(currentStore.tasks)) {
    writeStore(createInitialStore());
  }
}

function readStore() {
  return JSON.parse(fs.readFileSync(databasePath, 'utf8'));
}

function updateStore(updater) {
  const currentStore = readStore();
  const nextStore = updater(currentStore) || currentStore;
  writeStore(nextStore);
  return nextStore;
}

function mapTask(row) {
  return {
    id: row.id,
    categoryId: row.categoryId,
    title: row.title,
    details: row.details,
    priority: row.priority,
    completed: Boolean(row.completed),
    position: row.position,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}

function getCategoriesWithTasks() {
  const store = readStore();
  const categories = [...store.categories]
    .sort((first, second) => first.sortOrder - second.sortOrder || first.id - second.id)
    .map((category) => ({ ...category, tasks: [] }));

  const priorityRank = { alta: 0, media: 1, baixa: 2 };
  const tasks = [...store.tasks]
    .sort((first, second) => {
      return (
        Number(first.completed) - Number(second.completed) ||
        priorityRank[first.priority] - priorityRank[second.priority] ||
        first.position - second.position ||
        first.id - second.id
      );
    })
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

ensureStore();

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

  let createdCategory;
  updateStore((store) => {
    const nextOrder = store.categories.reduce((maxOrder, category) => Math.max(maxOrder, category.sortOrder), -1) + 1;
    createdCategory = {
      id: store.meta.nextCategoryId,
      name,
      color,
      sortOrder: nextOrder,
      createdAt: createTimestamp()
    };

    store.meta.nextCategoryId += 1;
    store.categories.push(createdCategory);
    return store;
  });

  return response.status(201).json({
    ...createdCategory,
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

  const store = readStore();
  const category = store.categories.find((item) => item.id === categoryId);
  if (!category) {
    return response.status(400).json({ error: 'Categoria invalida.' });
  }

  const nextPosition = store.tasks
    .filter((task) => task.categoryId === categoryId)
    .reduce((maxPosition, task) => Math.max(maxPosition, task.position), -1) + 1;

  let createdTask;
  updateStore((currentStore) => {
    const timestamp = createTimestamp();
    createdTask = {
      id: currentStore.meta.nextTaskId,
      categoryId,
      title,
      details,
      priority,
      completed: false,
      position: nextPosition,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    currentStore.meta.nextTaskId += 1;
    currentStore.tasks.push(createdTask);
    return currentStore;
  });

  return response.status(201).json(mapTask(createdTask));
});

app.patch('/api/tasks/:id', (request, response) => {
  const taskId = Number(request.params.id);
  const store = readStore();
  const currentTask = store.tasks.find((task) => task.id === taskId);

  if (!currentTask) {
    return response.status(404).json({ error: 'Tarefa nao encontrada.' });
  }

  const title = request.body.title === undefined ? currentTask.title : normalizeString(request.body.title);
  const details = request.body.details === undefined ? currentTask.details : normalizeString(request.body.details);
  const priority = request.body.priority === undefined ? currentTask.priority : normalizePriority(normalizeString(request.body.priority));
  const completed = request.body.completed === undefined ? currentTask.completed : Boolean(request.body.completed);
  const categoryId = request.body.categoryId === undefined ? currentTask.categoryId : Number(request.body.categoryId);

  if (!title) {
    return response.status(400).json({ error: 'Informe um titulo valido.' });
  }

  const category = store.categories.find((item) => item.id === categoryId);
  if (!category) {
    return response.status(400).json({ error: 'Categoria invalida.' });
  }

  let updatedTask;
  updateStore((currentStore) => {
    const taskIndex = currentStore.tasks.findIndex((task) => task.id === taskId);
    currentStore.tasks[taskIndex] = {
      ...currentStore.tasks[taskIndex],
      categoryId,
      title,
      details,
      priority,
      completed,
      updatedAt: createTimestamp()
    };

    updatedTask = currentStore.tasks[taskIndex];
    return currentStore;
  });

  return response.json(mapTask(updatedTask));
});

app.delete('/api/tasks/:id', (request, response) => {
  const taskId = Number(request.params.id);
  let removed = false;
  updateStore((store) => {
    const initialLength = store.tasks.length;
    store.tasks = store.tasks.filter((task) => task.id !== taskId);
    removed = store.tasks.length !== initialLength;
    return store;
  });

  if (!removed) {
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