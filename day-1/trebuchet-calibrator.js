module.exports = class TrebuchetCalibrator {

    
    loadInput(filename) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');
    
        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        const stringArray = data.split(os.EOL);
        return stringArray;
    }

    processCalibrationLine(str) {
        const numbers = this.extractNumbers(str);
        return parseInt((this.getFirstNumber(numbers) + this.getLastNumber(numbers)), 10);
    }

    extractNumbers(str) {
        const match = str.match(/\d/g);
        if (match) {

        } else {
            throw 'there were no numbers in the string provided';
        }
        return match;
    }

    getFirstNumber(numbers) {

    }

    getLastNumber(numbers) {

    }
}

