import {ExcelComponent} from '@core/ExcelComponent';
import {TableSelection} from '@/components/table/TableSelection';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    });
  }
  toHTML() {
    return `
      <div class="info">fx</div>
      <div 
        id="formila-input" 
        class="input" 
        contenteditable 
        spellcheck="false"
       ></div>
    `;
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.$formula = this.$root.find('#formila-input');

    this.$on('table:select', $cell => {
      this.$formula.text = $cell.data.value;
    });
    this.$on('table:input', text => {
      console.log(text);
      this.$formula.text = text;
    });
  }
  onInput(event) {
    const text = event.target.textContent.trim();
    this.$emit('formula:input', text);
  }
  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      const text = event.target.textContent.trim();
      this.$emit('formula:enter', text);
    }
  }
}
