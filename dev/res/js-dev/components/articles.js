// для блока еще на странице статьи.ждет html верстку.


/* global Promise */

import nanoajax from 'nanoajax';

function who() {
  return document.querySelector('.moreCards');
}

export default function articles() {
  let holder;
  let link;
  let url;

  function findElements() {
    holder = document.querySelector('.moreCards');
    link = document.querySelector('.js-moreArticles');
    ({ url } = link.dataset);
  }

  function refreshCards(response) {
    let result = JSON.parse(response).html;
    result = result.replace(/\`/g,'\"');
    holder.innerHTML = result;
  }

  function fetchData() {
    return new Promise((resolve, reject) => {
      nanoajax.ajax({ url }, (code, response) => {
        if (code === 200) resolve(response);
        else reject(response);
      });
    });
  }

  function updateCards() {
    fetchData()
      .then(refreshCards)
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