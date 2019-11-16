'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormfields = adForm.querySelectorAll('.ad-form__element');
  var mapFiltersAll = document.querySelector('.map__filters');
  var mapFilters = mapFiltersAll.querySelectorAll('.map__filter');
  var features = document.getElementsByName('features');
  var form = document.querySelector('.ad-form');
  var mapPinsParent = document.querySelector('.map__pins');
  var adFormHeader = adForm.querySelector('.ad-form-header');
  var MAP_PIN_LEG = 20;
  var mapOverlay = document.querySelector('.map__overlay');
  var DEFOLD_COORDINATE_X = mapPinMain.style.left = Math.floor(map.clientWidth / 2 - mapPinMain.offsetWidth / 2) + 'px';
  var DEFOLD_COORDINATE_Y = mapPinMain.style.top = Math.floor(map.clientHeight / 2 - mapPinMain.offsetHeight / 2) + 'px';
  var STARTING_COORDINATE_X = mapPinMain.style.left = Math.floor(mapOverlay.clientWidth / 2 - mapPinMain.offsetWidth / 2) + 'px';
  var STARTING_COORDINATE_Y = mapPinMain.style.top = Math.floor(mapOverlay.clientHeight / 2 - mapPinMain.offsetWidth / 2 - MAP_PIN_LEG) + 'px';

  // Большая метка имеет координаты относительно .map
  // Маленькая метка относительно .map__overlay

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


  // Деактивируем карту
  window.deactivatesPage = function () {
    form.reset(); // Очищает поля формы
    window.card.closeCard();
    var mapPins = Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main)'));

    // Удаляет пины
    mapPins.forEach(function (it) {
      mapPinsParent.removeChild(it);
    });

    var fieldAddress = document.getElementById('address');
    mapPinMain.style.left = DEFOLD_COORDINATE_X;
    mapPinMain.style.top = DEFOLD_COORDINATE_Y;
    var coordLeftDefolt = parseInt(mapPinMain.style.left, 10) + Math.floor(mapPinMain.offsetWidth / 2);
    var coordTopDefolt = parseInt(mapPinMain.style.top, 10) + Math.floor(mapPinMain.offsetHeight / 2);
    fieldAddress.value = coordLeftDefolt + ', ' + coordTopDefolt;

    map.classList.add('map--faded'); // Деактивируем карту

    adForm.classList.add('ad-form--disabled'); // Деактивируем форму

    mapFiltersAll.classList.add('map__filters--disabled'); // Деактивируем фильтры

    addsAttributeDisabled(adFormfields); // Добавляет атрибут disablet полям фильтра
    addsAttributeDisabled(mapFilters);
    addsAttributeDisabled(features);
    adFormHeader.disabled = true; // Деактивирует поле
    adFormHeader.disabled = 'disabled';
    mapPinMain.addEventListener('mousedown', mapPinMainClickHandler);
  };

  window.deactivatesPage();

  var removeElements = function () {
    var elements = document.querySelectorAll('.map__pin:not(.map__pin--main');
    elements.forEach(function (it) {
      it.remove();
    });
  };


  // Активируем карту

  var activatesPage = function () { // функция для обработчика событий, активирует карту и формы
    window.card.closeCard();
    map.classList.remove('map--faded'); // Активируем карту

    var fieldAddress = document.getElementById('address');
    mapPinMain.style.left = STARTING_COORDINATE_X;
    mapPinMain.style.top = STARTING_COORDINATE_Y;
    var coordLeftStarting = parseInt(mapPinMain.style.left, 10) + Math.round(mapPinMain.offsetWidth / 2);
    var coordTopStarting = parseInt(mapPinMain.style.top, 10) + Math.round((mapPinMain.offsetHeight / 2) + MAP_PIN_LEG);

    fieldAddress.value = coordLeftStarting + ', ' + coordTopStarting;

    adForm.classList.remove('ad-form--disabled'); // Активируем форму
    mapFiltersAll.classList.remove('map__filters--disabled'); // Активируем фильтры
    removeAttributeDisabled(adFormfields); // Удаляет атрибут disablet у полей фильтра
    removeAttributeDisabled(mapFilters);
    removeAttributeDisabled(features);
    adFormHeader.disabled = false;
    adFormHeader.disabled = '';
    window.backend.load(window.loadingPins.successLoadHandler, window.loadingPins.errorLoadHandler);

    mapPinMain.removeEventListener('mousedown', mapPinMainClickHandler);
  };

  var mapPinMainClickHandler = function () {
    activatesPage();
  };

  mapPinMain.addEventListener('mousedown', mapPinMainClickHandler);

  var filterRemoveDebounceFilterHandler = window.util.debounce(function () {
    removeElements();
    window.render.render(window.filter.filters(window.loadingPins.allPins));
    window.card.opensCardByClickingOnPin();
  });

  mapFiltersAll.addEventListener('change', function () {
    removeElements();
    filterRemoveDebounceFilterHandler();
  });
})();
