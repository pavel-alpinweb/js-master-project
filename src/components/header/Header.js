import {ExcelComponent} from '@core/ExcelComponent';
import {createHeader} from '@/components/header/header.template';
import * as actions from '@/store/actions';

export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }
  toHTML() {
    return createHeader();
  }
  init() {
    super.init();
    this.$headerInput = this.$root.find('#header-input');
    this.$headerInput.text = this.store.getState().tableName;
  }
  onInput(event) {
    this.$dispatch(actions.changeTableName(event.target.value));
  }
}
