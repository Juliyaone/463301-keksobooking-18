'use strict';
(function () {
  var MAIN_PIN_WIDTH = 62;
  var LOCATION_MAX_Y = 630;
  var LOCATION_MIN_Y = 130;
  var MAP_PIN_LEG = 20;

  var fieldAddress = document.getElementById('address');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapOverlay = document.querySelector('.map__overlay');
  var widthMap = mapOverlay.clientWidth;

  var styleLeft = parseInt(window.activePage.srartingCoordinateX, 10);
  var styleTop = parseInt(window.activePage.srartingCoordinateY, 10);

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var mouseMoveHandler = function (moveEvt) {
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

      styleLeft = (mapPinMain.offsetLeft - shift.x);
      styleTop = (mapPinMain.offsetTop - shift.y);

      if (styleLeft >= widthMap - (MAIN_PIN_WIDTH / 2)) {
        styleLeft = widthMap - MAIN_PIN_WIDTH / 2;
      }

      if (styleLeft <= 0 - MAIN_PIN_WIDTH / 2) {
        styleLeft = 0 - MAIN_PIN_WIDTH / 2;
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

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (dragged) {
        var preventDefaultClickHandler = function () {
          evt.preventDefault();
          mapPinMain.removeEventListener('click', preventDefaultClickHandler);
        };
        mapPinMain.addEventListener('click', preventDefaultClickHandler);
      }
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

})();
