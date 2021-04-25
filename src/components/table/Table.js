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
      const resizeType = $resizer.data.resize;
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      const $tableElement = document.querySelector(`.${Table.className}`);
      const $cols = this.$root.findAll(`[data-col="${$parent.data.col}"]`);
      let resizeChangeSizeValue = 0;
      let value = 0;

      switch (resizeType) {
        case 'col':
          resizeChangeSizeValue = $tableElement.scrollHeight;
          $resizer.addClass('col-resize--active');
          $resizer.height(resizeChangeSizeValue);
          break;
        case 'row':
          resizeChangeSizeValue = $tableElement.scrollWidth;
          $resizer.addClass('row-resize--active');
          $resizer.width(resizeChangeSizeValue);
          break;
      }

      document.onmousemove = e => {
        let delta = 0;
        switch (resizeType) {
          case 'col':
            delta = e.pageX - coords.right;
            value = coords.width + delta;
            $resizer.css({right: `${-delta}px`});
            break;
          case 'row':
            delta = e.pageY - coords.bottom;
            value = coords.height + delta;
            $resizer.css({bottom: `${-delta}px`});
            break;
        }
      };

      document.onmouseup = () => {
        switch (resizeType) {
          case 'col':
            $cols.forEach(el => el.style.width = value + 'px');
            $resizer.removeClass('col-resize--active');
            $resizer.css({right: '0px'});
            $resizer.height('auto');
            break;
          case 'row':
            $parent.height(value);
            $resizer.removeClass('row-resize--active');
            $resizer.css({bottom: '0px'});
            $resizer.width('auto');
            break;
        }
        document.onmouseup = null;
        document.onmousemove = null;
      };
    }
  }
}
