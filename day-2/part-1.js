const ColorCubeGame = require('./color-cube-game');
const colorCubeGame = new ColorCubeGame();
console.log(colorCubeGame.calculateViabilitySum({'red': 12, 'green': 13, 'blue': 14}, 'input.txt'));