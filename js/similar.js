'use strict';
(function () {

  var typeOfHousing;
  var pinOfHousing;
  var minPriceOfHousing;
  var maxPriceOfHousing;
  var middlePriceOfHousing;
  var any;
  var allPins = [];
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  var closeCard = function () {
    var mapCard = document.querySelector('.map__card'); // Проверяем есть ли открытая карточка если есть, то удаляем ее
    if (mapCard) {
      mapCard.remove();
    }
  };

  var Price = { ///////////////////////////////////////////////////////////
    LOW: 10000,
    HEIGHT: 50000
  }

  var deactivatesPin = function () { // Деактивирует пин при клике на другой пин
    var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < mapPin.length; i++) {
      var mapPinButton = mapPin[i];
      if (mapPinButton.classList.contains('map__pin--active')) {
        mapPinButton.classList.remove('map__pin--active');
      }
    }
  };

  var addClickListener = function (mapPinButton) { // Открываем карточку, клик по пину без потери окружения
    mapPinButton.addEventListener('click', function (evt) {
      deactivatesPin();
      mapPinButton.classList.add('map__pin--active');
      var altPinValue = mapPinButton.querySelector('img').alt;
      pinOfHousing = altPinValue;
      closeCard();
      updateCards(); // Отрисовываем новую карточку
    });
  };


  var updatePins = function () {
    var sameTypePin = allPins.filter(function (it) {
      return it.offer.type === typeOfHousing;
    });
    window.render(sameTypePin);

    var samePriceMinPin = allPins.filter(function (it) {
    return it.offer.price === minPriceOfHousing;
    });
    window.render(samePriceMinPin);

    var samePriceMaxPin = allPins.filter(function (it) {
    return it.offer.price === maxPriceOfHousing;
    });
    window.render(samePriceMaxPin);

    var samePriceMiddlePin = allPins.filter(function (it) {
    return it.offer.price === middlePriceOfHousing;
    });
    window.render(samePriceMiddlePin);

    var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < mapPin.length; i++) { // Открываем карточку по клику на пин, без потери окружения
      var mapPinButton = mapPin[i];
      addClickListener(mapPinButton); // карточка отрисовалась
     }
  };

  var updateCards = function () {
    var sameCard = allPins.filter(function (it) {
      return it.offer.title === pinOfHousing;
    });
    window.renderCard(sameCard);
  };

  var typeFilter = document.querySelector('#housing-type');

  typeFilter.addEventListener('change', function () {
    closeCard();
    var mapPins = Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main)'));
    var mapPinsParent = document.querySelector('.map__pins');
    mapPins.forEach(function (it) {  // Удаляет пины после отправки
      mapPinsParent.removeChild(it);
    });
    var typeFilterIndex = document.querySelector('#housing-type').options.selectedIndex;
    var valueTypeFilter = document.querySelector('#housing-type').options[typeFilterIndex].value;
    typeFilter.value = valueTypeFilter;
    typeOfHousing = valueTypeFilter;
    updatePins();
  });


  var priceFilter = document.querySelector('#housing-price');

  priceFilter.addEventListener('change', function () {
    closeCard();
    var mapPins = Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main)'));
    var mapPinsParent = document.querySelector('.map__pins');
    mapPins.forEach(function (it) {  // Удаляет пины после отправки
      mapPinsParent.removeChild(it);
    });
    var priceFilterIndex = document.querySelector('#housing-price').options.selectedIndex;
    var valuePriceFilter = document.querySelector('#housing-price').options[priceFilterIndex].value;
    console.log(valuePriceFilter);
    priceFilter.value = valuePriceFilter;

    if(valuePriceFilter === 'low') {
      minPriceOfHousing = valuePriceFilter;
    }
    if(valuePriceFilter = 'high') {
      maxPriceOfHousing = valuePriceFilter;
    }
    if(valuePriceFilter = 'middle') {
      middlePriceOfHousing = valuePriceFilter;
    } else {
      any = valuePriceFilter;
    }
    updatePins();
  });

  // Сброс полей формы и фильтра с помощью Reset

  var reset = document.querySelector('.ad-form__reset');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');

  var resetPageHandler = function () {
    housingType.value = "any";
    housingPrice.value = "any";
    housingRooms.value = "any";
    housingGuests.value = "any";
    window.deactivatesPage();
  };

  reset.addEventListener('click', resetPageHandler);

  var successHandler = function (data) {
    allPins = data;
    updatePins();
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

  window.backend.load(successHandler, errorHandler);

})();
