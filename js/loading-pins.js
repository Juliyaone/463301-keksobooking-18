'use strict';
(function () {
  var mapPinMain = document.querySelector('.map__pin--main');


  var successLoadHandler = function (data) {
    window.loadingPins.allPins = data;
    window.render.pin(window.loadingPins.allPins);
    window.card.open();
  };


  var errorLoadHandler = function (errorMessage) {
    window.inactivePage.deactivatesPage(); // Деактивируем страницу
    mapPinMain.disabled = true;
    mapPinMain.disabled = 'disabled'; // Блокируем кнопку

    var div = document.createElement('div');
    div.className = 'error__load';
    div.style = 'z-index: 100';
    div.style.backgroundColor = 'red';
    div.style.position = 'absolute';
    div.style.left = 0;
    div.style.right = 0;
    div.style.top = 0;
    div.style.margin = '0 auto';
    div.style.textAlign = 'center';

    var string = document.createElement('span');
    string.className = 'error__string';
    string.style.fontSize = '30px';
    string.style.margin = '10px auto';
    string.style.width = '100%';

    var text = document.createTextNode(errorMessage);

    string.appendChild(text);
    div.appendChild(string);
    document.body.insertAdjacentElement('afterbegin', div);
  };

  window.loadingPins = {
    success: successLoadHandler,
    error: errorLoadHandler,
    allPins: []
  };

})();
