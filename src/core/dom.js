class Dom {}

export function $() {
  return new Dom;
}

$.create = (tagName, classes = '') => {
  const $el = document.createElement(tagName);
  $el.classList.add(classes);
  return $el;
};
