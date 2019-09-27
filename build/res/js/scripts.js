(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = aboutBackground;

// для страницы истории.для создания эффекта паралакса
function who() {
  return document.querySelector('.history-1');
}

function aboutBackground() {
  var holder;
  var height;

  function findElements() {
    holder = document.querySelector('.history-1');
    height = window.innerHeight;
  }

  function addProperty() {
    var _window = window,
        scrollY = _window.scrollY;

    if (scrollY < height) {
      var position = scrollY / 15;
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

},{}],2:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = advantages;

// для главной стр.анимация для фактов
function who() {
  return document.querySelector('.advantages');
}

function advantages() {
  var elements;

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
    var target = event.target;
    addActiveClass(target);
  }

  function onEnd(event) {
    var target = event.target;
    removeActiveClass(target);
  }

  function subscribe() {
    elements.forEach(function (element) {
      element.addEventListener('mouseover', onHover);
    });
    elements.forEach(function (element) {
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

},{}],3:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = articles;

var _nanoajax = _interopRequireDefault(require("nanoajax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// для блока еще на странице статьи.ждет html верстку.

/* global Promise */
function who() {
  return document.querySelector('.moreCards');
}

function articles() {
  var holder;
  var link;
  var url;

  function findElements() {
    holder = document.querySelector('.moreCards');
    link = document.querySelector('.js-moreArticles');
    url = link.dataset.url;
  }

  function refreshCards(response) {
    var result = JSON.parse(response).html;
    result = result.replace(/\`/g, '\"');
    holder.innerHTML = result;
  }

  function fetchData() {
    return new Promise(function (resolve, reject) {
      _nanoajax.default.ajax({
        url: url
      }, function (code, response) {
        if (code === 200) resolve(response);else reject(response);
      });
    });
  }

  function updateCards() {
    fetchData().then(refreshCards);
  }

  function onClick(event) {
    event.preventDefault();
    updateCards();
  }

  function subscribe() {
    link.addEventListener('click', onClick);
  }

  function init() {
    if (who()) {
      findElements();
      subscribe();
    }
  }

  init();
}

},{"nanoajax":24}],4:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = facts;
// для фактов.если надо добавить - просто дописать в items;
var items = [{
  count: '960',
  detail: 'минут',
  title: 'в год экономит партнёрская мойка',
  text: 'С аквастендистом мойка в 3 раза быстрее, поэтому в месяц вы сэкономите около 80 минут, в год — около 16 часов.'
}, {
  count: '5',
  detail: 'вещей',
  title: 'находит автовладелец после уборки салона',
  text: 'Для тщательной уборки в салоне под рукой всегда пылеводосос, торнадор, салфетки и чистая вода.'
}, {
  count: '357',
  detail: 'взглядов',
  title: 'в минуту ловит чистый автомобиль',
  text: 'После мойки вам обязательно захочется кого-нибудь прокатить.'
}, {
  count: '0',
  detail: 'ковриков',
  title: 'в день забывают автовладельцы',
  text: 'Наши аквастендисты помогают на всех этапах — невозможно забыть ни алгоритм мойки, ни коврики.'
}];

function who() {
  return document.querySelector('.facts');
}

function facts() {
  var container;
  var moreLink;
  var timer;
  var active = 0;
  var max;
  var isTurned;
  var factFront;
  var factBack;
  var factTitle;
  var factText;

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
    return active + 1 === max;
  }

  function turnFact() {
    if (isTurned) container.classList.remove('factInfo-is-turned');else container.classList.add('factInfo-is-turned');
  }

  function changeText() {
    var activeFact = items[active];
    factTitle.innerText = activeFact.title;
    factText.innerText = activeFact.text;
  }

  function changeFactDetails() {
    var newFact = "<span class=\"factNumber\">".concat(items[active].count, "</span>\n      <span class=\"factDetail\">").concat(items[active].detail, "</span>");
    if (isTurned) factFront.innerHTML = newFact;else factBack.innerHTML = newFact;
  }

  function removeAnimatedClass() {
    timer.classList.remove('factTimer-is-animated');
  }

  function addAnimatedClass() {
    timer.classList.add('factTimer-is-animated');
  }

  function changeFact() {
    removeAnimatedClass();
    if (isLastFact()) active = 0;else active += 1;
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
      findElements(); // getFacts();

      subscribe();
    }
  }

  init();
}

},{}],5:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

var _nanoajax = _interopRequireDefault(require("nanoajax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// запрашивает все карточки.а потом их фильтрует

/* global Promise */
function who() {
  return document.querySelector('.filterSection');
}

function isFilterItem(target) {
  return target.classList.contains('js-filterItem');
}

function checkThemes(conditions, target) {
  var themes = conditions.theme;
  var value = parseInt(target.value, 10);
  if (target.checked) themes.push(value);else {
    var index = themes.indexOf(value);
    themes.splice(index, 1);
  }
}

function showThemes(themesHolder) {
  themesHolder.classList.remove('articlesType-is-hidden');
}

function hideThemes(themesHolder) {
  themesHolder.classList.add('articlesType-is-hidden');
}

function resetThemes(conditions, themesHolder) {
  if (conditions.category !== 'article') {
    delete conditions.theme;
    hideThemes(themesHolder);
  } else {
    conditions.theme = [0, 1, 2, 3, 4];
    showThemes(themesHolder);
  }
}

function updateCondition(target, conditions, themesHolder) {
  if (target.name === 'theme') checkThemes(conditions, target);else {
    conditions[target.name] = target.value;
    resetThemes(conditions, themesHolder);
  }
}

function fetchData(url) {
  return new Promise(function (resolve, reject) {
    _nanoajax.default.ajax({
      url: url
    }, function (code, response) {
      var responseData = JSON.parse(response);
      if (code === 200) resolve(responseData);else reject(response);
    });
  });
}

function renderCard(element) {
  var type = element.type[0].toUpperCase() + element.type.slice(1);
  var card = "<div class=\"card card-".concat(element.category).concat(type, "\">");
  if (element.title) card += "<h3 class=\"cardTitle\">".concat(element.title, "</h3>");
  if (element.description) card += "<p class=\"cardDescription\">".concat(element.description, "</p>");
  if (element.image) card += "<div class=\"cardImageHolder\" style=\"background-image: url('".concat(element.image, "\"><img src=\"").concat(element.image, "\" alt=\"\" class=\"cardImage\"></div>");
  card += '</div>';
  return card;
}

function renderContent(content) {
  var result = '';
  content.forEach(function (element) {
    return result += renderCard(element);
  });
  return result;
}

function filter() {
  var filter;
  var moreLink;
  var conditions = {
    'theme': [0, 1, 2, 3, 4]
  };
  var container;
  var data;
  var themesHolder;
  var hash;

  function findElements() {
    filter = document.querySelector('.filterSection');
    container = document.querySelector('.blogResults');
    themesHolder = document.querySelector('.articlesType');
    hash = window.location.hash;
  }

  function checkConditions(item, conditions, key) {
    var result;
    if (key === 'theme') result = conditions[key].indexOf(parseInt(item[key], 10)) >= 0;else result = item[key] ? item[key].toString() === conditions[key].toString() : false;
    return result;
  }

  function filterItem(acc, item) {
    var shouldAdd = Object.keys(conditions).every(function (key) {
      return conditions[key] === 'all' || checkConditions(item, conditions, key);
    });
    if (shouldAdd) acc.push(item);
    return acc;
  }

  function filterData() {
    return data.reduce(filterItem, []);
  }

  function updateFilter(target) {
    updateCondition(target, conditions, themesHolder);
    var content = filterData();
    var html = renderContent(content);
    container.innerHTML = "".concat(html, " <div class=\"emptyResults\">\n    <span class=\"emptyResultsIcon\"></span>\n    <p class=\"emptyResultsText\">\u041B\u0443\u0447\u0448\u0438\u0439 \u0441\u043F\u043E\u0441\u043E\u0431 \u0441\u043C\u044B\u0442\u044C \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0432\u044B\u0434\u0430\u0447\u0438 \u2014 \u043E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440\u044B \u0432\u044B\u0431\u043E\u0440\u0430.</p>\n    <p class=\"emptyResultsText\">\u0410 \u043B\u0443\u0447\u0448\u0438\u0439 \u0441\u043F\u043E\u0441\u043E\u0431 \u043E\u0442\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044C \u2014 \u0432\u044B\u043C\u044B\u0442\u044C \u0435\u0433\u043E \u043D\u0430 \u0410\u043A\u0432\u0430\u0441\u0442\u0435\u043D\u0434\u0435, \u043F\u043E \u0444\u0438\u0440\u043C\u0435\u043D\u043D\u043E\u043C\u0443 \u0440\u0435\u0446\u0435\u043F\u0442\u0443.</p>\n    <a href=\"#\" class=\"emptyResultsLink\">\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043B\u0443\u0447\u0448\u0438\u0435 \u0441\u0442\u0430\u0442\u044C\u0438</a>\n  </div>");
  }

  function onChange(event) {
    var target = event.target;
    if (isFilterItem(target)) updateFilter(target);
  }

  function subscribe() {
    filter.addEventListener('change', onChange);
  }

  function setCategory() {
    var item = document.querySelector("".concat(hash));
    item.checked = true;
    updateFilter(item);
  }

  function startFilter(response) {
    data = response;
    if (hash) setCategory();
    subscribe();
  }

  function getData() {
    var url = filter.dataset.url;
    fetchData(url).then(startFilter);
  }

  function onHashChange() {
    hash = window.location.hash;
    setCategory();
  }

  function init() {
    if (who()) {
      findElements();
      getData();
      window.addEventListener('hashchange', onHashChange);
    }
  }

  init();
}

},{"nanoajax":24}],6:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = form;

var _input = _interopRequireDefault(require("input.numbered"));

var _nanoajax = _interopRequireDefault(require("nanoajax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// для валидации и отправки формы
function initMask(id) {
  return new _input.default("#".concat(id, "phone"), {
    mask: '+7 (###) ### - ## - ##',
    numbered: '#',
    empty: '_',
    placeholder: true
  });
}

function activeteButton(element) {
  element.removeAttribute('disabled');
}

function disactiveteButton(element) {
  element.setAttribute('disabled', 'disabled');
}

function validatePhone(phoneMask, target) {
  var result = phoneMask.validate();
  if (result < 0) target.classList.add('field-has-error');
  return result > 0;
}

function validateName(target) {
  var result = target.value !== '';
  if (!result) target.classList.add('field-has-error');
  return result;
}

function form(item, id) {
  var submit;
  var isPhone;
  var isName;
  var phoneMask;
  var isActive;

  function findElements() {
    submit = item.querySelector('.feedbackSubmit');
  }

  function checkField(target) {
    if (target.name === 'phone') isPhone = validatePhone(phoneMask, target);else if (target.name === 'name') isName = validateName(target);
    isActive = isPhone && isName;
  }

  function showSuccess() {
    console.log('success');
    item.reset();
    disactiveteButton(submit);
  }

  function showError() {
    console.log('error');
  }

  function collectData() {
    return new FormData(item);
  }

  function sendData(data) {
    return new Promise(function (resolve, reject) {
      _nanoajax.default.ajax({
        url: form.action,
        method: 'POST',
        body: data
      }, function (code, response) {
        if (code === 200) resolve();else showError(response);
      });
    });
  }

  function onSubmit(event) {
    event.preventDefault();
    sendData(collectData()).then(showSuccess);
  }

  function onFocusout(event) {
    var target = event.target;
    checkField(target);
    if (isActive) activeteButton(submit);else disactiveteButton(submit);
  }

  function onFocus(event) {
    var target = event.target;
    target.classList.remove('field-has-error'); // errorMessage.classList.remove('errorMessage-is-active');
  }

  function subscribe() {
    item.addEventListener('submit', onSubmit);
    item.addEventListener('focusout', onFocusout);
    item.addEventListener('focusin', onFocus);
  }

  function init() {
    findElements();
    phoneMask = initMask(id);
    subscribe();
  }

  init();
}

},{"input.numbered":23,"nanoajax":24}],7:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = forms;

var _form = _interopRequireDefault(require("form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function who() {
  return document.querySelector('.feedback');
}

function forms() {
  var forms;

  function findElements() {
    forms = [].slice.call(document.querySelectorAll('.feedback'));
  }

  function initModules() {
    forms.forEach(function (element) {
      var id = element.dataset.id ? element.dataset.id : '';
      (0, _form.default)(element, id);
    });
  }

  function init() {
    if (who()) {
      findElements();
      initModules();
    }
  }

  init();
}

},{"form":6}],8:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handAnimation;

// анимация на странице о нас
function who() {
  return document.querySelector('.js-handAnimation');
}

function handAnimation() {
  var holder;

  function findElements() {
    holder = document.querySelector('.js-handAnimation');
  }

  function addProperty(clientX, clientY) {
    var propX = clientX * .1;
    var propY = clientY * .1;
    holder.style.setProperty('--mouseX', propX + 'px');
    holder.style.setProperty('--mouseY', propY + 'px');
  }

  function onMousemove(event) {
    var clientX = event.clientX,
        clientY = event.clientY;
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

},{}],9:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = legal;

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

function legal() {
  var holder;
  var links;
  var active = 0;

  function findElements() {
    holder = document.querySelector('.js-tabsHolder');
    links = [].slice.call(document.querySelectorAll('.js-tab'));
  }

  function addHolderClass(index) {
    holder.className = "legalTabs legalTabs-".concat(index + 1, "-is-active js-tabsHolder");
  }

  function changeTab(index) {
    removeLinkClass(active, links);
    addLinkClass(index, links);
    addHolderClass(index);
    active = index;
  }

  function onClick(event) {
    event.preventDefault();
    var target = event.target;
    var index = links.indexOf(target);
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

  init();
}

},{}],10:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
// ассинхронно подгружает карту

/* global Promise */

/* global ymaps */
var MAP_URL = 'https://api-maps.yandex.ru/2.1?apikey=7cd9c446-c06c-48a8-b45e-fa69b056bfe4&lang=ru_RU';

function addMap() {
  var mapCoords = [45.071332, 38.972124];
  var customIconSettings = {
    iconLayout: 'default#image',
    iconImageHref: '/res/images/pin.svg',
    iconImageSize: [51, 63],
    iconImageOffset: [-15, -70]
  };
  var map = new ymaps.Map('map', {
    center: mapCoords,
    zoom: 16,
    controls: []
  });
  var placemark = new ymaps.Placemark(mapCoords, {}, customIconSettings);
  map.geoObjects.add(placemark);
}

function initMap() {
  if (ymaps) ymaps.ready(addMap);
}

function loadScript() {
  return new Promise(function (resolve) {
    var script = document.createElement('script');
    script.addEventListener('load', resolve);
    script.src = MAP_URL;
    script.type = 'text/javascript';
    document.body.appendChild(script);
  });
}

function init() {
  if (document.querySelector('.map')) {
    loadScript().then(initMap);
  }
}

},{}],11:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = menu;

// открывает\закрывает меню
function who() {
  return document.querySelector('.menu');
}

function addActiveClass(menu) {
  menu.classList.add('menu-is-active');
}

function removeActiveClass(menu) {
  menu.classList.remove('menu-is-active');
}

function menu() {
  var menu;
  var openLink;
  var closeLink;

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
    if (who()) {
      findElements();
      subscribe();
    }
  }

  init();
}

},{}],12:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = notFound;

// анимация на 404 стр
function who() {
  return document.querySelector('.notFoundCanvas');
}

function notFound() {
  var holder;
  var canvas;
  var context;
  var image;
  var width;
  var height;
  var IMAGE_WIDTH = 1500;
  var IMAGE_HEIGHT = 835;
  var IMAGE_RATIO = IMAGE_WIDTH / IMAGE_HEIGHT;

  function findElements() {
    holder = document.querySelector('.notFound');
  }

  function initSizes() {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  function initCanvasSize() {
    canvas.width = width;
    canvas.height = height;
  }

  function loadImage() {
    return new Promise(function (resolve, reject) {
      var image = new Image();
      image.addEventListener('load', function onLoad() {
        image.removeEventListener('load', onLoad);
        resolve(image);
      });
      image.addEventListener('error', function onError() {
        image.removeEventListener('error', onError);
        reject();
      });
      image.src = '/res/images/111.jpg';
    });
  }

  function drawResult() {
    var ratio = width / height;
    if (ratio < IMAGE_RATIO) context.drawImage(image, 0, 0, IMAGE_HEIGHT * ratio, IMAGE_HEIGHT, 0, 0, width, height);else context.drawImage(image, 0, 0, IMAGE_WIDTH, IMAGE_WIDTH / ratio, 0, 0, width, height);
  }

  function clearBackground(x, y) {
    context.clearRect(x - 40, y - 10, 80, 20);
    context.clearRect(x - 10, y - 40, 20, 80);
    context.clearRect(x - 39, y - 16, 78, 32);
    context.clearRect(x - 16, y - 39, 32, 78);
    context.clearRect(x - 38, y - 19, 76, 38);
    context.clearRect(x - 19, y - 38, 38, 76);
    context.clearRect(x - 37, y - 21, 74, 42);
    context.clearRect(x - 21, y - 37, 42, 74);
    context.clearRect(x - 36, y - 23, 72, 46);
    context.clearRect(x - 23, y - 36, 46, 72);
    context.clearRect(x - 35, y - 25, 70, 50);
    context.clearRect(x - 25, y - 35, 50, 70);
    context.clearRect(x - 34, y - 27, 68, 54);
    context.clearRect(x - 27, y - 34, 54, 68);
    context.clearRect(x - 33, y - 29, 66, 58);
    context.clearRect(x - 29, y - 33, 58, 66);
    context.clearRect(x - 32, y - 31, 64, 62);
    context.clearRect(x - 31, y - 32, 62, 64);
  }

  function drawBackground() {
    loadImage().then(function (result) {
      return image = result;
    }).then(drawResult);
  }

  function addProperty(clientX, clientY) {
    holder.style.setProperty('--x', clientX + 'px');
    holder.style.setProperty('--y', clientY + 'px');
  }

  function onMouseMove(event) {
    var clientX = event.clientX,
        clientY = event.clientY;
    addProperty(clientX, clientY);
    requestAnimationFrame(function () {
      return clearBackground(clientX, clientY);
    });
  }

  function onTouchMove(event) {
    var _event$touches$ = event.touches[0],
        clientX = _event$touches$.clientX,
        clientY = _event$touches$.clientY;
    addProperty(clientX, clientY);
    requestAnimationFrame(function () {
      return clearBackground(clientX, clientY);
    });
  }

  function onResize() {
    initSizes();
    initCanvasSize();
    if (image) drawResult();else drawBackground();
  }

  function subscribe() {
    window.addEventListener('resize', onResize);
    holder.addEventListener('mousemove', onMouseMove);
    holder.addEventListener('touchmove', onTouchMove);
  }

  function initCanvas() {
    canvas = document.querySelector('.notFoundCanvas');
    context = canvas.getContext('2d');
    initCanvasSize();
    drawBackground();
  }

  function init() {
    if (who()) {
      findElements();
      initSizes();
      subscribe();
      initCanvas();
    }
  }

  init();
}

},{}],13:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _fontfaceobserver = _interopRequireDefault(require("fontfaceobserver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOADED_PREFIX = 'font-';
var LOADED_SUFFIX = '-is-loaded';

function getFontClassName(fontName) {
  var noSpaces = fontName.replace(/ /g, '');
  return "".concat(LOADED_PREFIX).concat(noSpaces).concat(LOADED_SUFFIX);
}

function addClass() {
  var preloader = document.querySelector('.preloader');
  preloader.classList.add('preloader-is-hidden');
}

function fontPromise(font) {
  var rest = new _fontfaceobserver.default(font);
  rest.load().then(function (loadedFont) {
    document.body.classList.add(getFontClassName(loadedFont.family));
  }).catch(addClass);
}

function init(fontCritical, fontsRest) {
  var critical = new _fontfaceobserver.default(fontCritical);
  critical.load().then(function (loadedFont) {
    document.body.classList.add(getFontClassName(loadedFont.family));

    if (fontsRest) {
      fontsRest.forEach(fontPromise);
    }
  });
}

;

},{"fontfaceobserver":22}],14:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

function create(html) {
  var element = document.createElement('div');
  element.innerHTML = html;
  return element.firstChild;
}

},{}],15:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getData = getData;
exports.bind = bind;
exports.unbind = unbind;
exports.trigger = trigger;
exports.target = target;

/* Event Data */
function setData(event, data) {
  var newEvent = event;
  newEvent.data = data;
  return newEvent;
}

function getData(event) {
  return event.data;
}
/* Event Binding */


function bind(object, type, callback) {
  object.addEventListener(type, callback);
}

function unbind(object, type, callback) {
  object.removeEventListener(type, callback);
}
/* Event Trigger */


function triggerCreateEvent(object, eventName, propagate, eventType, data) {
  var event = document.createEvent(eventType);

  if (data) {
    setData(event, data);
  }

  event.initEvent(eventName, propagate, false);
  object.dispatchEvent(event);
}

function triggerCreateEventObject(object, eventName, propagate, data) {
  var event = document.createEventObject();

  if (data) {
    setData(event, data);
  }

  object.fireEvent("on".concat(eventName), event);
}

function trigger(object, eventName) {
  var propagate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var eventType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'MouseEvents';
  var data = arguments.length > 4 ? arguments[4] : undefined;

  if (document.createEvent) {
    triggerCreateEvent(object, eventName, propagate, eventType, data);
  } else {
    triggerCreateEventObject(object, eventName, propagate, data);
  }
}
/* Event Target */


function target(event) {
  return event.target;
}

},{}],16:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dots = dots;
exports.init = init;

var eventManager = _interopRequireWildcard(require("patterns/tx-eventManager"));

var _txCreateNode = _interopRequireDefault(require("patterns/tx-createNode"));

var _txTransition = _interopRequireDefault(require("patterns/tx-transition"));

var translate = _interopRequireWildcard(require("patterns/tx-translate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }


/* eslint max-lines-per-function: 'off' */
var SLIDER_CLASS_NAME = 'slider';
var SLIDER_FIXING_CLASS_NAME = "".concat(SLIDER_CLASS_NAME, "-is-fixing");
var SLIDER_CHANGING_CLASS_NAME = "".concat(SLIDER_CLASS_NAME, "-is-changing");
var SLIDE_ACTIVE_CLASS_NAME_SUFFIX = '-is-active';
var DOT_NAVIGATION_CLASS_NAME = 'js-dotsNavigation';
var DOT_CLASS_NAME = 'js-dotsPage';
var DOT_ACTIVE_CLASS_NAME = "".concat(DOT_CLASS_NAME).concat(SLIDE_ACTIVE_CLASS_NAME_SUFFIX);
var TANSITION_EVENT = (0, _txTransition.default)('transition', 'end');
var PRESWIPE_EVENT = 'slider:preswipe';
var SWIPE_EVENT = 'slider:swipe';
var SLIDE_THRESHOLD = 15;
var NEXT_SHIFT = 50;
/* Dots */

function generateNavigationDots(size, pageClassName) {
  var navigationDots = '';

  for (var index = 0; index < size; index += 1) {
    navigationDots += index === 0 ? "<li class=\"".concat(pageClassName, " ").concat(pageClassName).concat(SLIDE_ACTIVE_CLASS_NAME_SUFFIX, " ").concat(DOT_ACTIVE_CLASS_NAME, " ").concat(DOT_CLASS_NAME, "\"></li>") : "<li class=\"".concat(pageClassName, " ").concat(DOT_CLASS_NAME, "\"></li>");
  }

  return navigationDots;
}

function dots(size, listClassName, pageClassName) {
  var navigation = "<ol class=\"".concat(listClassName, " ").concat(DOT_NAVIGATION_CLASS_NAME, "\">").concat(generateNavigationDots(size, pageClassName), "</ol>");
  return (0, _txCreateNode.default)(navigation);
}
/* Slider Constructor */


function init(object, navigationObject, pageClassName) {
  var slider;
  var sliderDots;
  var sliderDotClassName;
  var sliderDotActiveClassName;
  var sliderFixing;
  var sliderChanging;
  var sliderMax;
  var sliderPosition;
  var activeSlideIndex;
  var activeSlideDot;
  var pointStartY;
  var pointShift;
  var pointDiffY;
  var positionStart;
  var animationFrame;
  /* Get */

  function getSlider() {
    return slider;
  }

  function getSliderDots() {
    return sliderDots;
  }

  function getSliderDot(index) {
    return getSliderDots()[index];
  }

  function getSliderDotClassName() {
    return sliderDotClassName;
  }

  function getSliderDotActiveClassName() {
    return sliderDotActiveClassName;
  }

  function getSliderMax() {
    return sliderMax;
  }

  function getSliderPosition() {
    return sliderPosition;
  }

  function getActiveSlideIndex() {
    return activeSlideIndex;
  }

  function getActiveSlideDot() {
    return activeSlideDot;
  }

  function getPointStartY() {
    return pointStartY;
  }

  function getPointShift() {
    return pointShift;
  }

  function getPointDiffY() {
    return pointDiffY;
  }

  function getPositionStart() {
    return positionStart;
  }

  function getAnimationFrame() {
    return animationFrame;
  }

  function getStatus() {
    return {
      fixing: sliderFixing,
      changing: sliderChanging
    };
  }
  /* Set */


  function setSlider() {
    slider = object;
  }

  function setSliderDots() {
    sliderDots = navigationObject.getElementsByClassName(getSliderDotClassName());
  }

  function setSliderDotClassName() {
    sliderDotClassName = pageClassName;
    sliderDotActiveClassName = "".concat(pageClassName).concat(SLIDE_ACTIVE_CLASS_NAME_SUFFIX);
  }

  function setSliderMax() {
    sliderMax = sliderDots.length - 1;
  }

  function setSliderPosition() {
    var parent = getSlider().parentElement;
    var offset = parent.getBoundingClientRect().left;
    var padding = parseInt(getComputedStyle(parent, null).getPropertyValue('padding-left'), 10);
    sliderPosition = offset + padding;
  }

  function setActiveSlideIndex(index) {
    activeSlideIndex = index;
  }

  function setActiveSlideDot() {
    activeSlideDot = getSliderDot(getActiveSlideIndex());
  }

  function setPointStartY(start) {
    pointStartY = start;
  }

  function setPointShift(shift) {
    pointShift = shift;
  }

  function setPointDiffY(diff) {
    pointDiffY = diff;
  }

  function setPositionStart(position) {
    positionStart = position;
  }

  function setAnimationFrame(frame) {
    animationFrame = frame;
  }

  function setStatus(fixing, changing) {
    sliderFixing = fixing;
    sliderChanging = changing;
  }
  /* Slider Utilities */


  function updateDots() {
    getActiveSlideDot().classList.remove(getSliderDotActiveClassName());
    getActiveSlideDot().classList.remove(DOT_ACTIVE_CLASS_NAME);
    setActiveSlideDot();
    getActiveSlideDot().classList.add(getSliderDotActiveClassName());
    getActiveSlideDot().classList.add(DOT_ACTIVE_CLASS_NAME);
  }

  function calculatePositions() {
    if (getActiveSlideIndex() === 0 && getPointDiffY() > 0) {
      setPointShift(4);
    } else if (getActiveSlideIndex() === getSliderMax() && getPointDiffY() < 0) {
      setPointShift(4);
    }
  }

  function calculateCompleteDistance() {
    return "".concat(-100 * getActiveSlideIndex(), "%");
  }

  function calculateSlideDistance() {
    var correction = getPointDiffY() < 0 ? SLIDE_THRESHOLD : -SLIDE_THRESHOLD;
    return "".concat(getPositionStart() + (getPointDiffY() + correction) / getPointShift(), "px");
  }

  function translateSlider(distance) {
    getSlider().style.transform = translate.css('y', distance).transform;
  }

  function shiftSlider() {
    calculatePositions();
    translateSlider(calculateSlideDistance());
  }

  function finalizeSlide() {
    eventManager.trigger(getSlider(), SWIPE_EVENT, false, 'UIEvent');
    setStatus(false, false);
    getSlider().classList.remove(SLIDER_FIXING_CLASS_NAME);
    getSlider().classList.remove(SLIDER_CHANGING_CLASS_NAME);
    getSlider().removeEventListener(TANSITION_EVENT, finalizeSlide);
  }

  function updateInteractionParameters(event) {
    var startPoint = event ? event.touches[0].pageY : 0;
    setPointStartY(startPoint);
    setPointShift(1);
    setPointDiffY(0);
    setPositionStart(getSlider().getBoundingClientRect().left - getSliderPosition());
  }

  function preventClick(event) {
    if (event) {
      event.preventDefault();
    }
  }

  function increaseActiveSlideIndex() {
    setActiveSlideIndex(getActiveSlideIndex() + 1);
  }

  function deincreaseActiveSlideIndex() {
    setActiveSlideIndex(getActiveSlideIndex() - 1);
  }

  function slidingForward() {
    return getPointDiffY() < -NEXT_SHIFT && getActiveSlideIndex() !== getSliderMax();
  }

  function slidingBack() {
    return getPointDiffY() > NEXT_SHIFT && getActiveSlideIndex() !== 0;
  }

  function updateIndex() {
    if (slidingForward()) {
      increaseActiveSlideIndex();
    } else if (slidingBack()) {
      deincreaseActiveSlideIndex();
    }
  }
  /* Slider Actions */


  function setItem(index) {
    setActiveSlideIndex(index);
    updateDots();
    translateSlider(calculateCompleteDistance());
  }

  function slideItem(index) {
    getSlider().classList.add(SLIDER_CHANGING_CLASS_NAME);
    getSlider().addEventListener(TANSITION_EVENT, finalizeSlide);
    setItem(index);
  }

  function positionSlider() {
    eventManager.trigger(getSlider(), PRESWIPE_EVENT, false, 'UIEvent');
    getSlider().addEventListener(TANSITION_EVENT, finalizeSlide);
    setStatus(true, true);
    getSlider().classList.add(SLIDER_FIXING_CLASS_NAME);
    translateSlider(calculateCompleteDistance());
  }

  function fixSlider() {
    if (Math.abs(pointDiffY) > SLIDE_THRESHOLD) {
      updateIndex();
      updateDots();
      positionSlider();
    }
  }

  function fakeSwipe(fakeShift) {
    updateInteractionParameters();
    setPointDiffY(fakeShift);
    setStatus(true, true);
    getSlider().classList.add(SLIDER_CHANGING_CLASS_NAME);
    fixSlider();
  }

  function prevItem(event) {
    preventClick(event);

    if (getActiveSlideIndex() !== 0) {
      fakeSwipe(NEXT_SHIFT + 1);
    }
  }

  function nextItem(event) {
    preventClick(event);

    if (getActiveSlideIndex() !== getSliderMax()) {
      fakeSwipe(-NEXT_SHIFT - 1);
    }
  }
  /* Slider Interactions */


  function onTouchMove(event) {
    setPointDiffY(event.touches[0].pageY - getPointStartY());

    if (Math.abs(getPointDiffY()) > SLIDE_THRESHOLD) {
      event.preventDefault();
      setAnimationFrame(requestAnimationFrame(shiftSlider));
    }
  }

  function onTouchEnd() {
    document.removeEventListener('touchmove', onTouchMove, true);
    document.removeEventListener('touchend', onTouchEnd);
    cancelAnimationFrame(getAnimationFrame());
    requestAnimationFrame(fixSlider);
  }

  function onTouchStart(event) {
    event.preventDefault();
    var status = getStatus();

    if (!status.fixing || !status.changing) {
      updateInteractionParameters(event);
      document.addEventListener('touchmove', onTouchMove, true);
      document.addEventListener('touchend', onTouchEnd);
    }
  }

  function onResize() {
    setSliderPosition();
  }

  function subscribe() {
    // getSlider().parentElement.addEventListener('touchstart', onTouchStart);
    window.addEventListener('resize', onResize);
  }
  /* Slider Inititalization */


  function setDefaultValues() {
    setSlider();
    setSliderDotClassName();
    setSliderDots();
    setSliderMax();
    setSliderPosition();
    setActiveSlideIndex(0);
    setActiveSlideDot();
  }

  function initSlider() {
    setDefaultValues();
    subscribe();
  }

  initSlider();
  /* Slider Interface */

  return {
    prev: prevItem,
    next: nextItem,
    set: setItem,
    slide: slideItem,
    current: getActiveSlideIndex,
    max: getSliderMax,
    object: getSlider
  };
}

},{"patterns/tx-createNode":14,"patterns/tx-eventManager":15,"patterns/tx-transition":17,"patterns/tx-translate":18}],17:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cssTransition;

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function cssTransition(event, state) {
  var eventEnd = "".concat(event).concat(state);
  var eventCap = capitalize(event);
  var eventEndCap = "".concat(capitalize(event)).concat(capitalize(state));
  var transitionEvents = [eventEnd, "o".concat(eventEndCap), "MS".concat(eventEndCap), eventEnd, "webkit".concat(eventEndCap)];
  var transitions = [event, "o".concat(eventCap), "MS".concat(eventCap), "Moz".concat(eventCap), "Webkit".concat(eventCap)];
  var element = document.createElement('element');
  var transitionEvent;
  transitions.some(function (transition, index) {
    var condition = element.style[transition] !== undefined;

    if (condition) {
      transitionEvent = transitionEvents[index];
    }

    return condition;
  });
  return transitionEvent;
}

},{}],18:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.css = css;
exports.string = string;


/* eslint max-lines-per-function: 'off' */

/* Utilities */
function properties(axis, distance) {
  var property = "translate".concat(axis.toUpperCase(), "(").concat(distance, ")");
  var propertyLayer = "".concat(property, " translateZ(0)");
  return {
    property: property,
    propertyLayer: propertyLayer
  };
}
/* CSS Object */


function css(axis, distance) {
  var style = properties(axis, distance);
  return {
    '-webkit-transform': style.propertyLayer,
    '-moz-transform': style.propertyLayer,
    '-ms-transform': style.property,
    '-o-transform': style.property,
    transform: style.propertyLayer
  };
}
/* CSS String */


function string(axis, distance) {
  var style = properties(axis, distance);
  return "-webkit-transform:".concat(style.propertyLayer, ";-moz-transform:").concat(style.propertyLayer, ";-ms-transform:").concat(style.property, ";-o-transform:").concat(style.property, ";transform:").concat(style.propertyLayer, ";");
}

},{}],19:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = progressBar;

// анимация с прогрессом загрязнения на стр клиентов
function who() {
  return document.querySelector('.progress');
}

function isStep(target) {
  return target.classList.contains('js-progressLink');
}

function progressBar() {
  var progress;
  var progressButton;
  var progressSteps;
  var imageHolder;
  var steps;
  var width;
  var stepSize;
  var position = 0;
  var start;
  var maxShift;

  function findElements() {
    progress = document.querySelector('.progress');
    progressButton = document.querySelector('.progressButton');
    progressSteps = document.querySelector('.progressSteps');
    imageHolder = document.querySelector('.progressImageHolder');
    steps = [].slice.call(document.querySelectorAll('.progressStep'));
  }

  function initSize() {
    width = progress.clientWidth - 38;
    stepSize = width / 3;
    maxShift = stepSize * 3;
  }

  function removeStepsClass() {
    steps.forEach(function (element) {
      return element.classList.remove('progressStep-is-active');
    });
  }

  function changeStep(step) {
    var shift = stepSize * step;
    position = shift;
    progress.style.setProperty('--position', position + 'px');
    removeStepsClass();
    steps[step].classList.add('progressStep-is-active');
    imageHolder.className = "progressImageHolder progressImageHolder-".concat(step, "-is-active");
  }

  function checkPosition(shift) {
    var step = Math.round(shift / stepSize);
    imageHolder.className = "progressImageHolder progressImageHolder-".concat(step, "-is-active");
  }

  function updatePosition(currentShift) {
    var shift = position + currentShift;
    if (shift <= maxShift && shift >= 0) progress.style.setProperty('--position', shift + 'px');else if (shift >= maxShift) progress.style.setProperty('--position', maxShift + 'px');else progress.style.setProperty('--position', 0 + 'px');
    checkPosition(shift);
  }

  function calculateStep(shift) {
    var step = Math.round((position + shift) / stepSize);
    changeStep(step);
  }

  function onClick(event) {
    event.preventDefault();
    var target = event.target;
    if (isStep(target)) changeStep(target.dataset.step);
  }

  function onMousemove(event) {
    var shift = event.clientX - start;
    updatePosition(shift);
  }

  function onMouseup(event) {
    var shift = event.clientX - start;
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

},{}],20:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = slider;

var swiper = _interopRequireWildcard(require("patterns/tx-slider"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function who() {
  return document.querySelector('.js-slider');
}

function slider() {
  var container;
  var parent;
  var slides;
  var dots;
  var gallery;
  var pagination;
  var dotsList;
  var body;
  var timeout;
  var start;
  var height;

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
    var index = dotsList.indexOf(target);
    if (index >= 0) gallery.slide(index);
  }

  function onDot(event) {
    var target = event.target;
    findDot(target);
  }

  function selectWay(way) {
    console.log(way);

    if (way && gallery.current() !== 2) {
      timeout = setTimeout(subscribeWheel, 800);
      gallery.next();
    } else if (way && gallery.current() === 2) {
      var _height = window.innerHeight;
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
    var keyCode = event.keyCode;
    if (keyCode === 40) selectWay(keyCode);else if (keyCode === 38) selectWay(false);
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
    var deltaY = event.deltaY;
    selectWay(deltaY > 0);
  }

  function onTouchMove(event) {
    event.preventDefault();
    var currentCord = event.touches[0].pageY;
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

},{"patterns/tx-slider":16}],21:[function(require,module,exports){

"use strict";

var _fontLoad = _interopRequireDefault(require("patterns/fontLoad"));

var _menu = _interopRequireDefault(require("menu"));

var _facts = _interopRequireDefault(require("facts"));

var _slider = _interopRequireDefault(require("slider"));

var _filter = _interopRequireDefault(require("filter"));

var _handAnimation = _interopRequireDefault(require("handAnimation"));

var _aboutBackground = _interopRequireDefault(require("aboutBackground"));

var _progressBar = _interopRequireDefault(require("progressBar"));

var _legal = _interopRequireDefault(require("legal"));

var _notFound = _interopRequireDefault(require("notFound"));

var _articles = _interopRequireDefault(require("articles"));

var _advantages = _interopRequireDefault(require("advantages"));

var _forms = _interopRequireDefault(require("forms"));

var map = _interopRequireWildcard(require("map"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _fontLoad.default)('Roboto', ['Bebas Neue']);
(0, _menu.default)();
(0, _facts.default)();
(0, _slider.default)();
(0, _filter.default)();
(0, _handAnimation.default)();
(0, _aboutBackground.default)();
(0, _progressBar.default)();
(0, _legal.default)();
map.init();
(0, _notFound.default)();
(0, _articles.default)();
(0, _forms.default)();
(0, _advantages.default)();

},{"aboutBackground":1,"advantages":2,"articles":3,"facts":4,"filter":5,"forms":7,"handAnimation":8,"legal":9,"map":10,"menu":11,"notFound":12,"patterns/fontLoad":13,"progressBar":19,"slider":20}],22:[function(require,module,exports){
/* Font Face Observer v2.1.0 - © Bram Stein. License: BSD-3-Clause */(function(){function l(a,b){document.addEventListener?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b)}function m(a){document.body?a():document.addEventListener?document.addEventListener("DOMContentLoaded",function c(){document.removeEventListener("DOMContentLoaded",c);a()}):document.attachEvent("onreadystatechange",function k(){if("interactive"==document.readyState||"complete"==document.readyState)document.detachEvent("onreadystatechange",k),a()})};function t(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.h=document.createElement("span");this.f=document.createElement("span");this.g=-1;this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";this.b.appendChild(this.h);this.c.appendChild(this.f);this.a.appendChild(this.b);this.a.appendChild(this.c)}
function u(a,b){a.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+b+";"}function z(a){var b=a.a.offsetWidth,c=b+100;a.f.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}function A(a,b){function c(){var a=k;z(a)&&a.a.parentNode&&b(a.g)}var k=a;l(a.b,c);l(a.c,c);z(a)};function B(a,b){var c=b||{};this.family=a;this.style=c.style||"normal";this.weight=c.weight||"normal";this.stretch=c.stretch||"normal"}var C=null,D=null,E=null,F=null;function G(){if(null===D)if(J()&&/Apple/.test(window.navigator.vendor)){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);D=!!a&&603>parseInt(a[1],10)}else D=!1;return D}function J(){null===F&&(F=!!document.fonts);return F}
function K(){if(null===E){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif"}catch(b){}E=""!==a.style.font}return E}function L(a,b){return[a.style,a.weight,K()?a.stretch:"","100px",b].join(" ")}
B.prototype.load=function(a,b){var c=this,k=a||"BESbswy",r=0,n=b||3E3,H=(new Date).getTime();return new Promise(function(a,b){if(J()&&!G()){var M=new Promise(function(a,b){function e(){(new Date).getTime()-H>=n?b(Error(""+n+"ms timeout exceeded")):document.fonts.load(L(c,'"'+c.family+'"'),k).then(function(c){1<=c.length?a():setTimeout(e,25)},b)}e()}),N=new Promise(function(a,c){r=setTimeout(function(){c(Error(""+n+"ms timeout exceeded"))},n)});Promise.race([N,M]).then(function(){clearTimeout(r);a(c)},
b)}else m(function(){function v(){var b;if(b=-1!=f&&-1!=g||-1!=f&&-1!=h||-1!=g&&-1!=h)(b=f!=g&&f!=h&&g!=h)||(null===C&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),C=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=C&&(f==w&&g==w&&h==w||f==x&&g==x&&h==x||f==y&&g==y&&h==y)),b=!b;b&&(d.parentNode&&d.parentNode.removeChild(d),clearTimeout(r),a(c))}function I(){if((new Date).getTime()-H>=n)d.parentNode&&d.parentNode.removeChild(d),b(Error(""+
n+"ms timeout exceeded"));else{var a=document.hidden;if(!0===a||void 0===a)f=e.a.offsetWidth,g=p.a.offsetWidth,h=q.a.offsetWidth,v();r=setTimeout(I,50)}}var e=new t(k),p=new t(k),q=new t(k),f=-1,g=-1,h=-1,w=-1,x=-1,y=-1,d=document.createElement("div");d.dir="ltr";u(e,L(c,"sans-serif"));u(p,L(c,"serif"));u(q,L(c,"monospace"));d.appendChild(e.a);d.appendChild(p.a);d.appendChild(q.a);document.body.appendChild(d);w=e.a.offsetWidth;x=p.a.offsetWidth;y=q.a.offsetWidth;I();A(e,function(a){f=a;v()});u(e,
L(c,'"'+c.family+'",sans-serif'));A(p,function(a){g=a;v()});u(p,L(c,'"'+c.family+'",serif'));A(q,function(a){h=a;v()});u(q,L(c,'"'+c.family+'",monospace'))})})};"object"===typeof module?module.exports=B:(window.FontFaceObserver=B,window.FontFaceObserver.prototype.load=B.prototype.load);}());

},{}],23:[function(require,module,exports){
/*! numbered v1.0.6 | pavel-yagodin | MIT License | https://github.com/CSSSR/jquery.numbered */
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.Numbered = factory();
	}
}(this, function () {
	'use strict';

	var defaults = {
		mask: '+7 (###) ### - ## - ##',
		numbered: '#',
		empty: '_',
		placeholder: false
	};

	var Numbered = function (target, params) {
		var self = this;

		if (typeof target !== 'object') {
			self.inputs = document.querySelectorAll(target);
		} else if (typeof target.length !== 'undefined') {
			self.inputs = target;
		} else {
			self.inputs = [target];
		}
		self.inputs = Array.prototype.slice.call(self.inputs);

		params = params || (typeof self.inputs[0].numbered !== 'undefined' ? self.inputs[0].numbered.params : {});

		for (var def in defaults) {
			if (typeof params[def] === 'undefined') {
				params[def] = defaults[def];
			}
		}

		self.params = params;
		self.config = {};

		self.config.placeholder = self.params.mask.replace(new RegExp(self.params.numbered, 'g'), self.params.empty);
		self.config.numbered    = self.params.numbered.replace(/([()[\]\.^\#$|?+-])/g, '\\\\$1');
		self.config.numberedCol = self.params.mask.split(self.params.numbered).length -1;
		self.config.empty       = self.params.empty.replace(/([()[\]\.^\#$|?+-])/g, '\\$1');
		self.config.mask        = self.params.mask.replace(/([()[\]\.^\#$|?+-])/g, '\\$1').replace(new RegExp(self.config.numbered, 'g'), '(\\d)');
		self.config.maskNums    = self.params.mask.replace(/[^\d]/gi, '').split('');
		self.config.maskNumsCol = self.config.maskNums.length;
		self.config.regexp      = new RegExp('^' + self.config.mask + '$');
		self.config.events      = ['input', 'change', 'click', 'focusin', 'blur'];

		// console.log(self.config);


		self._eventFire = function(el, etype){
			if (el.fireEvent) {
				el.fireEvent('on' + etype);
			} else {
				var evObj = document.createEvent('Events');
				evObj.initEvent(etype, true, false);
				el.dispatchEvent(evObj);
			}
		};

		self._getSelectionRange = function (oElm) {
			var r = { text: '', start: 0, end: 0, length: 0 };
			if (oElm.setSelectionRange) {
				r.start= oElm.selectionStart;
				r.end = oElm.selectionEnd;
				r.text = (r.start != r.end) ? oElm.value.substring(r.start, r.end): '';
			} else if (document.selection) {
				var oR;
				if (oElm.tagName && oElm.tagName === 'TEXTAREA') {
					var oS = document.selection.createRange().duplicate();
					oR = oElm.createTextRange();
					var sB = oS.getBookmark();
					oR.moveToBookmark(sB);
				} else {
					oR = document.selection.createRange().duplicate();
				}

				r.text = oR.text;
				for (; oR.moveStart('character', -1) !== 0; r.start++);
				r.end = r.text.length + r.start;
			}
			r.length = r.text.length;
			return r;
		};


		self.magic = function (event) {
			var numbered = this.numbered;
			var value = numbered.input.value || ' ';
			var valueFormatted = value.replace(/[^\d]/gi, '').split('').join('');
			var valueFormattedArr = valueFormatted.split('');
			var valueFormattedCol = valueFormattedArr.length;
			var valueFormattedIndex = 0;
			var positionStart = -1;
			var positionEnd = -1;
			var positionOld = self._getSelectionRange(numbered.input);
			var maskNumsIndex = 0;
			var valueFormattedRes = [];
			var maskSplit = numbered.params.mask.split('');
			// console.log(valueFormatted);

			for (var key in maskSplit) {
				var val = maskSplit[key];
				key = parseInt(key);
				if (maskNumsIndex <= numbered.config.maskNumsCol && val == numbered.config.maskNums[maskNumsIndex] && val == valueFormattedArr[valueFormattedIndex]) {
					valueFormattedRes.push(val);
					maskNumsIndex++;
					valueFormattedIndex++;
				} else if(val == numbered.params.numbered) {
					if (positionStart < 0) {
						positionStart = key;
					}
					if(valueFormattedIndex < valueFormattedCol) {
						valueFormattedRes.push(valueFormattedArr[valueFormattedIndex]);
						valueFormattedIndex++;
						positionEnd = key;
					} else {
						valueFormattedRes.push(numbered.params.empty);
					}
				} else {
					valueFormattedRes.push(val);
				}
			}
			value = valueFormattedRes.join('');

			var position = (positionEnd >= 0 ? positionEnd + 1 : positionStart);
			if (event.type !== 'click') {
				if ((event.type === 'blur' || event.type === 'change') && valueFormattedIndex - maskNumsIndex === 0 && !numbered.params.placeholder) {
					this.value = '';
				} else if (numbered.oldValue !== numbered.input.value || event.type === 'focusin') {
					this.value = value;
				}
			}

			if(event.type !== 'change' && event.type !== 'blur' && (event.type !== 'click' || (numbered.lastEvent === 'focusin' && event.type === 'click'))) {
				if (numbered.input.setSelectionRange) {
					numbered.input.setSelectionRange(position, position);
				} else if (numbered.input.createTextRange) {
					var range = numbered.input.createTextRange();
					range.collapse(true);
					range.moveEnd('character', position);
					range.moveStart('character', position);
					range.select();
				}
			}

			numbered.oldValue = this.value;
			numbered.lastEvent = event.type;
			return event.target;
		};

		for (var index in self.inputs) {
			var $input = self.inputs[index];
			var is = false;
			if (typeof $input.numbered === 'оbject' || typeof $input.numbered !== 'undefined') {
				is = true;
			}
			$input.numbered = {
				input: self.inputs[index],
				config: self.config,
				params: self.params,
				oldValue: false
			};

			if (!is) {
				for (var key in self.config.events) {
					$input.addEventListener(self.config.events[key], self.magic);
				}
				self._eventFire($input, 'blur');
			}
			self.inputs[index] = $input;
		}

		self.destroy = function () {
			var self = this;
			for (var index in self.inputs) {
				var $input = self.inputs[index];

				for (var key in self.config.events) {
					$input.removeEventListener(self.config.events[key], self.magic);
					$input.numbered = null;
				}
			}
			return null;
		};

		self.validate = function (i) {
			var input = i || false;
			var self = this;
			var res = self.inputs.length > 1 ? [] : false;
			var inputs = input !== false ? [input] : self.inputs;
			for (var index in inputs) {
				var $input = inputs[index];
				var validate;

				if (inputs[index].numbered.config.regexp.test(inputs[index].numbered.input.value)) {
					validate = 1;
				} else if (inputs[index].numbered.input.value === '' || inputs[index].numbered.input.value === inputs[index].numbered.config.placeholder) {
					validate = 0;
				} else {
					validate = -1;
				}

				if (inputs.length > 1) {
					res.push(validate);
				} else {
					res = validate;
				}
			}
			return res;
		};

		self.reInit = function () {
			var self = this;
			var res = self.inputs.length > 1 ? [] : false;
			for (var index in self.inputs) {
				var $input = self.inputs[index];
				self._eventFire($input, 'blur');
			}
			return res;
		};

		self.setVal = function (value) {
			var self = this;
			var res = self.inputs.length > 1 ? [] : false;
			for (var index in self.inputs) {
				var $input = self.inputs[index];
				$input.value = value;
				self._eventFire($input, 'blur');
			}
			return res;
		};

		self.getVal = function (r) {
			var raw = r || false;
			var values = [];
			for (var index in this.inputs) {
				var $input = this.inputs[index];
				var value = $input.value;

				if (raw) {
					if (this.validate($input) > 0) {
						var arr = value.match(this.config.regexp);
						value = arr.slice(1, arr.length).join('');
					} else {
						value = $input.value.replace(/[^\d]/gi, '');
					}
				}
				values.push(value);
			}
			return values.length>1?values:values[0];
		};

		return self;
	};

	return Numbered;
}));

},{}],24:[function(require,module,exports){
(function (global){
// Best place to find information on XHR features is:
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

var reqfields = [
  'responseType', 'withCredentials', 'timeout', 'onprogress'
]

// Simple and small ajax function
// Takes a parameters object and a callback function
// Parameters:
//  - url: string, required
//  - headers: object of `{header_name: header_value, ...}`
//  - body:
//      + string (sets content type to 'application/x-www-form-urlencoded' if not set in headers)
//      + FormData (doesn't set content type so that browser will set as appropriate)
//  - method: 'GET', 'POST', etc. Defaults to 'GET' or 'POST' based on body
//  - cors: If your using cross-origin, you will need this true for IE8-9
//
// The following parameters are passed onto the xhr object.
// IMPORTANT NOTE: The caller is responsible for compatibility checking.
//  - responseType: string, various compatability, see xhr docs for enum options
//  - withCredentials: boolean, IE10+, CORS only
//  - timeout: long, ms timeout, IE8+
//  - onprogress: callback, IE10+
//
// Callback function prototype:
//  - statusCode from request
//  - response
//    + if responseType set and supported by browser, this is an object of some type (see docs)
//    + otherwise if request completed, this is the string text of the response
//    + if request is aborted, this is "Abort"
//    + if request times out, this is "Timeout"
//    + if request errors before completing (probably a CORS issue), this is "Error"
//  - request object
//
// Returns the request object. So you can call .abort() or other methods
//
// DEPRECATIONS:
//  - Passing a string instead of the params object has been removed!
//
exports.ajax = function (params, callback) {
  // Any variable used more than once is var'd here because
  // minification will munge the variables whereas it can't munge
  // the object access.
  var headers = params.headers || {}
    , body = params.body
    , method = params.method || (body ? 'POST' : 'GET')
    , called = false

  var req = getRequest(params.cors)

  function cb(statusCode, responseText) {
    return function () {
      if (!called) {
        callback(req.status === undefined ? statusCode : req.status,
                 req.status === 0 ? "Error" : (req.response || req.responseText || responseText),
                 req)
        called = true
      }
    }
  }

  req.open(method, params.url, true)

  var success = req.onload = cb(200)
  req.onreadystatechange = function () {
    if (req.readyState === 4) success()
  }
  req.onerror = cb(null, 'Error')
  req.ontimeout = cb(null, 'Timeout')
  req.onabort = cb(null, 'Abort')

  if (body) {
    setDefault(headers, 'X-Requested-With', 'XMLHttpRequest')

    if (!global.FormData || !(body instanceof global.FormData)) {
      setDefault(headers, 'Content-Type', 'application/x-www-form-urlencoded')
    }
  }

  for (var i = 0, len = reqfields.length, field; i < len; i++) {
    field = reqfields[i]
    if (params[field] !== undefined)
      req[field] = params[field]
  }

  for (var field in headers)
    req.setRequestHeader(field, headers[field])

  req.send(body)

  return req
}

function getRequest(cors) {
  // XDomainRequest is only way to do CORS in IE 8 and 9
  // But XDomainRequest isn't standards-compatible
  // Notably, it doesn't allow cookies to be sent or set by servers
  // IE 10+ is standards-compatible in its XMLHttpRequest
  // but IE 10 can still have an XDomainRequest object, so we don't want to use it
  if (cors && global.XDomainRequest && !/MSIE 1/.test(navigator.userAgent))
    return new XDomainRequest
  if (global.XMLHttpRequest)
    return new XMLHttpRequest
}

function setDefault(obj, key, value) {
  obj[key] = obj[key] || value
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[21]);
