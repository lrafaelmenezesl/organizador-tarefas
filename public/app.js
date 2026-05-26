const state = {
  categories: [],
  summary: null,
  filters: {
    search: '',
    status: 'all',
    priority: 'all'
  }
};

const summaryGrid = document.getElementById('summaryGrid');
const board = document.getElementById('board');
const spotlightList = document.getElementById('spotlightList');
const taskForm = document.getElementById('taskForm');
const categoryForm = document.getElementById('categoryForm');
const taskCategorySelect = document.getElementById('taskCategorySelect');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const priorityFilter = document.getElementById('priorityFilter');
const taskCardTemplate = document.getElementById('taskCardTemplate');

const priorityLabels = {
  alta: 'Alta',
  media: 'Media',
  baixa: 'Baixa'
};

function formatDate(value) {
  if (!value) {
    return 'Agora';
  }

  const date = new Date(value.replace(' ', 'T'));
  if (Number.isNaN(date.getTime())) {
    return 'Agora';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
}

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Falha na requisicao.' }));
    throw new Error(error.error || 'Falha na requisicao.');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function populateCategoryOptions() {
  const options = state.categories
    .map((category) => `<option value="${category.id}">${category.name}</option>`)
    .join('');

  taskCategorySelect.innerHTML = options;
}

function renderSummary() {
  if (!state.summary) {
    summaryGrid.innerHTML = '';
    return;
  }

  const cards = [
    { label: 'Total de tarefas', value: state.summary.total },
    { label: 'Pendentes', value: state.summary.pending },
    { label: 'Concluidas', value: state.summary.completed },
    { label: 'Alta prioridade', value: state.summary.highPriority }
  ];

  summaryGrid.innerHTML = cards
    .map(
      (card) => `
        <article class="summary-card panel">
          <span>${card.label}</span>
          <strong>${card.value}</strong>
        </article>
      `
    )
    .join('');
}

function getFilteredTasks(tasks) {
  return tasks.filter((task) => {
    const search = state.filters.search.toLowerCase();
    const matchesSearch =
      !search ||
      task.title.toLowerCase().includes(search) ||
      task.details.toLowerCase().includes(search);

    const matchesStatus =
      state.filters.status === 'all' ||
      (state.filters.status === 'completed' && task.completed) ||
      (state.filters.status === 'pending' && !task.completed);

    const matchesPriority =
      state.filters.priority === 'all' || state.filters.priority === task.priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });
}

function renderSpotlight() {
  const tasks = state.categories
    .flatMap((category) => category.tasks.map((task) => ({ ...task, categoryName: category.name })))
    .filter((task) => !task.completed)
    .sort((first, second) => {
      const rank = { alta: 0, media: 1, baixa: 2 };
      return rank[first.priority] - rank[second.priority];
    })
    .slice(0, 8);

  spotlightList.innerHTML = tasks.length
    ? tasks
        .map(
          (task) => `
            <div class="spotlight__item">
              <strong>${task.title}</strong>
              <span>${task.categoryName}</span>
            </div>
          `
        )
        .join('')
    : '<p class="empty-state">Nenhuma tarefa critica encontrada.</p>';
}

function renderBoard() {
  const visibleCategories = state.categories
    .map((category) => ({
      ...category,
      visibleTasks: getFilteredTasks(category.tasks)
    }))
    .filter((category) => category.visibleTasks.length > 0 || state.filters.search === '');

  if (!visibleCategories.length) {
    board.innerHTML = '<div class="panel empty-state">Nenhum item encontrado com os filtros atuais.</div>';
    return;
  }

  board.innerHTML = '';

  visibleCategories.forEach((category) => {
    const column = document.createElement('section');
    column.className = 'category-column panel';
    column.style.setProperty('--category-color', category.color);

    const completedTasks = category.tasks.filter((task) => task.completed).length;
    const progress = category.tasks.length ? Math.round((completedTasks / category.tasks.length) * 100) : 0;

    column.innerHTML = `
      <header class="category-column__header">
        <div>
          <p class="eyebrow">${category.tasks.length} tarefas</p>
          <h2>${category.name}</h2>
        </div>
        <div class="progress-pill">${progress}%</div>
      </header>
      <div class="progress-bar"><span style="width: ${progress}%"></span></div>
      <div class="task-list"></div>
    `;

    const taskList = column.querySelector('.task-list');

    if (!category.visibleTasks.length) {
      taskList.innerHTML = '<p class="empty-state">Nenhuma tarefa visivel nesta categoria.</p>';
    } else {
      category.visibleTasks.forEach((task) => {
        const taskCard = taskCardTemplate.content.firstElementChild.cloneNode(true);
        taskCard.dataset.taskId = task.id;
        taskCard.querySelector('.task-toggle').checked = task.completed;
        taskCard.querySelector('.task-card__title').textContent = task.title;
        taskCard.querySelector('.task-card__details').textContent = task.details || 'Sem observacoes adicionais.';
        taskCard.querySelector('.priority-badge').textContent = priorityLabels[task.priority];
        taskCard.querySelector('.priority-badge').dataset.priority = task.priority;
        taskCard.querySelector('.task-card__date').textContent = `Atualizado em ${formatDate(task.updatedAt)}`;
        taskCard.classList.toggle('is-completed', task.completed);

        const select = taskCard.querySelector('.task-category-select');
        select.innerHTML = state.categories
          .map((item) => `<option value="${item.id}" ${item.id === category.id ? 'selected' : ''}>${item.name}</option>`)
          .join('');

        taskList.appendChild(taskCard);
      });
    }

    board.appendChild(column);
  });
}

function render() {
  renderSummary();
  renderSpotlight();
  renderBoard();
  populateCategoryOptions();
}

async function loadData() {
  const data = await request('/api/bootstrap');
  state.categories = data.categories;
  state.summary = data.summary;
  render();
}

async function createTask(formData) {
  await request('/api/tasks', {
    method: 'POST',
    body: JSON.stringify({
      title: formData.get('title'),
      categoryId: Number(formData.get('categoryId')),
      priority: formData.get('priority'),
      details: formData.get('details')
    })
  });

  taskForm.reset();
  await loadData();
}

async function createCategory(formData) {
  await request('/api/categories', {
    method: 'POST',
    body: JSON.stringify({
      name: formData.get('name'),
      color: formData.get('color')
    })
  });

  categoryForm.reset();
  await loadData();
}

async function updateTask(taskId, payload) {
  await request(`/api/tasks/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload)
  });

  await loadData();
}

taskForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    await createTask(new FormData(taskForm));
  } catch (error) {
    window.alert(error.message);
  }
});

categoryForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    await createCategory(new FormData(categoryForm));
  } catch (error) {
    window.alert(error.message);
  }
});

searchInput.addEventListener('input', (event) => {
  state.filters.search = event.target.value.trim();
  renderBoard();
});

statusFilter.addEventListener('change', (event) => {
  state.filters.status = event.target.value;
  renderBoard();
});

priorityFilter.addEventListener('change', (event) => {
  state.filters.priority = event.target.value;
  renderBoard();
});

board.addEventListener('change', async (event) => {
  const taskCard = event.target.closest('.task-card');
  if (!taskCard) {
    return;
  }

  const taskId = Number(taskCard.dataset.taskId);

  try {
    if (event.target.classList.contains('task-toggle')) {
      await updateTask(taskId, { completed: event.target.checked });
    }

    if (event.target.classList.contains('task-category-select')) {
      await updateTask(taskId, { categoryId: Number(event.target.value) });
    }
  } catch (error) {
    window.alert(error.message);
  }
});

board.addEventListener('click', async (event) => {
  const taskCard = event.target.closest('.task-card');
  if (!taskCard) {
    return;
  }

  const taskId = Number(taskCard.dataset.taskId);
  const task = state.categories.flatMap((category) => category.tasks).find((item) => item.id === taskId);

  if (!task) {
    return;
  }

  try {
    if (event.target.classList.contains('edit-task-button')) {
      const title = window.prompt('Editar titulo da tarefa', task.title);
      if (title === null) {
        return;
      }

      const details = window.prompt('Editar observacoes', task.details || '');
      if (details === null) {
        return;
      }

      const priority = window.prompt('Prioridade: alta, media ou baixa', task.priority);
      if (priority === null) {
        return;
      }

      await updateTask(taskId, { title, details, priority });
    }

    if (event.target.classList.contains('delete-task-button')) {
      const confirmed = window.confirm('Deseja excluir esta tarefa?');
      if (!confirmed) {
        return;
      }

      await request(`/api/tasks/${taskId}`, { method: 'DELETE' });
      await loadData();
    }
  } catch (error) {
    window.alert(error.message);
  }
});

loadData().catch((error) => {
  board.innerHTML = `<div class="panel empty-state">${error.message}</div>`;
});