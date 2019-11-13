'use strict';
(function () {
  // Реализуем перетаскивание

  var fieldAddress = document.getElementById('address');
  var mapPinMain = document.querySelector('.map__pin--main');
  var styleLeft = parseInt(mapPinMain.style.left, 10);
  var styleTop = parseInt(mapPinMain.style.top, 10);

  fieldAddress.value = styleLeft + ', ' + styleTop; // находим координаты главной метки в HTML-коде, для НЕактивной страницы, записываем их в поле адрес

  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 82;
  var WIDTH_MAP = document.querySelector('.map').offsetWidth;
  var LOCATION_MAX_Y = 630;
  var LOCATION_MIN_Y = 130;


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
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      styleTop = (mapPinMain.offsetTop - shift.y);
      styleLeft = (mapPinMain.offsetLeft - shift.x);

      if (mapPinMain.offsetLeft >= WIDTH_MAP) {
        styleLeft = WIDTH_MAP - MAIN_PIN_WIDTH;
      }

      if (mapPinMain.offsetLeft < 0) {
        styleLeft = mapPinMain.offsetLeft + (MAIN_PIN_WIDTH / 2);
      }

      if (mapPinMain.offsetTop > LOCATION_MAX_Y) {
        styleTop = mapPinMain.offsetTop - MAIN_PIN_HEIGHT;
      }

      if (mapPinMain.offsetTop < LOCATION_MIN_Y) {
        styleTop = mapPinMain.offsetTop + MAIN_PIN_HEIGHT;
      }

      mapPinMain.style.left = styleLeft + 'px';
      mapPinMain.style.top = styleTop + 'px';

      fieldAddress.value = parseInt(mapPinMain.style.left, 10) + ', ' + parseInt(mapPinMain.style.top, 10);
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
