import FontFaceObserver from 'fontfaceobserver';

const LOADED_PREFIX = 'font-';
const LOADED_SUFFIX = '-is-loaded';

function getFontClassName(fontName) {
  const noSpaces = fontName.replace(/ /gu, '');
  return `${LOADED_PREFIX}${noSpaces}${LOADED_SUFFIX}`;
}

function addClass() {
  const preloader = document.querySelector('.preloader');
  preloader.classList.add('preloader-is-hidden');
}

function fontPromise(font) {
  const rest = new FontFaceObserver(font);
  rest
    .load()
    .then((loadedFont) => {
      document.body.classList.add(getFontClassName(loadedFont.family));
    })
    .catch(addClass)
}


export default function init(fontCritical, fontsRest) {
  const critical = new FontFaceObserver(fontCritical);
  critical
    .load()
    .then((loadedFont) => {
      document.body.classList.add(getFontClassName(loadedFont.family));
      if (fontsRest) {
        fontsRest.forEach(fontPromise);
      }
    });
};
