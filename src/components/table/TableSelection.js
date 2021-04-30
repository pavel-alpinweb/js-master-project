export class TableSelection {
  static cellActiveClassName = 'selected';

  constructor() {
    this.group = [];
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
    console.log(this.group);
  }

  selectGroup() {

  }
}
