'use strict';
(function () {

  var PIN_QUANTITY = 5; // количество пинов на карте
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var similarPinTemplate = document.querySelector('#pin');
  var similarList = document.querySelector('.map__pins');

  var checksIfArrayIsEmpty = function (arr, elem) {
    if (arr.length === 0) {
      elem.remove();
    }
  };

  var createsPin = function (pin) {
    var cloneElement = similarPinTemplate.content.cloneNode(true);
    var cloneElementStyle = cloneElement.querySelector('.map__pin');
    cloneElementStyle.style.left = (pin.location.x - PIN_WIDTH / 2) + 'px';
    cloneElementStyle.style.top = (pin.location.y - PIN_HEIGHT) + 'px';
    cloneElementStyle.querySelector('img').src = pin.author.avatar;
    cloneElementStyle.querySelector('img').alt = pin.offer.title;
    cloneElementStyle.type = pin.offer.type;
    var pinOffer = pin.offer; // находим массив с offer
    checksIfArrayIsEmpty(pinOffer, cloneElementStyle); // если массив с offer пустой, то весь пин
    return cloneElement;
  };

  var renderPin = function (data) {
    var takeNumber = data.length > PIN_QUANTITY ? PIN_QUANTITY : data.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(createsPin(data[i]));
    }
    similarList.appendChild(fragment);
    return similarList;
  };

  window.render = {
    pin: renderPin
  };
})();
