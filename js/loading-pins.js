'use strict';
(function () {
  window.loadingPins = {
    allPins: []
  };

  var successLoadHandler = function (data) {
    window.loadingPins.allPins = data;
    window.render.render(window.loadingPins.allPins);
    window.card.opensCardByClickingOnPin();
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
    successLoadHandler: successLoadHandler,
    errorLoadHandler: errorLoadHandler
  };

})();
