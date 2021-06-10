export function createHeader() {
  return `
      <input 
        id="header-input"
        type="text" 
        class="input" 
        value="Новая таблица" 
      />

      <div>

        <div class="button" data-delete>
          <i class="material-icons" data-action="delete">delete</i>
        </div>

        <div class="button">
          <a href="#dashboard">
            <i class="material-icons">exit_to_app</i>
          </a>
        </div>

      </div>
    `;
}
