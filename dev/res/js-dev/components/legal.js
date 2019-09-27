// табы на стр с политиками

function who() {
  return document.querySelector('.js-tabsHolder');
}

function removeLinkClass(active, links) {
  links[active].classList.remove('legalNavLink-is-active');
}

function addLinkClass(index, links) {
  links[index].classList.add('legalNavLink-is-active');
}

export default function legal() {
  let holder;
  let links;
  let active = 0;

  function findElements() {
    holder = document.querySelector('.js-tabsHolder');
    links = [].slice.call(document.querySelectorAll('.js-tab'));
  }

  function addHolderClass(index) {
    holder.className = `legalTabs legalTabs-${index + 1}-is-active js-tabsHolder`;
  }

  function changeTab(index) {
    removeLinkClass(active, links);
    addLinkClass(index, links);
    addHolderClass(index);
    active = index;
  }

  function onClick(event) {
    event.preventDefault();
    const { target } = event;
    const index = links.indexOf(target);
    if (index >= 0) changeTab(index);
  }

  function subscribe() {
    holder.addEventListener('click', onClick);
  }

  function init() {
    if (who()) {
      findElements();
      subscribe();
    }
  }

  init()
}