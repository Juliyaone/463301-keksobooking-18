'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    findRandomElement: function (arr) { // Функция нахождения рандомного элемента в массиве
      var randomElement = arr[Math.floor(Math.random() * arr.length)];
      return randomElement;
    }
  };
})();
