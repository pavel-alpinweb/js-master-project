import {storage} from '@core/utils';

function toHTML(key) {
  const id = key.replace('excel:', '');
  const table = storage(key);
  const date = new Date(Number(id));
  return `
    <li class="db__record">
      <a href="#excel/${id}">${table.tableName}</a>
      <strong>${date.toLocaleString('ru-RU')}</strong>
    </li>
  `;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }
  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();

  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы</p>`;
  }

  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>

    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `;
}

