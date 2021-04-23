import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(20);
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      const $tableElement = document.querySelector(`.${Table.className}`);
      const tableHeight = $tableElement.scrollHeight;
      let value = 0;
      $resizer.addClass('col-resize--active');
      $resizer.$el.style.height = tableHeight + 'px';
      console.log(tableHeight);

      document.onmousemove = e => {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.$el.style.right = -delta + 'px';
      };

      document.onmouseup = () => {
        $parent.$el.style.width = value + 'px';
        document.querySelectorAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value + 'px');
        $resizer.removeClass('col-resize--active');
        $resizer.$el.style.right = '0';
        $resizer.$el.style.height = 'auto';
        document.onmousemove = null;
      };
    }
  }
}
