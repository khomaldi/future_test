// Данная функция создаёт кроссбраузерный объект XMLHTTP
function getXmlHttp() {
  let xmlhttp;
  try {
    xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    } catch (E) {
      xmlhttp = false;
    }
  }
  if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}

// Элемент-обёртка для комментариев
let comments = document.querySelector('.comments');

// Элемент формы
let form = document.querySelector('.form');

// Инпут имени
let nameInput = document.querySelector('.form__input_type_name');

// Инпут комментария
let commentInput = document.querySelector('.form__input_type_comment');

// Слушаем submit формы
form.addEventListener('submit', () => {
  // останавливаем перезагрузку,
  // которую вызывает submit
  event.preventDefault();

  // Сохраняем комментарий
  saveComment();
});

// Функция получает имя и комментарий из инпутов,
// затем вызывает sendToServer(), чтобы отправить
// данные на сервер и если всё true, выводит новый
// комментарий на странице
function saveComment() {
  // Записываем время и дату
  let dateNow = new Date();

  let time = String(dateNow.getHours()) + ':' + String(dateNow.getMinutes());
  let date = String(dateNow.getDate()) + '.' + String(dateNow.getMonth() + 1) + '.' + String(dateNow.getFullYear());

  // Вызываем функцию отправки данных на сервер
  sendToServer(nameInput.value, commentInput.value, time, date);
}

// Функция отправляет комментарий php обработчику на сервер
function sendToServer(name, comment, time, date) {
  // Создаём объект XMLHTTP
  const xmlhttp = getXmlHttp();

  // Открываем асинхронное соединение типа POST
  xmlhttp.open('POST', 'https://4143.ru/functions/saveComment.php', true);

  // Устанавливаем кодировкy
  xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Отправляем запрос
  xmlhttp.send('name=' + encodeURIComponent(name) + '&comment=' + encodeURIComponent(comment) + '&time=' + encodeURIComponent(time) + '&date=' + encodeURIComponent(date));

  // Ждём ответа от сервера
  xmlhttp.onreadystatechange = function () {
    // Ответ пришёл
    if (xmlhttp.readyState == 4) {
      // Сервер вернул код 200 (что хорошо)
      if (xmlhttp.status == 200) {
        // В xmlhttp.responseText содержится ответ сервера
        if (xmlhttp.responseText == true) {
          // Если всё true, очищаем инпуты
          // и выводим новый коммент
          nameInput.value = '';
          commentInput.value = '';

          showNewComment(name, comment, time, date);
        } else {
          alert('Что-то пошло не так… Ответ сервера: ' + xmlhttp.responseText);
        }
      }
    }
  };
}

// Функция отображает новый комментарий
function showNewComment(name, comment, time, date) {
  let newCommentLine = generateCommentLine(name, comment, time, date);

  comments.append(newCommentLine);
}

// Функция генерирует html код для нового комментария
function generateCommentLine(name, comment, time, date) {
  let commentLine = getTemplate();

  let nameElement = commentLine.querySelector('.comments__name');
  let commentElement = commentLine.querySelector('.comments__text');
  let timeElement = commentLine.querySelector('.comments__time');
  let dateElement = commentLine.querySelector('.comments__date');

  nameElement.textContent = name;
  commentElement.textContent = comment;
  timeElement.textContent = time;
  dateElement.textContent = date;

  return commentLine;
}

// Функция находит template, клонирует и возращает
function getTemplate() {
  const commentLine = document.querySelector('#comment-template').content.cloneNode(true);

  return commentLine;
}
