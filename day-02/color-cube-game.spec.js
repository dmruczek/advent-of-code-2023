describe('ColorCubeGame', function () {

    const ColorCubeGame = require('./color-cube-game');

    describe('parseRow', function () {
        it('should correctly extract the game state from the string in that row.', function () {
            const colorCubeGame = new ColorCubeGame();
            expect(colorCubeGame.parseRow('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')).toEqual({ gameNumber: 1, outcomes: [ { blue: 3, red: 4 }, { red: 1, green: 2, blue: 6 }, { green: 2 } ] });
        });
    });

    describe('determineViability', function () {
        it('should correctly determine the viability of a particular outcome based on the number of cubes we believe to be in the pouch', function () {
            const colorCubeGame = new ColorCubeGame();
            const cubeGuess = {'red': 12, 'green': 13, 'blue': 14};

            expect(colorCubeGame.determineViability(cubeGuess, colorCubeGame.parseRow('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green').outcomes)).toBe(true);
            expect(colorCubeGame.determineViability(cubeGuess, colorCubeGame.parseRow('Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue').outcomes)).toBe(true);
            expect(colorCubeGame.determineViability(cubeGuess, colorCubeGame.parseRow('Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red').outcomes)).toBe(false);
            expect(colorCubeGame.determineViability(cubeGuess, colorCubeGame.parseRow('Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red').outcomes)).toBe(false);
            expect(colorCubeGame.determineViability(cubeGuess, colorCubeGame.parseRow('Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green').outcomes)).toBe(true);
        });
    });

    describe('calculateViabilitySum', function () {
        it('Should calculate the sum of all games that were possible if our cube guess was correct.', function () {
            const colorCubeGame = new ColorCubeGame();
            const cubeGuess = {'red': 12, 'green': 13, 'blue': 14};

            expect(colorCubeGame.calculateViabilitySum(cubeGuess, 'test-input.txt')).toBe(8);
        });
    });

    describe('calculateMinimumCubes', function () {
        it('Should calculate the minimum number of cubes in each game to make the game valid.', function () {
            const colorCubeGame = new ColorCubeGame();
            expect(colorCubeGame.calculateMinimumCubes(colorCubeGame.parseRow('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green').outcomes)).toEqual({'red': 4, 'green': 2, 'blue': 6})
        });
    });

    describe('calculateGamePower', function () {
        it('Should calculate the "game power" by finding the minimum number of cubes of each color in each game to make the game valid and multiplying those numbers together.', function () {
            const colorCubeGame = new ColorCubeGame();
            expect(colorCubeGame.calculateGamePower(colorCubeGame.parseRow('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green').outcomes)).toEqual(48)
        });
    });

    describe('calculateTotalGamePower', function () {
        it('Should calculate the "game power" of all games and add them together', function () {
            const colorCubeGame = new ColorCubeGame();
            expect(colorCubeGame.calculateTotalGamePower('test-input.txt')).toBe(2286);
        });
    });

    
    
});