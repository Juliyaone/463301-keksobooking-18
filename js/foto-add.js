'use strict';
(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form__field input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview img');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
  var fileChooser1 = document.querySelector('.ad-form__upload input[type=file]');
  var preview1 = document.querySelector('.ad-form__photo');

    var node = document.createElement('img');
    node.src = '';
    node.alt = 'Фото жилья';
    node.width = '40';
    node.height = '44';

    node.appendChild(preview1);

  fileChooser1.addEventListener('change', function () {
    var file = fileChooser1.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader1 = new FileReader();

      reader1.addEventListener('load', function () {
        preview1 = reader.result;
      });

      reader1.readAsDataURL(file);
    }
  });
  var node = document.createElement('div');
})();
