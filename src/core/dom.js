class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
      document.querySelector(selector) :
      selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  width(value = 'auto') {
    if (typeof value === 'string') {
      this.$el.style.width = value;
    } else {
      this.$el.style.width = value + 'px';
    }
    return this;
  }

  height(value = 'auto') {
    if (typeof value === 'string') {
      this.$el.style.height = value;
    } else {
      this.$el.style.height = value + 'px';
    }
    return this;
  }
  css(stylesList = {}) {
    for (const style in stylesList) {
      // eslint-disable-next-line no-prototype-builtins
      if (stylesList.hasOwnProperty(style)) {
        this.$el.style[style] = stylesList[style];
      }
    }
  }

  addClass(string = '') {
    this.$el.classList.add(string);
    return this;
  }

  removeClass(string = '') {
    this.$el.classList.remove(string);
    return this;
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }

    return this;
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  get data() {
    return this.$el.dataset;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }
}

// event.target
export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
