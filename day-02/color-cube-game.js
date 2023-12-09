module.exports = class ColorCubeGame {

    
    loadInput(filename) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');
    
        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        const stringArray = data.split(os.EOL);
        return stringArray;
    }

    parseData(stringArray) {
        let allGameData = [];
        for (let str of stringArray) {
            allGameData.push(this.parseRow(str));
        }
        return allGameData;
    }

    parseRow(str) {
        const matches = str.match(/^Game (\d+): (.*)$/);

        const gameNumber = parseInt(matches[1]);
        const outcomes = matches[2];
        const split = outcomes.split(';');

        let obj = {
            gameNumber: gameNumber,
            outcomes: []
        }

        const outcomeRegex = /(\d+) (\w+)/g;

        for (let outcome of split) {
            let result;
            let outcomeObj = {};
            while (result = outcomeRegex.exec(outcome)) {
                outcomeObj[result[2]] = parseInt(result[1], 10);
            }
            obj.outcomes.push(outcomeObj);

        }
        return obj;
    }

    determineViability(cubeGuess, outcomes) {
        for (let outcome of outcomes) {
            for (const color in cubeGuess) {
                if (outcome[color] && outcome[color] > cubeGuess[color]) {
                    return false;
                }
            }
        }
        return true;
    }

    calculateMinimumCubes(outcomes) {

        let minimumCubes = {
            'red': 0,
            'green': 0,
            'blue': 0
        }

        let colors = ['red', 'blue', 'green']

        for (let outcome of outcomes) {
            for (let color of colors) {
                if (outcome[color] && outcome[color] > minimumCubes[color]) {
                    minimumCubes[color] = outcome[color];
                }
            }
        }

        return minimumCubes;
    }

    calculateGamePower(outcomes) {
        let minimumCubes = this.calculateMinimumCubes(outcomes);
        return minimumCubes.red * minimumCubes.green * minimumCubes.blue;
    }

    calculateViabilitySum(cubeGuess, filename) {
        const stringArray = this.loadInput(filename);
        let allGameData = this.parseData(stringArray);

        let total = 0;
        for (let gameData of allGameData) {
            if (this.determineViability(cubeGuess, gameData.outcomes)) {
                total += gameData.gameNumber;
            }
        }
        return total;
    }

    calculateTotalGamePower(filename) {
        const stringArray = this.loadInput(filename);
        let allGameData = this.parseData(stringArray);

        let total = 0;
        for (let gameData of allGameData) {
            total += this.calculateGamePower(gameData.outcomes);
        }
        return total;
    }

}

