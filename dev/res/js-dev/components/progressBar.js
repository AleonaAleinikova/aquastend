function who() {
  return document.querySelector('.progress');
}

function isStep(target) {
  return target.classList.contains('js-progressLink');
}

export default function progressBar() {
  let progress;
  let progressButton;
  let progressSteps;
  let imageHolder;
  let width;
  let stepSize;
  let position = 0;
  let start;
  let maxShift;

  function findElements() {
    progress = document.querySelector('.progress');
    progressButton = document.querySelector('.progressButton');
    progressSteps = document.querySelector('.progressSteps');
    imageHolder = document.querySelector('.progressImageHolder');
  }

  function initSize() {
    width = progress.clientWidth - 38;
    stepSize = width / 3;
    maxShift = stepSize * 3;
  }

  function changeStep(step) {
    const shift = stepSize * step;
    position = shift;
    progress.style.setProperty('--position', position + 'px');
    imageHolder.className = `progressImageHolder progressImageHolder-${step}-is-active`;
  }

  function checkPosition(shift) {
    const step = Math.round(shift / stepSize);
    console.log(shift, maxShift, step);
    imageHolder.className = `progressImageHolder progressImageHolder-${step}-is-active`;
  }

  function updatePosition(currentShift) {
    const shift = position + currentShift;
    if (shift <= maxShift && shift >= 0) progress.style.setProperty('--position', shift + 'px');
    else if (shift >= maxShift) progress.style.setProperty('--position', maxShift + 'px');
    else progress.style.setProperty('--position', 0 + 'px');
    checkPosition(shift);
  }

  function calculateStep(shift) {
    const step = Math.round((position + shift) / stepSize);
    changeStep(step);
  }

  function onClick(event) {
    event.preventDefault();
    const { target } = event;
    if (isStep(target)) changeStep(target.dataset.step);
  }

  function onMousemove(event) {
    const shift = event.clientX - start;
    updatePosition(shift);
  }

  function onMouseup(event) {
    const shift = event.clientX - start;
    progress.classList.add('progress-is-active');
    calculateStep(shift);
    progressButton.removeEventListener('mousemove', onMousemove);
    progressButton.removeEventListener('mouseup', onMouseup);
    progressButton.removeEventListener('mouseout', onMouseup);
  }

  function onMousedown(event) {
    start = event.clientX;
    progress.classList.add('progress-is-active');
    progressButton.addEventListener('mousemove', onMousemove);
    progressButton.addEventListener('mouseup', onMouseup);
    progressButton.addEventListener('mouseout', onMouseup);
  }

  function subscribe() {
    progressSteps.addEventListener('click', onClick);
    progressButton.addEventListener('mousedown', onMousedown);
  }

  function init() {
    if (who()) {
      findElements();
      initSize();
      subscribe();
    }
  }

  init();
}