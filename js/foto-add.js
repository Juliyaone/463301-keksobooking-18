'use strict';
(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');

  var fileChooserFotoHouse = document.querySelector('.ad-form__upload input[type=file]');
  var previewFotoHouseDefolt = document.querySelector('.ad-form__photo');

  var node = document.createElement('img');
  node.src = 'img/muffin-grey.svg';
  node.alt = 'Фото жилья';
  node.width = '40';
  node.height = '45';
  node.style.display = 'flex';
  node.style.margin = '10px auto';

  previewFotoHouseDefolt.appendChild(node);

  var previewFotoHouse = document.querySelector('.ad-form__photo img');

  var uploadsPhoto = function (fileChooser, preview) {
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
  };

  uploadsPhoto(fileChooserFotoHouse, previewFotoHouse);
  uploadsPhoto(fileChooserAvatar, previewAvatar);
})();
