// для главной стр.анимация для фактов

function who() {
  return document.querySelector('.advantages');
}

export default function advantages() {
  let elements;

  function findElements() {
    elements = [].slice.call(document.querySelectorAll('.advantage'));
  }

  function addActiveClass(target) {
    if (elements.indexOf(target) >= 0) target.classList.add('advantage-is-active');
  }

  function removeActiveClass(target) {
    if (elements.indexOf(target) >= 0) target.classList.remove('advantage-is-active');
  }

  function onHover(event) {
    const { target } = event;
    addActiveClass(target);
  }

  function onEnd(event) {
    const { target } = event;
    removeActiveClass(target);
  }

  function subscribe() {
    elements.forEach(element => {
      element.addEventListener('mouseover', onHover);
    });
    elements.forEach(element => {
      element.addEventListener('animationend', onEnd);
    });
  }

  function init() {
    if (who()) {
      findElements();
      subscribe();
    }
  }

  init();
}
