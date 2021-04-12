const CODES = {
  A: 65,
  Z: 90,
};

// function createCell() {
//   <div className="cell" contentEditable="">B2</div>;
// }

function toColumn(content, editable = true) {
  const column = editable ?
  `
    <div class="cell" contenteditable="">
        ${content}
    </div>
   `:
    `
    <div class="column">
      ${content}
    </div>
  `
   ;
  return column;
}

function createRow(content = '') {
  return `
    <div class="row">
        <div class="row-info">
        
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
  const headCols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map((el) => {
        return toColumn(el, false);
      })
      .join('');
  let editableCols = [];
  for (let i = 0; i < colsCount; i++) {
    editableCols.push(toColumn('', true));
  }
  editableCols = editableCols.join('');
  const rows = [];
  rows.push(createRow(headCols));
  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(editableCols));
  }
  return rows.join('');
}
