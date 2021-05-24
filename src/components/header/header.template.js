export function createHeader() {
  return `
      <input 
        id="header-input"
        type="text" 
        class="input" 
        value="Новая таблица" 
      />

      <div>

        <div class="button">
          <i class="material-icons">delete</i>
        </div>

        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>

      </div>
    `;
}
