'use strict';
(function () {
  // Реализуем перетаскивание

  var fieldAddress = document.getElementById('address');
  var mapPinMain = document.querySelector('.map__pin--main');

  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84; // Высота метки с ножкой
  var WIDTH_MAP = document.querySelector('.map__overlay').offsetWidth;
  var LOCATION_MAX_Y = 630;
  var LOCATION_MIN_Y = 130;
  var MAP_PIN_LEG = 20;

  var mapOverlay = document.querySelector('.map__overlay');

  var styleTop = mapPinMain.style.top = Math.floor(mapOverlay.clientHeight / 2 + mapPinMain.offsetWidth / 2 + MAP_PIN_LEG);
  var styleLeft = mapPinMain.style.left = Math.floor(mapOverlay.clientWidth / 2 + mapPinMain.offsetWidth / 2);

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var MouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;


      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX ,
        y: moveEvt.clientY
      };

      styleLeft = (mapPinMain.offsetLeft - shift.x);
      styleTop = (mapPinMain.offsetTop - shift.y);

      if (styleLeft >= WIDTH_MAP - (MAIN_PIN_WIDTH/2)) {
        styleLeft = WIDTH_MAP - MAIN_PIN_WIDTH/2;
      }

      if (styleLeft <= 0 - MAIN_PIN_WIDTH/2) {
        styleLeft = 0 - MAIN_PIN_WIDTH/2;
      }

      if (styleTop >= LOCATION_MAX_Y) {
        styleTop = LOCATION_MAX_Y;
      }

      if (styleTop <= LOCATION_MIN_Y) {
        styleTop = LOCATION_MIN_Y;
      }

      mapPinMain.style.left = styleLeft + 'px';
      mapPinMain.style.top = styleTop + 'px';

      var coordinatesForFormX = parseInt(mapPinMain.style.left, 10) + Math.floor(mapPinMain.offsetWidth / 2);
      var coordinatesForFormY = parseInt(mapPinMain.style.top, 10) + Math.floor(mapPinMain.offsetHeight + MAP_PIN_LEG);
      fieldAddress.value = coordinatesForFormX + ', ' + coordinatesForFormY;
    };

    var MouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', MouseMoveHandler);
      document.removeEventListener('mouseup', MouseUpHandler);

      if (dragged) {
        var preventDefaultClickHandler = function () {
          evt.preventDefault();
          mapPinMain.removeEventListener('click', preventDefaultClickHandler);
        };
        mapPinMain.addEventListener('click', preventDefaultClickHandler);
      }
    };

    document.addEventListener('mousemove', MouseMoveHandler);
    document.addEventListener('mouseup', MouseUpHandler);
  });

})();
