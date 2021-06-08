import {ExcelComponent} from '@core/ExcelComponent';
import {createHeader} from '@/components/header/header.template';
import * as actions from '@/store/actions';
import {$} from '@/core/dom';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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
  onClick(event) {
    const target = $(event.target);
    if (target.data.action === 'delete') {
      const id = ActiveRoute.param;
      const decision = confirm('Удалить текущую таблицу?');
      if (decision) {
        localStorage.removeItem(`excel:${id}`);
        ActiveRoute.push('dashboard');
      }
    }
  }
}
