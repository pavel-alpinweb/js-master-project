export class TableSelection {
  static cellActiveClassName = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  clear() {
    if (this.group.length > 0) {
      this.group.forEach(
          $element => $element.removeClass(TableSelection.cellActiveClassName));
      this.group.length = 0;
    }
  }

  select($el) {
    this.clear();
    this.group.push($el);
    $el.addClass('selected');
    this.current = $el;
  }

  selectGroup($group = []) {
    this.clear();

    this.group = $group;
    this.group.forEach($el => $el.addClass(TableSelection.cellActiveClassName));
  }
}
