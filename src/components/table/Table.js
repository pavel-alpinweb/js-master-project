import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['click'],
    });
  }
  onClick(event) {
    console.log('On click Table', event);
  }
  toHTML() {
    return createTable();
  }
}
