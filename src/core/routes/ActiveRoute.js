export class ActiveRoute {
  static get path() {
    return window.location.hash.slice(1);
  }

  static get param() {
    return ActiveRoute.path.split('/')[1];
  }

  static get page() {
    return ActiveRoute.path.split('/')[0];
  }

  static push(path) {
    window.location.replace(`#${path}`);
  }
}
