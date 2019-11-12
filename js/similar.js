'use strict';
(function () {

  var pinOfHousing;
  var allPins = [];

  var mapFilters = document.querySelector('.map__filters');
  var mapFeatures = mapFilters.querySelectorAll('#housing-features input');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');

  var priceMap = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
    MINPRICE: 10000,
    MAXPRICE: 50000
  };

  var getHousingType = function (el) {
    return housingType.value === 'any' ? true : el.offer.type === housingType.value;
  };

  var getHousingRooms = function (el) {
    return housingRooms.value === 'any' ? true : el.offer.rooms === Number(housingRooms.value);
  };

  var getHousingGuests = function (el) {
    return housingGuests.value === 'any' ? true : el.offer.guests === Number(housingGuests.value);
  };

  var getHousingPrice = function (el) {
    switch (housingPrice.value) {
      case priceMap.LOW: return el.offer.price <= priceMap.MINPRICE;
      case priceMap.MIDDLE: return el.offer.price >= priceMap.MINPRICE && el.offer.price <= priceMap.MAXPRICE;
      case priceMap.HIGH: return el.offer.price >= priceMap.MAXPRICE;
      default: return true;
    }
  };


  var getFeaturesList = function (el) {
    return Array.from(mapFeatures).filter(function (element) {
      return element.checked;
    }).map(function (element) {
      return element.value;
    }).every(function (currentFeature) {
      return el.offer.features.includes(currentFeature);
    });
  };

  var filters = function (data) {
    return data.filter(function (el) {
      return getHousingType(el) &&
             getHousingPrice(el) &&
             getHousingRooms(el) &&
             getHousingGuests(el) &&
             getFeaturesList(el);
    }).slice(0, 5);
  };

  var filteredPins = function () {
    mapFilters.addEventListener('change', function () {
      removeElements();
      closeCard();
      window.render.render(filters(allPins));
      openCard(allPins);
      updateCards(allPins);
    });
  };

  var removeElements = function () {
    var elements = document.querySelectorAll('.map__pin:not(.map__pin--main');
    elements.forEach(function (it) {
      it.remove();
    });
  };

  var closeCard = function () {
    var mapCard = document.querySelector('.map__card'); // Проверяем есть ли открытая карточка если есть, то удаляем ее
    if (mapCard) {
      mapCard.remove();
    }
  };

  // Открываем карточку, клик по пину без потери окружения
  var addClickListener = function (mapPinButton) {
    mapPinButton.addEventListener('click', function () {
      deactivatesPin();
      mapPinButton.classList.add('map__pin--active');
      var altPinValue = mapPinButton.querySelector('img').alt;
      pinOfHousing = altPinValue;
      closeCard();
      updateCards();
    });
  };

  var openCard = function () {
    var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPin.length; i++) { // Открываем карточку по клику на пин, без потери окружения
      var mapPinButton = mapPin[i];
      addClickListener(mapPinButton); // карточка отрисовалась
    }
  };

  var deactivatesPin = function () { // Деактивирует пин при клике на другой пин
    var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < mapPin.length; i++) {
      var mapPinButton = mapPin[i];
      if (mapPinButton.classList.contains('map__pin--active')) {
        mapPinButton.classList.remove('map__pin--active');
      }
    }
  };

  var updateCards = function () { // Отрисовывает карточку
    var sameCard = allPins.filter(function (it) {
      return it.offer.title === pinOfHousing;
    });
    window.card.renderCard(sameCard);
  };

  var successHandler = function (data) {
    allPins = data;
    filteredPins(allPins);
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
