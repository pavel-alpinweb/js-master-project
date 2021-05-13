import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import resize from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';
import {matrix, nextSelector} from '@/components/table/table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
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
    this.selectCell($firstCell);

    this.$on('formula:input', text => {
      this.selection.current.text = text;
    });
    this.$on('formula:enter', text => {
      this.selection.current.focus();
      console.log(this.selection.current.text);
    });

    this.$subscribe(state => {
      console.log('Table state', state);
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  async resizeTable(event) {
    try {
      const data = await resize(event.target, this.$root, Table.className);
      this.$dispatch({type: 'TABLE_RESIZE', data});
    } catch (e) {
      new Error(e.message);
    }
  }

  async onMousedown(event) {
    await this.resizeTable(event);
    if (event.target.dataset.type === 'cell') {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ];

    const {key} = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();

      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target));
  }
}

