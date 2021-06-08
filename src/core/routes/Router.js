import {$} from '@core/dom';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }

    this.$placeholder = $(selector);
    this.routes = routes;
    this.currentPage = null;

    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler() {
    this.$placeholder.clear();
    if (this.currentPage) this.currentPage.destroy();
    const currentPath = ActiveRoute.page;
    console.log(currentPath);
    const Page = this.routes[currentPath] || this.routes.dashboard;
    this.currentPage = new Page(ActiveRoute.param);
    this.$placeholder.append(this.currentPage.getRoot());

    this.currentPage.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
