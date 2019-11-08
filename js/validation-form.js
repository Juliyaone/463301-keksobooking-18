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

  var adFormRooms = document.querySelector('#room_number'); // комнат
  var adFormGuest = document.querySelector('#capacity'); // гостей


  var timeSync = function (select1, select2) {
      select2.value = select1.value;
  };

  adFormRooms.addEventListener('change', function () {
    timeSync(adFormRooms, adFormGuest);
  });

  adFormGuest.addEventListener('change', function () {
    timeSync(adFormGuest, adFormRooms);
  });





})();
