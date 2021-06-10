import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import resize from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';
import {matrix, nextSelector} from '@/components/table/table.functions';
import * as actions from '@/store/actions';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable(20, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $firstCell = this.$root.find('[data-id="0:0"]');
    this.selectCell($firstCell);

    this.$on('formula:input', text => {
      this.selection.applyText(
          parse(text),
          text,
      );
      this.updateTextInStore();
    });
    this.$on('formula:enter', text => {
      this.selection.current.focus();
    });
    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds,
      }));
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
  }

  async resizeTable(event) {
    try {
      const data = await resize(event.target, this.$root, Table.className);
      this.$dispatch(actions.tableResize(data));
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

  updateTextInStore() {
    this.selection.group.forEach(($el) => {
      this.$dispatch(actions.changeText({
        id: $el.id(),
        value: $el.text,
      }));
    });
  }

  onInput(event) {
    this.$emit('table:input', this.selection.current.text);
    this.updateTextInStore();
  }
}

