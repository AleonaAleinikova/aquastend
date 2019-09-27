import * as swiper from 'patterns/tx-slider';

function who() {
  return document.querySelector('.js-slider');
}

export default function slider() {
  let container;
  let parent;
  let slides;
  let dots;
  let gallery;
  let pagination;
  let dotsList;
  let body;
  let timeout;
  let start;
  let height;

  function findElements() {
    container = document.querySelector('.js-slider');
    parent = container.parentElement;
    slides = [].slice.call(container.querySelectorAll('.heroSlide'));
    body = document.body;
    height = window.innerHeight;
    body.style.setProperty('--height', height + 'px');
  }

  function initSlider() {
    dots = swiper.dots(slides.length, 'js-sliderDots heroPagination', 'js-sliderDot heroDot');
    gallery = swiper.init(container, dots, 'js-sliderDot');
    parent.appendChild(dots);
    pagination = parent.querySelector('.js-sliderDots');
    dotsList = [].slice.call(parent.querySelectorAll('.js-sliderDot'));
    gallery.slide(0);
    body.classList.add('withoutScroll', 'fixed');
  }

  function findDot(target) {
    const index = dotsList.indexOf(target);
    if (index >= 0) gallery.slide(index);
  }

  function onDot(event) {
    const { target } = event;
    findDot(target);
  }

  function selectWay(way) {
    console.log(way);
    if (way && gallery.current() !== 2) {
      timeout = setTimeout(subscribeWheel, 800);
      gallery.next();
    } else if (way && gallery.current() === 2) {
      const height = window.innerHeight;
      body.classList.add('animationScroll');
      body.classList.remove('withoutScroll', 'fixed');
      clearTimeout(timeout);
      document.removeEventListener('wheel', onWheel, false);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('touchstart', onTouch, false);
    } else {
      gallery.prev();
      timeout = setTimeout(subscribeWheel, 800);
    }
  }

  function onKey(event) {
    event.preventDefault();
    const { keyCode } = event;
    if (keyCode === 40) selectWay(keyCode);
    else if (keyCode === 38) selectWay(false);
  }

  function unsubscribeWheel() {
    document.removeEventListener('wheel', onWheel, false);
    document.removeEventListener('touchstart', onTouch, false);
  }

  function subscribeWheel() {
    document.addEventListener('wheel', onWheel, false);
    document.addEventListener('touchstart', onTouch, false);
  }

  function onWheel(event) {
    unsubscribeWheel();
    event.preventDefault();
    const { deltaY } = event;
    selectWay(deltaY > 0);
  }

  function onTouchMove(event) {
    event.preventDefault();
    const currentCord = event.touches[0].pageY;
    selectWay(currentCord > start);
      document.removeEventListener('touchmove', onTouchMove, false);
    document.removeEventListener('touchend', onTouchEnd, false);
    document.removeEventListener('touchstart', onTouch, false);
  }

  function onTouchEnd(event) {
    document.removeEventListener('touchmove', onTouchMove, false);
    document.removeEventListener('touchend', onTouchEnd, false);
    document.removeEventListener('touchstart', onTouch, false);
  }

  function onTouch(event) {
    event.preventDefault();
    start = event.touches[0].pageX;
    document.addEventListener('touchmove', onTouchMove, false);
    document.addEventListener('touchend', onTouchEnd, false);
  }

  function resetEvents() {
    document.addEventListener('keydown', onKey);
    document.addEventListener('wheel', onWheel, false);
    document.addEventListener('touchstart', onTouch, false);
    body.classList.remove('animationScroll');
    body.classList.add('withoutScroll', 'fixed');
  }

  function onScroll(event) {
    if (window.pageYOffset === 0) resetEvents();
  }

  function subscribe() {
    pagination.addEventListener('click', onDot);
    pagination.addEventListener('touchstart', onDot);
    document.addEventListener('keydown', onKey);
    document.addEventListener('wheel', onWheel, false);
    document.addEventListener('touchstart', onTouch, false);
    document.addEventListener('scroll', onScroll);
  }

  function init() {
    if (who()) {
      findElements();
      initSlider();
      subscribe();
    }
  }

  init();
}