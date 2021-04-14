const CODES = {
  A: 65,
  Z: 90,
};

// function createCell() {
//   <div className="cell" contentEditable="">B2</div>;
// }

function toColumn(content) {
  return `
    <div class="column">
      ${content}
    </div>
  `;
}

function toCell(content) {
  return `
    <div class="cell" contenteditable="">
        ${content}
    </div>
   `;
}

function createRow(index, content = '') {
  return `
    <div class="row">
        <div class="row-info">
            ${index ? index : ''}
        </div>
        <div class="row-data">
            ${content}
        </div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');
  const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('');
  const rows = [];
  rows.push(createRow(null, cols));
  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, cells));
  }
  return rows.join('');
}
