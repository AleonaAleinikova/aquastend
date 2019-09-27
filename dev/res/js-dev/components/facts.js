// для фактов.если надо добавить - просто дописать в items;


const items = [
  {
    count: '960',
    detail: 'минут',
    title: 'в год экономит партнёрская мойка',
    text: 'С аквастендистом мойка в 3 раза быстрее, поэтому в месяц вы сэкономите около 80 минут, в год — около 16 часов.',
  }, {
    count: '5',
    detail: 'вещей',
    title: 'находит автовладелец после уборки салона',
    text: 'Для тщательной уборки в салоне под рукой всегда пылеводосос, торнадор, салфетки и чистая вода.',
  }, {
    count: '357',
    detail: 'взглядов',
    title: 'в минуту ловит чистый автомобиль',
    text: 'После мойки вам обязательно захочется кого-нибудь прокатить.',
  }, {
    count: '0',
    detail: 'ковриков',
    title: 'в день забывают автовладельцы',
    text: 'Наши аквастендисты помогают на всех этапах — невозможно забыть ни алгоритм мойки, ни коврики.',
  }
];

function who() {
  return document.querySelector('.facts');
}

export default function facts() {
  let container;
  let moreLink;
  let timer;
  let active = 0;
  let max;
  let isTurned;
  let factFront;
  let factBack;
  let factTitle;
  let factText;

  function findElements() {
    container = document.querySelector('.factInfo');
    timer = document.querySelector('.factTimer');
    moreLink = document.querySelector('.factMore');
    max = items.length;
    factFront = container.querySelector('.factFront');
    factBack = container.querySelector('.factBack');
    factTitle = document.querySelector('.factTitle');
    factText = document.querySelector('.factDescription');
  }

  function isLastFact() {
    return (active + 1) === max;
  }

  function turnFact() {
    if (isTurned) container.classList.remove('factInfo-is-turned');
    else container.classList.add('factInfo-is-turned');
  }

  function changeText() {
    const activeFact = items[active];
    factTitle.innerText = activeFact.title;
    factText.innerText = activeFact.text;
  }

  function changeFactDetails() {
    const newFact = `<span class="factNumber">${items[active].count}</span>
      <span class="factDetail">${items[active].detail}</span>`;
    if (isTurned) factFront.innerHTML = newFact;
    else factBack.innerHTML = newFact;
  }

  function removeAnimatedClass() {
    timer.classList.remove('factTimer-is-animated');
  }

  function addAnimatedClass() {
    timer.classList.add('factTimer-is-animated');
  }

  function changeFact() {
    removeAnimatedClass();
    if (isLastFact()) active = 0;
    else active += 1;
    turnFact();
    changeFactDetails();
    setTimeout(changeText, 400);
    isTurned = !isTurned;
    setTimeout(addAnimatedClass, 100);
  }

  function onEnd() {
    changeFact();
  }

  function onClick() {
    changeFact();
  }

  function subscribe() {
    timer.addEventListener('animationend', onEnd);
    moreLink.addEventListener('click', onClick);
  }

  function init() {
    if (who()) {
      findElements();
      // getFacts();
      subscribe();
    }
  }

  init();
}