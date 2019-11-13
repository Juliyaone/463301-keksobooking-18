'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    debounce: function (callback) {
      var lastTimeout = null;
      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          clearTimeout(lastTimeout);
        }
        lastTimeout = setTimeout(function () {
          callback.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
})();
