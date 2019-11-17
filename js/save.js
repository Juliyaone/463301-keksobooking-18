'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var main = document.querySelector('main');

  var successTemplate = document
    .querySelector('#success')
    .content
    .querySelector('div');

  var createSuccess = function () { // Создает копию темплейт и аппендит в дом в main
    var element = successTemplate.cloneNode(true);
    main.appendChild(element);
  };

  var successSaveHandler = function () {
    window.inactivePage.deactivatesPage();
    createSuccess();

    var success = document.querySelector('.success');

    var closeSuccessTemplate = function () { // функция закрытия всплывающего окна success, после отправки формы
      success.classList.add('hidden');
      document.removeEventListener('keydown', popupEscPressHandler);
    };

    var popupEscPressHandler = function (evt) { // Обработчик события esc закрывает всплывающее окно success, после отправки формы
      window.util.isEscEvent(evt, closeSuccessTemplate);
    };

    success.addEventListener('click', closeSuccessTemplate);

    document.addEventListener('keydown', popupEscPressHandler);
  };


  var errorTemplate = document
    .querySelector('#error')
    .content
    .querySelector('div');

  var createError = function () { // Создает копию темплейт и аппендит в дом в main
    var element = errorTemplate.cloneNode(true);
    main.appendChild(element);
  };

  var errorSaveHandler = function (errorMessage) { // При ошибке загрузки данных на сервер, показывает сообщение об ошибке и деактивирует кнопку отправить
    createError();

    var popupErrorEscPressHandler = function (evt) { // Обработчик события esc закрывает всплывающее окно error, после отправки формы
      window.util.isEscEvent(evt, closeErrorTemplate);
    };

    var error = document.querySelector('.error');
    var errorMessagePopup = error.querySelector('.error__message');
    errorMessagePopup.textContent = errorMessage;

    var closeErrorTemplate = function () {
      error.classList.add('hidden');
      window.inactivePage.deactivatesPage();
      document.removeEventListener('keydown', popupErrorEscPressHandler);
    };

    error.addEventListener('click', closeErrorTemplate);

    document.addEventListener('keydown', popupErrorEscPressHandler);

    var errorButton = error.querySelector('.error__button');

    errorButton.addEventListener('click', closeErrorTemplate);
  };


  form.addEventListener('submit', function (evt) { // Обработчик клика на кнопку отправить
    window.backend.save(new FormData(form), successSaveHandler, errorSaveHandler); // Вызов функции отправки данных формы на сервер
    evt.preventDefault();
  });

  form.addEventListener('reset', function () { // Обработчик клика на кнопку очистить
    window.inactivePage.deactivatesPage();
  });

})();
