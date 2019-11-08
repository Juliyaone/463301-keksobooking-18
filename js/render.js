'use strict';
(function () {

  var PIN_QUANTITY = 5; // количество пинов на карте
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var similarPinTemplate = document.querySelector('#pin');


  var renderPin = function (pin) {
    var cloneElement = similarPinTemplate.content.cloneNode(true);
    var cloneElementStyle = cloneElement.querySelector('.map__pin');
    cloneElementStyle.style.left = (pin.location.x - PIN_WIDTH / 2) + 'px';
    cloneElementStyle.style.top = (pin.location.y - PIN_HEIGHT) + 'px';
    cloneElementStyle.querySelector('img').src = pin.author.avatar;
    cloneElementStyle.querySelector('img').alt = pin.offer.title;
    cloneElementStyle.type = pin.offer.type;
    return cloneElement;
  };

  var similarList = document.querySelector('.map__pins');

  window.render = function (data) {

    var takeNumber = data.length > PIN_QUANTITY ? PIN_QUANTITY : data.length;

    for (var i = 0; i < takeNumber; i++) {
      similarList.appendChild(renderPin(data[i]));
    }
  };

})();
