import Numbered from 'input.numbered';
import nanoajax from 'nanoajax';

function initMask(id) {
  return new Numbered(`#${id}phone`, {
    mask: '+7 (###) ### - ## - ##',
    numbered: '#',
    empty: '_',
    placeholder: true,
  });
}

function activeteButton(element) {
  element.removeAttribute('disabled');
}

function disactiveteButton(element) {
  element.setAttribute('disabled', 'disabled');
}

function validatePhone(phoneMask, target) {
  const result = phoneMask.validate();
  if (result < 0) target.classList.add('field-has-error');
  return result > 0;
}

function validateName(target) {
  const result = target.value !== '';
  if (!result) target.classList.add('field-has-error');
  return result;
}

export default function form(item, id) {
  let submit;
  let isPhone;
  let isName;
  let phoneMask;
  let isActive;

  function findElements() {
    submit = item.querySelector('.feedbackSubmit');
  }

  function checkField(target) {
    if (target.name === 'phone') isPhone = validatePhone(phoneMask, target);
    else if (target.name === 'name') isName = validateName(target);
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
    return new Promise((resolve, reject) => {
      nanoajax.ajax({
        url: form.action,
        method: 'POST',
        body: data,
      }, (code, response) => {
        if (code === 200) resolve();
        else showError(response);
      });
    });
  }

  function onSubmit(event) {
    event.preventDefault();
    sendData(collectData())
      .then(showSuccess);
  }

  function onFocusout(event) {
    const { target } = event;
    checkField(target);
    if (isActive) activeteButton(submit);
    else disactiveteButton(submit);
  }

  function onFocus(event) {
    const { target } = event;
    target.classList.remove('field-has-error');
    // errorMessage.classList.remove('errorMessage-is-active');
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