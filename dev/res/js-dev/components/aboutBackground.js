
// для страницы истории.для создания эффекта паралакса

function who() {
  return document.querySelector('.history-1');
}

export default function aboutBackground() {
  let holder;
  let height;

  function findElements() {
    holder = document.querySelector('.history-1');
    height = window.innerHeight;
  }

  function addProperty() {
    const { scrollY } = window;
    if (scrollY < height) {
      const position = scrollY / 15;
      holder.style.setProperty('--scroll', position + 'px');
    }
  }

  function onScroll(event) {
    addProperty();
  }

  function subscribe() {
    document.addEventListener('scroll', onScroll);
  }

  function init() {
    if (who()) {
      findElements();
      subscribe();
    }
  }

  init();
}