if (typeof window !== 'undefined') {
  const render = require('github-buttons').render;

  function update() {
    let interval = setInterval(() => {
      const anchor = document.getElementById('github-stargazers');
      if (anchor) {
        clearInterval(interval);
        render(anchor, (el) => {
          anchor.parentElement.style.paddingTop = '0.5em';
          anchor.parentNode.replaceChild(el, anchor);
        });
      }
    }, 50);
  }

  update();

  module.exports = {
    onRouteUpdate() {
      update();
    },
  };
}
