'use strict';
(function () {
  // Валидация полей формы

  // 1. Валидация заголовка объявления

  var headerAd = document.getElementById('title');

  headerAd.addEventListener('invalid', function () {
    if (headerAd.validity.tooShort) {
      headerAd.setCustomValidity('Имя должно состоять минимум из 30-х символов');
    } else if (headerAd.validity.tooLong) {
      headerAd.setCustomValidity('Имя не должно превышать 100 символов');
    } else if (headerAd.validity.valueMissing) {
      headerAd.setCustomValidity('Обязательное поле');
    } else {
      headerAd.setCustomValidity('');
    }
  });


  headerAd.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 30) {
      target.setCustomValidity('Имя должно состоять минимум из 30-ти символов');
    } else {
      target.setCustomValidity('');
    }
  });


  // 3.Валидация поля цена

  var priceNight = document.getElementById('price');

  priceNight.addEventListener('invalid', function () {
    if (priceNight.validity.patternMismatch) {
      priceNight.setCustomValidity('Введите число');
    } else if (priceNight.validity.rangeOverflow) {
      priceNight.setCustomValidity('Максимальная цена 1000000');
    } else if (priceNight.validity.valueMissing) {
      priceNight.setCustomValidity('Обязательное поле');
    } else {
      priceNight.setCustomValidity('');
    }
  });

  // Меняем минимальную цену за ночь в зависимости от типа жилья

  var typeValue = document.getElementById('type');

  var typePriceMap = {
    'any': 0,
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var changePrice = function () {
    priceNight.min = typePriceMap[typeValue.value];
    priceNight.placeholder = typePriceMap[typeValue.value];
  };

  typeValue.addEventListener('click', changePrice);

  // Синхронизируем изменение времени

  var adFormTimeIn = document.querySelector('#timein'); // Заезд
  var adFormTimeOut = document.querySelector('#timeout'); // Выезд

  var timeSync = function (select1, select2) {
    select2.value = select1.value;
  };

  adFormTimeIn.addEventListener('change', function () {
    timeSync(adFormTimeIn, adFormTimeOut);
  });

  adFormTimeOut.addEventListener('change', function () {
    timeSync(adFormTimeOut, adFormTimeIn);
  });

  // Синхронизируем изменение комнат и гостей

  var adForm = document.querySelector('.ad-form');
  var rooms = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');

  var capacityCheck = function () {
    if (rooms.value === '1' && capacity.value !== '1') {
      capacity.setCustomValidity('Только для 1 гостя');
    } else if (rooms.value === '2' && capacity.value !== '1' && capacity.value !== '2') {
      capacity.setCustomValidity('Только для 1 - 2 гостя');
    } else if (rooms.value === '3' && capacity.value !== '1' && capacity.value !== '2' && capacity.value !== '3') {
      capacity.setCustomValidity('Для гостей');
    } else if (rooms.value === '100' && capacity.value !== '0') {
      capacity.setCustomValidity('Не для гостей');
    } else {
      capacity.setCustomValidity('');
    }
  };

  capacity.addEventListener('input', capacityCheck);
  rooms.addEventListener('input', capacityCheck);

  // Заблокировать поле адрес для ручного редактирования

  document.getElementById('address').setAttribute('readonly', 'readonly');


  // Сброс полей формы и фильтра с помощью Reset

  var reset = document.querySelector('.ad-form__reset');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');

  var resetPageHandler = function () {
    housingType.value = 'any';
    housingPrice.value = 'any';
    housingRooms.value = 'any';
    housingGuests.value = 'any';
    window.deactivatesPage();
  };

  reset.addEventListener('click', resetPageHandler);

})();
