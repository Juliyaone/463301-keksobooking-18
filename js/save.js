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

  var loadHandler = function () {
    window.deactivatesPage();
    createSuccess();

    var popupEscPressHandler = function (evt) { // Обработчик события esc закрывает всплывающее окно success, после отправки формы
      window.util.isEscEvent(evt, closeSuccessTemplate);
    };

    var success = document.querySelector('.success');

    var closeSuccessTemplate = function () { // функция закрытия всплывающего окна success, после отправки формы
      success.classList.add('hidden');
      document.removeEventListener('keydown', popupEscPressHandler);
    };

    success.addEventListener('click', function () { // Обработчик события клик по всплывающему окну success
      closeSuccessTemplate();
    });

    document.addEventListener('keydown', function (evt) { // Обработчик события keydown(esc) по всплывающему окну success
      window.util.isEscEvent(evt, closeSuccessTemplate);
    });
  };

  var errorTemplate = document
    .querySelector('#error')
    .content
    .querySelector('div');

  var createError = function () { // Создает копию темплейт и аппендит в дом в main
    var element = errorTemplate.cloneNode(true);
    main.appendChild(element);
  };

  var errorHandler = function () { // При ошибке загрузки данных на сервер, показывает сообщение об ошибке и деактивирует кнопку отправить
    createError();
    var popupEscPressHandler = function (evt) { // Обработчик события esc закрывает всплывающее окно error, после отправки формы
      window.util.isEscEvent(evt, closeErrorTemplate);
    };

    var error = document.querySelector('.error');

    var closeErrorTemplate = function () { // функция закрытия всплывающего окна error, после отправки формы
      error.classList.add('hidden');
      document.removeEventListener('keydown', popupEscPressHandler);
    };

    error.addEventListener('click', function () { // Обработчик события клик по всплывающему окну success
      closeErrorTemplate();
    });

    document.addEventListener('keydown', function (evt) { // Обработчик события keydown(esc) по всплывающему окну success
      window.util.isEscEvent(evt, closeErrorTemplate);
    });
  };

  form.addEventListener('submit', function (evt) { // Обработчик клика на кнопку отправить
    window.backend.save(new FormData(form), loadHandler, errorHandler); // Вызов функции отправки данных формы на сервер
    evt.preventDefault();
  });

  form.addEventListener('reset', function () { // Обработчик клика на кнопку очистить
    window.deactivatesPage();
  });

})();
