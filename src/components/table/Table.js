import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      name: 'Table',
      // listeners: ['click', 'mousedown', 'mousemove', 'mouseup'],
    });
  }
  // onClick(event) {
  //   console.log('On click Table', event);
  // }
  // onMousedown(event) {
  //   console.log('On mousedown Table', event);
  // }
  // onMousemove(event) {
  //   console.log('On mousemove Table', event);
  // }
  // onMouseup(event) {
  //   console.log('On mouseup Table', event);
  // }
  toHTML() {
    return createTable();
  }
}
