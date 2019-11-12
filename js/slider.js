'use strict';
(function () {
  // Реализуем перетаскивание

  var fieldAddress = document.getElementById('address');
  var mapPinMain = document.querySelector('.map__pin--main');

  fieldAddress.value = mapPinMain.style.left + ', ' + mapPinMain.style.top; // находим координаты главной метки в HTML-коде, для НЕактивной страницы, записываем их в поле адрес

  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 82;
  var WIDTH_MAP = document.querySelector('.map').offsetWidth;
  var LOCATION_MAX_Y = 630;
  var LOCATION_MIN_Y = 130;

  window.pin = {
    allPins: []
  }

  var successHandler = function (data) {
    window.pin.allPins = data;
    window.render.render(window.pin.allPins);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };


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

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      if (mapPinMain.offsetLeft >= WIDTH_MAP) {
        mapPinMain.style.left = WIDTH_MAP - MAIN_PIN_WIDTH + 'px';
      }

      if (mapPinMain.offsetLeft < 0) {
        mapPinMain.style.left = mapPinMain.offsetLeft + (MAIN_PIN_WIDTH / 2) + 'px';
      }

      if (mapPinMain.offsetTop > LOCATION_MAX_Y) {
        mapPinMain.style.top = mapPinMain.offsetTop - MAIN_PIN_HEIGHT + 'px';
      }

      if (mapPinMain.offsetTop < LOCATION_MIN_Y) {
        mapPinMain.style.top = mapPinMain.offsetTop + MAIN_PIN_HEIGHT + 'px';
      }

      fieldAddress.value = mapPinMain.style.left + ', ' + mapPinMain.style.top;
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

  window.slider = {
    successHandler: successHandler,
    errorHandler: errorHandler
  };

})();
