import {$} from '@core/dom';
import {ActiveRoute} from '@core/routes/ActiveRoute';
import {Loader} from '../../components/Loader';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }

    this.$placeholder = $(selector);
    this.routes = routes;
    this.loader = new Loader();
    this.currentPage = null;

    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  async changePageHandler() {
    this.$placeholder.clear().append(this.loader);
    if (this.currentPage) this.currentPage.destroy();
    const currentPath = ActiveRoute.page;
    const Page = this.routes[currentPath] || this.routes.dashboard;
    this.currentPage = new Page(ActiveRoute.param);
    const root = await this.currentPage.getRoot();
    this.$placeholder.clear().append(root);

    this.currentPage.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
