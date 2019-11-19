'use strict';
(function () {
  var QUANTITY_PIN = 5;

  var PriceMap = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
    MINPRICE: 10000,
    MAXPRICE: 50000
  };

  var mapFilters = document.querySelector('.map__filters');
  var mapFeatures = mapFilters.querySelectorAll('#housing-features input');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');


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
      case PriceMap.LOW: return el.offer.price <= PriceMap.MINPRICE;
      case PriceMap.MIDDLE: return el.offer.price >= PriceMap.MINPRICE && el.offer.price <= PriceMap.MAXPRICE;
      case PriceMap.HIGH: return el.offer.price >= PriceMap.MAXPRICE;
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

  var filtersPin = function (data) {
    return data.filter(function (el) {
      window.card.close();
      return getHousingType(el) &&
             getHousingPrice(el) &&
             getHousingRooms(el) &&
             getHousingGuests(el) &&
             getFeaturesList(el);
    }).slice(0, QUANTITY_PIN);
  };

  window.filter = {
    pin: filtersPin
  };
})();
