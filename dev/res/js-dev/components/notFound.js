// анимация на 404 стр

function who() {
  return document.querySelector('.notFoundCanvas');
}

export default function notFound() {
  let holder;
  let canvas;
  let context;
  let image;
  let width;
  let height;

  const IMAGE_WIDTH = 1500;
  const IMAGE_HEIGHT = 835;
  const IMAGE_RATIO = IMAGE_WIDTH / IMAGE_HEIGHT;

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
    return new Promise((resolve, reject) => {
      const image = new Image();
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
    const ratio = width / height;
    if (ratio < IMAGE_RATIO) context.drawImage(image, 0, 0, IMAGE_HEIGHT * ratio, IMAGE_HEIGHT, 0 , 0, width, height);
    else context.drawImage(image, 0, 0, IMAGE_WIDTH, IMAGE_WIDTH / ratio, 0 , 0, width, height);
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
    loadImage()
      .then((result) => image = result)
      .then(drawResult);
  }

  function addProperty(clientX, clientY) {
    holder.style.setProperty('--x', clientX + 'px');
    holder.style.setProperty('--y', clientY + 'px');
  }

  function onMouseMove(event) {
    const { clientX, clientY } = event;
    addProperty(clientX, clientY);
    requestAnimationFrame(() => clearBackground(clientX, clientY));
  }

  function onTouchMove(event) {
    const { clientX, clientY } = event.touches[0];
    addProperty(clientX, clientY);
    requestAnimationFrame(() => clearBackground(clientX, clientY));
  }

  function onResize() {
    initSizes();
    initCanvasSize();
    if (image) drawResult();
    else drawBackground();
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
