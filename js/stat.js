'use strict';
// Функция поиска максимального значения
function getMaxElement(arr) {
  return Math.max.apply(null, arr);
}
// Функция генерации рандомной насыщенности цвета
var makeRandomColor = function () {
  return ('hsl(240, ' + (Math.random() * 100) + '%, 50%)');
};

window.renderStatistics = function (ctx, players, times) {
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var COLUMN_WIDTH = 40;

  // Функция для рендера облака (координаты, цвет)
  var renderCloud = function (x, y, color) {
    var CLOUD_WIDTH = 420;
    var CLOUD_HEIGHT = 270;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var renderCloudWithShadow = function () {
    var GAP = 10; // Отступ от края облака
    var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)'; // Цвет тени
    var CLOUD_COLOR = '#ffffff'; // Цвет облака
    // Передали координаты для облака с тенью + цвет, так же для просто облака
    renderCloud(CLOUD_X + GAP, CLOUD_Y + GAP, SHADOW_COLOR);
    renderCloud(CLOUD_X, CLOUD_Y, CLOUD_COLOR);
  };
  // Функция отрисовки текста
  var renderText = function (strings, color, x, y) {
    var FONT_PROPERTIES = ['16px', 'PT Mono']; // Массив параметров текста
    var FONT_HEIGHT = 15;
    var BASIC_FONT_COLOR = '#000';
    var TITLE_X = CLOUD_X + 50;
    var TITLE_Y = 40;
    x = x || TITLE_X; // С оператором сравнения "или"
    y = y || TITLE_Y;

    ctx.font = FONT_PROPERTIES.join(' '); // Объединение в строку элементов массива
    ctx.fillStyle = color || BASIC_FONT_COLOR;
    strings.forEach(function (string, i) {
      ctx.fillText(string, x, y + (FONT_HEIGHT * i));
    });
  };
  // Отрисовка текста приветствия
  var renderTopText = function () {
    var TOP_TEXT = ['Ура вы победили!', 'Список победителей']; // Соответственно, после пересчета количества элементов массива отрисовка нарисует 2 строки вертикально с отступом FONT_HEIGHT
    renderText(TOP_TEXT);
  };

  var renderColumn = function (left, bottom, columnHeight, color) {
    ctx.fillStyle = color;
    ctx.fillRect(left, bottom - columnHeight, COLUMN_WIDTH, columnHeight);
  };

  var renderHist = function (columnHeight, left, name, time) {
    var BAR_Y = 255; // CLOUD_HEIGHT - GAP - FONT_HEIGHT
    var userTimeY = BAR_Y - columnHeight - 10; // Чтобы координата была вверху - отрицательное число = высоте отрисованного бара + отступ между текстом и баром
    var userNameY = BAR_Y + 15; // Высота бара + высота текста
    var MY_COLOR = 'rgba(255, 0, 0, 1)'; // Красный цвет бара игрока
    var color = name === 'Вы' ? MY_COLOR : makeRandomColor(); // Если имя = "Вы", то цвет - красный, иначе - вызываем функцию генерации случайной насыщенности синего цвета
    time = Math.round(time);
    renderText([name], color, left, userNameY);
    renderText([time], color, left, userTimeY);
    renderColumn(left, BAR_Y, columnHeight, color);
  };

  var renderHistogram = function () {
    var COLUMN_HEIGHT = 150;
    var CLOUD_MARGIN = 55;
    var barX = CLOUD_X + CLOUD_MARGIN; // Стартовая позиция
    var BAR_GAP = 50;
    var barStep = COLUMN_WIDTH + BAR_GAP; // Шаг бара
    var maxTime = getMaxElement(times);
    players.forEach(function (name, i) {
      var time = times[i];
      var columnHeight = times[i] / maxTime * COLUMN_HEIGHT; // Расчитанная высота бара
      var currentColumnX = barX + i * barStep; // Текущая гор.координата бара
      renderHist(columnHeight, currentColumnX, name, time);
    });
  };

  var init = function () {
    renderCloudWithShadow();
    renderTopText();
    renderHistogram();
  };

  init();
};
