import form from 'form';

function who() {
  return document.querySelector('.feedback');
}

export default function forms() {
  let forms;

  function findElements() {
    forms = [].slice.call(document.querySelectorAll('.feedback'));
  }

  function initModules() {
    forms.forEach(element => {
      const id = element.dataset.id ? element.dataset.id : '';
      form(element, id);
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