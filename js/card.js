'use strict';
(function () {
  var map = document.querySelector('.map');
  var referenceElement = document.querySelector('.map__filters-container');
  var pinOfHousing;
  var HousingType = {
    FLATE: 'Квартира',
    PALACE: 'Дворец',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };
  var QUANTITY_PIN = 5;
  var similarCardTemplate = document.querySelector('#card');

  var cardEscPressHandler = function (evt) {
    window.util.isEscEvent(evt, closeCard);
  };

  var cardCloseHandler = function () {
    closeCard();
    document.removeEventListener('keydown', cardEscPressHandler);
  };

  var getFeatures = function (elem, arr, it) { // Проверяем есть ли в массиве нужный елемент features
    if (arr.includes(it) !== true) {
      elem.remove(); // Если нет то удаляем li с соответствующим классом из карточки
    }
  };


  var getTypeHouse = function (type, element) {
    if (type === 'flat') {
      element.textContent = HousingType.FLATE;
    }
    if (type === 'palace') {
      element.textContent = HousingType.PALACE;
    }
    if (type === 'house') {
      element.textContent = HousingType.HOUSE;
    }
    if (type === 'bungalo') {
      element.textContent = HousingType.BUNGALO;
    }
  };

  var checksIfArrayIsEmpty = function (arr, elem) {
    if (arr.length === 0) {
      elem.remove();
    }
  };

  var creatCard = function (card) { // Создает карточку
    var cardClone = similarCardTemplate.content.cloneNode(true);
    var cloneElementStyle = cardClone.querySelector('.map__card');

    cloneElementStyle.querySelector('.popup__title').textContent = card.offer.title;
    cloneElementStyle.querySelector('.popup__text--address').textContent = card.offer.address;
    cloneElementStyle.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';

    var type = card.offer.type;
    var typecloneElement = cloneElementStyle.querySelector('.popup__type');
    getTypeHouse(type, typecloneElement);

    cloneElementStyle.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + 'комнаты для' + ' ' + card.offer.guests + ' ' + 'гостей';

    cloneElementStyle.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', ' + 'выезд до ' + card.offer.checkout;

    var features = card.offer.features; // находим массив с features

    var popupFeatureWifi = cloneElementStyle.querySelector('.popup__feature--wifi'); // находим эелементы с нужным классом
    var popupFeatureDishwasher = cloneElementStyle.querySelector('.popup__feature--dishwasher');
    var popupFeatureParking = cloneElementStyle.querySelector('.popup__feature--parking');
    var popupFeatureWasher = cloneElementStyle.querySelector('.popup__feature--washer');
    var popupFeatureElevator = cloneElementStyle.querySelector('.popup__feature--elevator');
    var popupFeatureConditioner = cloneElementStyle.querySelector('.popup__feature--conditioner');
    var popupFeature = cloneElementStyle.querySelector('.popup__features');

    getFeatures(popupFeatureWifi, features, 'wifi');
    getFeatures(popupFeatureDishwasher, features, 'dishwasher');
    getFeatures(popupFeatureParking, features, 'parking');
    getFeatures(popupFeatureElevator, features, 'elevator');
    getFeatures(popupFeatureConditioner, features, 'conditioner');
    getFeatures(popupFeatureWasher, features, 'washer');
    checksIfArrayIsEmpty(features, popupFeature);

    cloneElementStyle.querySelector('.popup__description').textContent = card.offer.description;

    var popupPhotos = cloneElementStyle.querySelector('.popup__photos');
    var popupPhotosImg = popupPhotos.querySelector('img');
    var arrPhotos = card.offer.photos;
    if (arrPhotos.length === 0) { // Если массив картинок пустой, то скрываем блок с картинками в карточке
      popupPhotosImg.classList.add('hidden');
    } else {
      popupPhotos.querySelector('img').src = arrPhotos[0];
      for (var i = 1; i < arrPhotos.length; i++) {
        var img = document.createElement('img');
        img.src = arrPhotos[i];
        img.width = 45;
        img.height = 40;
        img.alt = 'Фотография жилья';
        img.classList.add('popup__photo');
        popupPhotos.appendChild(img);
      }
    }
    var popupAvatar = cloneElementStyle.querySelector('.popup__avatar'); // аватарка
    popupAvatar.src = card.author.avatar;

    var popupClose = cloneElementStyle.querySelector('.popup__close'); // Обработчик закрытия карточки
    popupClose.addEventListener('click', cardCloseHandler); // Обработчик закрытия карточки
    document.addEventListener('keydown', cardEscPressHandler);
    return cloneElementStyle;
  };

  var renderCard = function (data) {
    var takeNumber = data.length > QUANTITY_PIN ? QUANTITY_PIN : data.length;
    var fragmentCard = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      fragmentCard.appendChild(creatCard(data[i]));
    }
    var childrenFragmentCard = fragmentCard;
    map.insertBefore(childrenFragmentCard, referenceElement);
  };

  var updateCards = function () { // Отрисовывает карточку
    var sameCard = window.loadingPins.allPins.filter(function (it) {
      return it.offer.title === pinOfHousing;
    });
    renderCard(sameCard);
  };

  var removeClassActivePins = function () { // Удаляет активный класс у пинов
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPins.forEach(function (pin) {
      pin.classList.remove('map__pin--active');
    });
  };

  var closeCard = function () {
    var mapCard = document.querySelector('.map__card'); // Проверяем есть ли открытая карточка если есть, то удаляем ее
    if (mapCard) {
      mapCard.remove();
    }
    removeClassActivePins();
  };

  var opensCardByClickingOnPin = function () { // Перебирает пины присваивает им активный класс и по клику открывает карточку
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    mapPins.forEach(function (pin) {
      pin.addEventListener('click', function () {
        closeCard();
        pin.classList.add('map__pin--active');
        var altPinValue = pin.querySelector('img').alt;
        pinOfHousing = altPinValue;
        updateCards();
      });
    });
  };

  window.card = {
    opensCardByClickingOnPin: opensCardByClickingOnPin,
    closeCard: closeCard
  };

})();
