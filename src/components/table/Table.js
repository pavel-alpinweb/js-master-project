import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@/core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['click', 'mousedown', 'mouseup'],
    });
  }
  onClick(event) {
    console.log('On click Table', event);
  }
  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $target = $(event.target);
      const $parent = $target.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();

      document.onmousemove = e => {
        const delta = Math.floor(e.pageX - coords.right);
        const value = coords.width + delta;
        $parent.$el.style.width = value + 'px';
        console.log(delta);
      };

      document.onmouseup = e => {
        document.onmousemove = null;
      };
    }
  }
  onMouseup(event) {
    console.log('On mouseup Table', event);
  }
  toHTML() {
    return createTable();
  }
}
