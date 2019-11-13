'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormFildset = adForm.querySelectorAll('.ad-form__element');
  var mapFilters = document.querySelector('.map__filters');
  var mapFilter = mapFilters.querySelectorAll('.map__filter');
  var features = document.getElementsByName('features');
  var form = document.querySelector('.ad-form');
  var mapPinsParent = document.querySelector('.map__pins');
  var adFormHeader = adForm.querySelector('.ad-form-header');

  var addsAttributeDisabled = function (elem) { // Добавляет атрибут disabled
    for (var i = 0; i < elem.length; i++) {
      elem[i].disabled = true;
      elem[i].disabled = 'disabled';
    }
  };

  var removeAttributeDisabled = function (elem) { // Удаляет атрибут disabled
    for (var i = 0; i < elem.length; i++) {
      elem[i].disabled = false;
      elem[i].disabled = '';
    }
  };

  var removeCard = function () { // Удаляет карточку после отправки формы и reset
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  // Запомнили стартовые координаты метки
  var startCoords = {
    x: '570px',
    y: '375px'
  };


  // Деактивируем карту
  window.deactivatesPage = function () {
    form.reset(); // Очищает поля формы после отправки

    removeCard(); // Удаляет карточку после отправки

    var mapPins = Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main)'));

    // Удаляет пины после отправки формы
    mapPins.forEach(function (it) {
      mapPinsParent.removeChild(it);
    });

    var fieldAddress = document.getElementById('address');
    mapPinMain.style.left = startCoords.x;
    mapPinMain.style.top = startCoords.y;
    fieldAddress.value = mapPinMain.style.left + ', ' + mapPinMain.style.top;

    map.classList.add('map--faded'); // Деактивируем карту

    adForm.classList.add('ad-form--disabled'); // Деактивируем форму

    mapFilters.classList.add('map__filters--disabled'); // Деактивируем фильтры

    addsAttributeDisabled(adFormFildset); // Добавляет атрибут disablet полям фильтра
    addsAttributeDisabled(mapFilter);
    addsAttributeDisabled(features);
    adFormHeader.disabled = true; // Деактивирует поле загрузки фотографии
    adFormHeader.disabled = 'disabled';
  };

  window.deactivatesPage();

  var removeElements = function () {
    var elements = document.querySelectorAll('.map__pin:not(.map__pin--main');
    elements.forEach(function (it) {
      it.remove();
    });
  };


  // Активируем карту
  var activatesPageHandler = function () { // функция для обработчика событий, активирует карту и формы

    map.classList.remove('map--faded'); // Активируем карту
    adForm.classList.remove('ad-form--disabled'); // Активируем форму
    mapFilters.classList.remove('map__filters--disabled'); // Активируем фильтры
    removeAttributeDisabled(adFormFildset); // Удаляет атрибут disablet у полей фильтра
    removeAttributeDisabled(mapFilter);
    removeAttributeDisabled(features);
    adFormHeader.disabled = false;
    adFormHeader.disabled = '';
    window.backend.load(window.loadingPins.successHandler, window.loadingPins.errorHandler);

    mapPinMain.removeEventListener('mousedown', activatesPageHandler);
  };

  mapPinMain.addEventListener('mousedown', activatesPageHandler);

  mapFilters.addEventListener('click', function () {
    window.card.closeCard();
  });

  mapFilters.addEventListener('change', function () {
    removeElements();
    window.card.closeCard();
    window.render.render(window.filter.filters(window.loadingPins.allPins));
    window.card.openCard();
    window.card.updateCards(window.loadingPins.allPins);
  });
})();
