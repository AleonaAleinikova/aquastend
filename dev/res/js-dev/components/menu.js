function addActiveClass(menu) {
  menu.classList.add('menu-is-active');
}

function removeActiveClass(menu) {
  menu.classList.remove('menu-is-active');
}

export default function menu() {
  let menu;
  let openLink;
  let closeLink;

  function findElements() {
    menu = document.querySelector('.menu');
    openLink = document.querySelector('.menuLink');
    closeLink = document.querySelector('.menuClose');
  }

  function onOpenClick() {
    addActiveClass(menu);
  }

  function onCloseCLick() {
    removeActiveClass(menu);
  }

  function subscribe() {
    openLink.addEventListener('click', onOpenClick);
    closeLink.addEventListener('click', onCloseCLick);
  }

  function init() {
    findElements();
    subscribe();
  }

  init();
}