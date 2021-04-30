import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import resize from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'click'],
    });
  }

  toHTML() {
    return createTable(20);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $firstCell = this.$root.find('[data-id="0:0"]');
    this.selection.select($firstCell);
  }

  onMousedown(event) {
    resize(event.target, this.$root, Table.className);
  }

  onClick(event) {
    if (event.target.dataset.type === 'cell') {
      this.selection.select($(event.target));
    }
  }
}
