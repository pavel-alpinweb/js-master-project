export class TableSelection {
  constructor() {
    this.group = [];
  }

  select($el) {
    if (this.group.length > 0) {
      this.group.forEach($element => $element.removeClass('selected'));
      this.group.length = 0;
    }
    this.group.push($el);
    $el.addClass('selected');
    console.log(this.group);
  }

  selectGroup() {

  }
}
