'use strict';
(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var successLoadHandler = function (data) {
    window.loadingPins.allPins = data;
    window.render.pin(window.loadingPins.allPins);
    window.activePage.activatesFilter();
    window.card.open();
  };

  var createErrorPopup = function (errorMessage) {
    var div = document.createElement('div');
    div.className = 'error__load';
    div.style.zIndex = '100';
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

    div.appendChild(string);

    document.body.insertAdjacentElement('afterbegin', div);

    var text = document.createTextNode(errorMessage);
    string.appendChild(text);
  };

  var errorLoadHandler = function (errorMessage) {
    window.inactivePage.deactivatesFilters();
    mapFiltersContainer.classList.add('hidden');
    createErrorPopup(errorMessage);
  };

  var nodNetworkHandler = function (errorMessage) {
    window.inactivePage.deactivatesFilters();
    mapFiltersContainer.classList.add('hidden');
    createErrorPopup(errorMessage);
  };


  window.loadingPins = {
    success: successLoadHandler,
    error: errorLoadHandler,
    nodNetwork: nodNetworkHandler,
    allPins: []
  };

})();
