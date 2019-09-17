'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
// Отступ между текстом и границами
var GAP = 10;
// Ширина колонки
var BAR_WIDTH = 40;
// Расстояние между колонками
var BAR_GAP = 50;
// Горизонтальный отступ гистограммы от границы облака
var MARGIN = 55;
// высота текста
var FONT_HEIGHT = 15;
// Отступ от текста
var FONT_GAP = 10;
// Цвет бара и текста гл.игрока
var MY_COLOR = 'rgba(250, 0, 0, 1)';
// Позиция текста вертикальная
var textY = CLOUD_HEIGHT - GAP;
// "Шаг" бара гистограммы по горизонтали
var barStep = BAR_WIDTH + BAR_GAP;
// Позиция бара гистограммы по горизонтали
var barX = CLOUD_X + MARGIN;
// Позиция бара вертикальная
var barY = CLOUD_HEIGHT - GAP - FONT_HEIGHT - FONT_GAP / 2;
// Расчет максимальной высоты гистограммы
var barHeight = CLOUD_HEIGHT - GAP * 2 - (FONT_GAP + FONT_HEIGHT) * 4;
// Позиция поздравления горизонтальная
var titleX = CLOUD_X + (GAP * 3);
// Позиция поздравления вертикальная
var titleY = CLOUD_Y + (GAP * 3);
// Текст заголовка при победе
var titleText = 'Ура вы победили!';
// Текст подзаголовка при победе
var subTitleText = 'Список победителей:';


// Функция для рендера облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Функция поиска максимального значения
function getMaxElement(arr) {
  return Math.max.apply(null, arr);
}
// Функция генерации рандомной насыщенности цвета
var makeRandomColor = function () {
  return ('hsl(240, ' + (Math.random() * 100) + '%, 50%)');
};

// Функция отрисовки текста поздравления
var renderTitle = function (ctx, x, y, color, font) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(titleText, x, y);
};
// Функция отрисовки текста вывода списка победителей
var renderSubtitle = function (ctx, x, y, color, font) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(subTitleText, x, y);
};
var renderHist = function (ctx, players, times) {
  var maxTime = getMaxElement(times);

  players.forEach(function (name, i) {
    var barColor = name === 'Вы' ? MY_COLOR : makeRandomColor();
    var barFinalHeight = ((barHeight * times[i]) / maxTime) * -1;
    var barPos = barX + (barStep * i);
    var counterY = CLOUD_HEIGHT - (barFinalHeight + GAP + FONT_HEIGHT + FONT_GAP);

    ctx.fillStyle = barColor;
    ctx.fillRect(barPos, barY, BAR_WIDTH, barFinalHeight);
    ctx.fillText(players[i], barPos, textY);
    ctx.fillText(Math.floor(times[i]), barPos, counterY);
  });
};

window.renderStatistics = function (ctx, players, times) {
  // Отрисовка облака
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');
  // Отрисовка текста приветствия
  renderTitle(ctx, titleX, titleY, '#000', '16px PT Mono');
  renderSubtitle(ctx, titleX, titleY + FONT_HEIGHT, '#000', '16px PT Mono');

  renderHist(ctx, players, times);
};
