
const dom = new Proxy({}, {
  get: function(target, property) {
    return function(attrs, ...children) {
      const element = document.createElement(property);
      for (const attr of Object.keys(attrs || {})) {
        element.setAttribute(attr, attrs[attr]);
      }
      for (let child of children) {
        if (typeof child === 'string') {
          child = document.createTextNode(child);
        }
        element.appendChild(child);
      }
      return element;
    }
  }
});

const el = dom.div({},
  dom.h1({}, 'hello world'),
  dom.ul({},
    dom.li({}, 'h'),
    dom.li({}, 'e'),
    dom.li({}, 'l'),
    dom.li({}, 'l'),
    dom.li({}, 'o')
  )
);
document.body.appendChild(el);