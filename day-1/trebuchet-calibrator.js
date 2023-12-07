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
        return str.match(/\d/g);
    }

    getFirstNumber(numbers) {
        return numbers[0];
    }

    getLastNumber(numbers) {
        return numbers[numbers.length-1];
    }

    calibrate(filename) {
        const stringArray = this.loadInput(filename);
        let total = 0;
        for (let str of stringArray) {
            total += this.processCalibrationLine(str);
        }
        return total;
    }
}

