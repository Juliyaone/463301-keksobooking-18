'use strict';
(function () {
  window.loadingPins = {
    allPins: []
  };

  var successHandler = function (data) {
    window.loadingPins.allPins = data;
    window.render.render(window.loadingPins.allPins);
    window.card.closeCard();
    window.card.openCard();
    window.card.updateCards();
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

  window.loadingPins = {
    successHandler: successHandler,
    errorHandler: errorHandler
  };

})();
