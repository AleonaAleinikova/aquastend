function who() {
  return document.querySelector('.js-handAnimation');
}

export default function handAnimation() {
  let holder;

  function findElements() {
    holder = document.querySelector('.js-handAnimation');
  }

  function addProperty(clientX, clientY) {
    console.dir(holder);
    const propX = clientX * .1;
    const propY = clientY * .1;
    holder.style.setProperty('--mouseX', propX + 'px');
    holder.style.setProperty('--mouseY', propY + 'px');
  }

  function onMousemove(event) {
    const { clientX, clientY } = event;
    addProperty(clientX, clientY);
  }

  function subscribe() {
    holder.addEventListener('mousemove', onMousemove);
  }

  function init() {
    if (who()) {
      findElements();
      subscribe();
    }
  }

  init();
}