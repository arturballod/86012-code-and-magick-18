'use strict';
// Показ окна настройки персонажа
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var charList = document.querySelector('.setup-similar');
charList.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomItem = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

var wizNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон']; // Массив имен волшебников
var wizSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']; // Массив фамилий волшебников
var wizCoats = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)']; // Массив цветов мантий
var wizEyes = ['black', 'red', 'blue', 'yellow', 'green']; // Массив цветов глаз
var MAX_WIZARDS = 4;

var wizardFinal = function () {
  var wizardProperties = [];

  for (var i = 0; i < MAX_WIZARDS; i++) {
    wizardProperties.push({
      name: getRandomItem(wizNames) + ' ' + getRandomItem(wizSurnames),
      coatColor: getRandomItem(wizCoats),
      eyesColor: getRandomItem(wizEyes)
    });
  }

  return wizardProperties;
};

var wizards = wizardFinal(wizNames, wizSurnames, wizCoats, wizEyes);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');
