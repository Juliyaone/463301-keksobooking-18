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

  var removeCard = function () { // Удаляет карточку после отправки формы и reset
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
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
    mapPinMain.style.left = DEFOLD_COORDINATE_X;
    mapPinMain.style.top = DEFOLD_COORDINATE_Y;
    var coordLeftDefolt = parseInt(mapPinMain.style.left, 10) + Math.floor(mapPinMain.offsetWidth / 2);
    var coordTopDefolt = parseInt(mapPinMain.style.top, 10) + Math.floor(mapPinMain.offsetHeight / 2);
    fieldAddress.value = coordLeftDefolt + ', ' + coordTopDefolt;

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

    var fieldAddress = document.getElementById('address');
    mapPinMain.style.left = window.STARTING_COORDINATE_X;
    mapPinMain.style.top = window.STARTING_COORDINATE_Y;
    var coordLeftStarting = parseInt(mapPinMain.style.left, 10) + Math.round(mapPinMain.offsetWidth / 2);
    var coordTopStarting = parseInt(mapPinMain.style.top, 10) + Math.round((mapPinMain.offsetHeight / 2) + MAP_PIN_LEG);

    fieldAddress.value = coordLeftStarting + ', ' + coordTopStarting;

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

  var debouncedFilterHandler = window.util.debounce(function () {
    removeElements();
    window.render.render(window.filter.filters(window.loadingPins.allPins));
    window.card.openCard();
  });

  mapFilters.addEventListener('change', function () {
    removeElements();
    debouncedFilterHandler();
  });
})();
