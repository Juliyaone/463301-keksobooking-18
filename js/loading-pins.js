'use strict';
(function () {
  window.loadingPins = {
    allPins: []
  };

  var successLoadHandler = function (data) {
    window.loadingPins.allPins = data;
    window.render.pin(window.loadingPins.allPins);
    window.card.open();
  };

  var errorLoadHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100';
    node.style.margin = '0 auto';
    node.style.textAlign = 'center';
    node.style. backgroundColor = 'red';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.loadingPins = {
    success: successLoadHandler,
    error: errorLoadHandler
  };

})();
