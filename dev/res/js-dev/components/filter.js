/* global Promise */

import nanoajax from 'nanoajax';

function who() {
  return document.querySelector('.filterSection');
}

function isFilterItem(target) {
  return target.classList.contains('js-filterItem');
}

function checkThemes(conditions, target) {
  const themes = conditions.theme;
  const value = parseInt(target.value, 10);
  if (target.checked) themes.push(value);
  else {
    const index = themes.indexOf(value);
    themes.splice(index, 1);
  }
}

function showThemes(themesHolder) {
  themesHolder.classList.remove('articlesType-is-hidden');
}

function  hideThemes(themesHolder) {
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
  if (target.name === 'theme') checkThemes(conditions, target);
  else {
    conditions[target.name] = target.value;
    resetThemes(conditions, themesHolder);
  }
}

function fetchData(url) {
  return new Promise((resolve, reject) => {
    nanoajax.ajax({ url }, (code, response) => {
      const responseData = JSON.parse(response);
      if (code === 200) resolve(responseData);
      else reject(response);
    });
  });
}

function renderCard(element) {
  const type = element.type[0].toUpperCase() + element.type.slice(1)
  let card = `<div class="card card-article${type}">`;
  if (element.title) card += `<h3 class="cardTitle">${element.title}</h3>`;
  if (element.description) card += `<p class="cardDescription">${element.description}</p>`;
  if (element.image) card += `<div class="cardImageHolder" style="background-image: url('${element.image}"><img src="${element.image}" alt="" class="cardImage"></div>`;
  card += '</div>';
  return card;
}

function renderContent(content) {
  let result = '';
  content.forEach(element => result += renderCard(element));
  return result;
}

export default function filter() {
  let filter;
  let moreLink;
  let conditions = { 'theme': [0, 1, 2, 3, 4]};
  let container;
  let data;
  let themesHolder;

  function findElements() {
    filter = document.querySelector('.filterSection');
    container = document.querySelector('.blogResults');
    themesHolder = document.querySelector('.articlesType');
  }

  function checkConditions(item, conditions, key) {
    let result;
    if (key === 'theme') result = conditions[key].indexOf(parseInt(item[key], 10)) >= 0;
    else result = item[key] ?  item[key].toString() === conditions[key].toString() : false;
    return result;
  }

  function filterItem(acc, item) {
    const shouldAdd = Object.keys(conditions).every(key => conditions[key] === 'all' || checkConditions(item, conditions, key));
    if (shouldAdd) acc.push(item);
    return acc;
  }

  function filterData() {
    return data.reduce(filterItem, []);
  }

  function updateFilter(target) {
    updateCondition(target, conditions, themesHolder);
    const content = filterData();
    const html = renderContent(content);
    container.innerHTML = html;
  }

  function onChange(event) {
    const { target } = event;
    if (isFilterItem(target)) updateFilter(target);
  }

  function subscribe() {
    filter.addEventListener('change', onChange);
  }

  function startFilter(response) {
    data = response;
    subscribe();
  }

  function getData() {
    const url = filter.dataset.url;
    fetchData(url)
      .then(startFilter);
  }

  function init() {
    if (who()) {
      findElements();
      getData();
    }
  }

  init();
}