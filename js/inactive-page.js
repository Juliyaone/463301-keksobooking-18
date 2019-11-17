'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormHeader = adForm.querySelector('.ad-form-header');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapFiltersAll = document.querySelector('.map__filters');
  var map = document.querySelector('.map');
  var adFormfields = adForm.querySelectorAll('.ad-form__element');
  var mapFilters = mapFiltersAll.querySelectorAll('.map__filter');
  var features = document.querySelectorAll('features');
  var fieldAddress = document.getElementById('address');

  mapPinMain.style.left = Math.floor(map.clientWidth / 2 - mapPinMain.offsetWidth / 2) + 'px';
  mapPinMain.style.top = Math.floor(map.clientHeight / 2 - mapPinMain.offsetHeight / 2) + 'px';

  var defoldCoordinateX = mapPinMain.style.left;
  var defoldCoordinateY = mapPinMain.style.top;

  var addsAttributeDisabled = function (elem) { // Добавляет атрибут disabled
    for (var i = 0; i < elem.length; i++) {
      elem[i].disabled = true;
      elem[i].disabled = 'disabled';
    }
  };

  var removePin = function () {
    var elements = document.querySelectorAll('.map__pin:not(.map__pin--main');
    elements.forEach(function (it) {
      it.remove();
    });
  };

  var deactivatesPage = function () {
    adForm.reset(); // Очищает поля формы
    window.card.close();
    removePin();
    mapPinMain.style.left = defoldCoordinateX;
    mapPinMain.style.top = defoldCoordinateY;
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
    mapPinMain.addEventListener('mousedown', window.activePage.mapPinMainClickHandler);
  };

  deactivatesPage();

  window.inactivePage = {
    deactivatesPage: deactivatesPage,
    removePin: removePin,
  };

})();
