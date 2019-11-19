'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var main = document.querySelector('main');

  var successTemplate = document
    .querySelector('#success')
    .content
    .querySelector('div');

  var createSuccess = function () {
    var element = successTemplate.cloneNode(true);
    main.appendChild(element);
  };

  var successSaveHandler = function () {
    var errorLoad = document.querySelector('.error__load');
    if (errorLoad) {
      errorLoad.classList.add('hidden');
    }
    window.inactivePage.deactivatesPage();
    window.inactivePage.deactivatesFilters();
    window.inactivePage.deactivatesForm();
    createSuccess();

    var success = document.querySelector('.success');

    var closeSuccessTemplate = function () {
      success.classList.add('hidden');
      document.removeEventListener('keydown', popupEscPressHandler);
    };

    var popupEscPressHandler = function (evt) {
      window.util.isEscEvent(evt, closeSuccessTemplate);
    };

    success.addEventListener('click', closeSuccessTemplate);

    document.addEventListener('keydown', popupEscPressHandler);
  };

  var errorTemplate = document
    .querySelector('#error')
    .content
    .querySelector('div');

  var createError = function () {
    var element = errorTemplate.cloneNode(true);
    main.appendChild(element);
  };

  var errorSaveHandler = function (errorMessage) {
    var errorLoad = document.querySelector('.error__load');

    if (errorLoad) {
      errorLoad.classList.add('hidden');
    }
    createError();
    window.inactivePage.deactivatesPage();
    window.inactivePage.deactivatesFilters();
    window.inactivePage.deactivatesForm();

    var popupErrorEscPressHandler = function (evt) {
      window.util.isEscEvent(evt, closesErrorTemplate);
    };

    var error = document.querySelector('.error');
    var errorMessagePopup = error.querySelector('.error__message');
    errorMessagePopup.textContent = errorMessage;

    var closesErrorTemplate = function () {
      error.classList.add('hidden');
      document.removeEventListener('keydown', popupErrorEscPressHandler);
    };

    error.addEventListener('click', closesErrorTemplate);

    document.addEventListener('keydown', popupErrorEscPressHandler);

    var errorButton = error.querySelector('.error__button');

    errorButton.addEventListener('click', closesErrorTemplate);
  };

  var nodNetworkHandler = function (errorMessage) {
    errorSaveHandler(errorMessage);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), successSaveHandler, errorSaveHandler, nodNetworkHandler);
    evt.preventDefault();
  });

  form.addEventListener('reset', function () {
    window.inactivePage.deactivatesPage();
    window.inactivePage.deactivatesFilters();
    window.inactivePage.deactivatesForm();
  });

})();
