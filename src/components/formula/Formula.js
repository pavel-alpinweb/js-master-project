import {ExcelComponent} from '@core/ExcelComponent';

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
  init() {
    super.init();

    this.$formula = this.$root.find('#formila-input');

    this.$on('table:select', $cell => {
      this.$formula.text = $cell.text;
    });
  }
  storeChanged({currentText}) {
    this.$formula.text = currentText;
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
