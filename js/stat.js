'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
// Ширина колонки
var BAR_WIDTH = 40;
// Расстояние между колонками
var BAR_GAP = 50;
// Отступ между текстом и границами
var GAP = 10;
// Margin
var MARGIN = 55;
// высота текста
var TEXT_HEIGHT = 15;
// отступ текста
var FONT_GAP = 10;
// Позиция текста вертикальная
var textY = CLOUD_HEIGHT - GAP;
// Позиция бара вертикальная
var barY = CLOUD_HEIGHT - GAP - TEXT_HEIGHT - FONT_GAP / 2;
// Расчет максимальной высоты гистограммы
var barHeight = CLOUD_HEIGHT - GAP * 2 - (FONT_GAP + TEXT_HEIGHT) * 4;

// Функция для рендера облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
// Сортировка
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + (GAP * 2), CLOUD_Y + (GAP * 2) + FONT_GAP);
  ctx.fillText('Список победителей:', CLOUD_X + (GAP * 2), CLOUD_Y + (GAP * 2) + TEXT_HEIGHT + FONT_GAP);

  var maxTime = getMaxElement(times);
  var myNameIndex = players.indexOf('Вы');

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + MARGIN + (BAR_WIDTH + BAR_GAP) * i, textY);
    ctx.fillStyle = 'hsl(210, ' + Math.floor(Math.random() * 101) + '%, 50%)';
    ctx.fillRect(CLOUD_X + MARGIN + (BAR_WIDTH + BAR_GAP) * i, barY, BAR_WIDTH, -((barHeight * times[i]) / maxTime));
    var counterY = CLOUD_HEIGHT - ((barHeight * times[i]) / maxTime + GAP + TEXT_HEIGHT + FONT_GAP);
    ctx.fillText(Math.floor(times[i]), CLOUD_X + MARGIN + (BAR_WIDTH + BAR_GAP) * i, counterY);
  }
};
