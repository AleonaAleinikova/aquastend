/* global Promise */
/* global ymaps */

const MAP_URL = 'https://api-maps.yandex.ru/2.1?apikey=7cd9c446-c06c-48a8-b45e-fa69b056bfe4&lang=ru_RU';

function addMap() {
  const mapCoords = [45.071332, 38.972124];

  const customIconSettings = {
    iconLayout: 'default#image',
    iconImageHref: '/res/images/pin.svg',
    iconImageSize: [51, 63],
    iconImageOffset: [-15, -70],
  };
  const map = new ymaps.Map('map', {
    center: mapCoords,
    zoom: 16,
    controls: [],
  });
  const placemark = new ymaps.Placemark(mapCoords, {}, customIconSettings);

  map.geoObjects
    .add(placemark);
}

function initMap() {
  if (ymaps) ymaps.ready(addMap);
}

function loadScript() {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.addEventListener('load', resolve);
    script.src = MAP_URL;
    script.type = 'text/javascript';
    document.body.appendChild(script);
  });
}

export function init() {
  if (document.querySelector('.map')) {
    loadScript()
      .then(initMap);
  }
}
