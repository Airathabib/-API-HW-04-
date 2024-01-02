// Задание 1
// находим кнопку и картинки svg
const btn = document.getElementById('btnSvg');
const svgWhite = document.getElementById('btn-svg-1');
const svgBlack = document.getElementById('btn-svg-2')

// вешаем на кнопку обработку события, изменения классов в нужных картинках
btn.addEventListener('click', (e) => {
  e.preventDefault();
  svgWhite.classList.toggle('hidden')
  svgBlack.classList.toggle('hidden')
})

// Задание 2

// находим кнопку
const btnInfo = document.getElementById('btn-info')

// присваиваем кнопке событие, по клику вызывается функция которая выводит информацию по размерам экрана
btnInfo.addEventListener('click', (e) => {
  e.preventDefault();
  getWindowSize();
})

// пишем функцию которая находит и выводит размеры экрана
function getWindowSize() {
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  const scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight);

  return alert(`Ширина окна браузера равна ${width}px, высота видимой части ${height}px, вся высота документа ${scrollHeight}px`);
}

// Задание 3

// чат

// находим элементы
const url = "wss://echo-ws-service.herokuapp.com";
const output = document.getElementById('output');
const btnMessage = document.getElementById('btnMessage');
const btnGeo = document.getElementById('btnGeo');
const input = document.getElementById('input')

let websocket;

// вещаем событие при загрузке страницы запускать соединения с сервером
document.addEventListener('DOMContentLoaded', () => {
  websocket = new WebSocket(url);
  websocket.onopen = function (evt) {
    console.log('Connected');
  };
  websocket.onclose = function (evt) {
    writeMessage(`Disconnected`, 'flex-end');
  };

  websocket.onmessage = function (evt) {
    writeMessage(`<i>ответ сервера:</i>  ${evt.data}`, 'flex-end');
    console.log(`${evt.data}`);
  };
  websocket.onerror = function (evt) {
    writeMessage(`сервер: ${evt.data}`, 'flex-end');
  }
})

//  пишем функцию которая выводит сообщения
function writeMessage(message, position = `flex-start`) {
  let text = `
  <p class="text", style='align-self:${position}'>
  ${message}
  </p>
  `
  let chat = output.innerHTML;
  output.innerHTML = chat + text;
}

// вешаем на кнопку отправку сообщения по клику.
btnMessage.addEventListener('click', (e) => {
  e.preventDefault();
  let message = input.value;
  websocket.send(message)
  writeMessage(message);
  input.value = ''
})

// Геолокация

// пишем функцию об успешном получении геолокации
const success = (position) => {
  console.log('position', position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
  writeMessage(`<a href='${link}' target='_blank'>Ваша геолокация</a>`, 'flex-end')
};

// пишем функцию об ошибке
const error = () => {
  writeMessage('Невозможно получить ваше местоположение', 'flex-end')
};

// вешаем на кнопку обработку события и выведения сообщения
btnGeo.addEventListener('click', (e) => {
  e.preventDefault();
  if (!navigator.geolocation) {
    writeMessage('Geolocation не поддерживается вашим браузером', 'flex-end')
  }
  else {
    navigator.geolocation.getCurrentPosition(success, error)
  }
});
