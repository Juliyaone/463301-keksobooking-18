'use strict';

(function () {
  var MAP_PIN_LEG = 20;
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormfields = adForm.querySelectorAll('.ad-form__element');
  var mapFiltersAll = document.querySelector('.map__filters');
  var mapFilters = mapFiltersAll.querySelectorAll('.map__filter');
  var features = document.querySelectorAll('features');
  var adFormHeader = adForm.querySelector('.ad-form-header');
  var mapOverlay = document.querySelector('.map__overlay');
  var fieldAddress = document.getElementById('address');


  mapPinMain.style.left = Math.floor((mapOverlay.clientWidth / 2) - (mapPinMain.offsetWidth / 2)) + 'px';
  mapPinMain.style.top = Math.floor((mapOverlay.clientHeight / 2) - mapPinMain.offsetHeight - MAP_PIN_LEG) + 'px';

  var srartingCoordinateX = mapPinMain.style.left;
  var srartingCoordinateY = mapPinMain.style.top;

  var removeAttributeDisabled = function (elem) { // Удаляет атрибут disabled
    for (var i = 0; i < elem.length; i++) {
      elem[i].disabled = false;
      elem[i].disabled = '';
    }
  };

  var activatesPage = function () { // функция для обработчика событий, активирует карту и формы
    window.card.close();
    map.classList.remove('map--faded'); // Активируем карту
    mapPinMain.style.left = srartingCoordinateX;
    mapPinMain.style.top = srartingCoordinateY;

    var coordLeftStarting = parseInt(mapPinMain.style.left, 10) + Math.round(mapPinMain.offsetWidth / 2);
    var coordTopStarting = parseInt(mapPinMain.style.top, 10) + Math.round(mapPinMain.offsetHeight + MAP_PIN_LEG);

    fieldAddress.value = coordLeftStarting + ', ' + coordTopStarting;

    adForm.classList.remove('ad-form--disabled'); // Активируем форму
    mapFiltersAll.classList.remove('map__filters--disabled'); // Активируем фильтры
    removeAttributeDisabled(adFormfields); // Удаляет атрибут disablet у полей фильтра
    removeAttributeDisabled(mapFilters);
    removeAttributeDisabled(features);
    adFormHeader.disabled = false;
    adFormHeader.disabled = '';
    window.backend.load(window.loadingPins.success, window.loadingPins.error);

    mapPinMain.removeEventListener('mousedown', mapPinMainClickHandler);
  };

  var mapPinMainClickHandler = function () {
    activatesPage();
  };

  mapPinMain.addEventListener('mousedown', mapPinMainClickHandler);

  var filterRemoveDebounceFilterHandler = window.util.debounce(function () {
    window.inactivePage.removePin();
    window.render.pin(window.filter.pin(window.loadingPins.allPins));
    window.card.open();
  });

  mapFiltersAll.addEventListener('change', function () {
    window.inactivePage.removePin();
    filterRemoveDebounceFilterHandler();
  });

  window.activePage = {
    srartingCoordinateX: srartingCoordinateX,
    srartingCoordinateY: srartingCoordinateY,
    mapPinMainClickHandler: mapPinMainClickHandler
  };

})();
