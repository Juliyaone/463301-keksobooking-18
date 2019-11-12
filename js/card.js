'use strict';
(function () {
  var map = document.querySelector('.map');
  var referenceElement = document.querySelector('.map__filters-container');

  var similarCardTemplate = document.querySelector('#card');

  var cardCloseHandler = function () {
    var popup = map.querySelector('.popup');
    popup.remove();

    var mapPin = document.querySelectorAll('.map__pin');

    for (var i = 0; i < mapPin.length; i++) { // Удаляем CSS-класс активации пина
      var mapPinButton = mapPin[i];
      mapPinButton.classList.remove('map__pin--active');
    }
  };

  var getFeatures = function (elem, arr, it) { // Проверяем есть ли в массиве нужный елемент features
    if (arr.includes(it) !== true) {
      elem.remove(); // Если нет то удаляем li с соответствующим классом из карточки
    }
  };

  var HousingType = {
    FLATE: 'Квартира',
    PALACE: 'Дворец',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
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
    getFeatures(popupFeatureWifi, features, 'wifi');
    getFeatures(popupFeatureDishwasher, features, 'dishwasher');
    getFeatures(popupFeatureParking, features, 'parking');
    getFeatures(popupFeatureElevator, features, 'elevator');
    getFeatures(popupFeatureConditioner, features, 'conditioner');
    getFeatures(popupFeatureWasher, features, 'washer');

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

    return cloneElementStyle;
  };

  var renderCard = function (data) {
    var takeNumber = data.length > 5 ? 5 : data.length;
    var fragmentCard = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      fragmentCard.appendChild(creatCard(data[i]));
    }
    var childrenFragmentCard = fragmentCard;
    map.insertBefore(childrenFragmentCard, referenceElement);
  };

  window.card = {
    renderCard: renderCard
  };

})();
