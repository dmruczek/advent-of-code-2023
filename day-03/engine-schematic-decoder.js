module.exports = class EngineSchematicDecoder {

    
    loadInput(filename) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');
    
        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        const stringArray = data.split(os.EOL);
        return stringArray;
    }

    isNumeric(value) {
        return /^\d+$/.test(value);
    }

    hasSymbol(value) {
        return /[%*#$&@=\-/+]/.test(value);
    }

    checkRowForSymbol(row, start, end, stringArray) {
        let testStart = start-1;
        let testEnd = end+1;
        let test = stringArray[row].substring(testStart, testEnd+1);
        // console.log(`checking if "${test}" has a symbol`)
        return this.hasSymbol(test)
    }

    isPart(row, start, end, stringArray) {
        if (start-1 >= 0 && this.hasSymbol(stringArray[row].charAt(start-1))) {
            return true;
        }
        if (end+1 < stringArray[0].length-1 && this.hasSymbol(stringArray[row].charAt(end+1))) {
            return true;
        }
        if (row > 0 && this.checkRowForSymbol(row-1, start, end, stringArray)) {
            return true;
        }
        if (row < stringArray.length-1 && this.checkRowForSymbol(row+1, start, end, stringArray)) {
            return true;
        }
        return false;
    }

    findPartNumbers(stringArray) {
        let partNumbers = [];
        for (let row = 0; row < stringArray.length; row++) {
            let str = stringArray[row];
            let processingNumber = false
            let numStart = 0;
            let numEnd = 0;
            for (let i = 0; i < str.length; i++) {
                
                if (this.isNumeric(str.charAt(i))) {
                    if (processingNumber) {
                        numEnd = i;
                    } else {
                        numStart = i;
                        numEnd = i;
                        processingNumber = true;
                    }
                } else if (processingNumber) {
                    processingNumber = false;
                    let numStr = str.substring(numStart, numEnd+1);
                    if (this.isPart(row, numStart, numEnd, stringArray)) {
                        partNumbers.push(parseInt(numStr, 10));
                    }
                }
            }

            if (processingNumber) {
                processingNumber = false;
                let numStr = str.substring(numStart, numEnd+1);
                if (this.isPart(row, numStart, numEnd, stringArray)) {
                    partNumbers.push(parseInt(numStr, 10));
                }
            }

        }
        return partNumbers;
    }

    printNumberWithSurroundings(row, numStart, numEnd, stringArray) {
        if (row > 0) {
            console.log(stringArray[row - 1].substring(numStart - 1, numEnd + 2));
        }
        console.log(stringArray[row].substring(numStart - 1, numEnd + 2));
        if (row < stringArray.length - 1) {
            console.log(stringArray[row + 1].substring(numStart - 1, numEnd + 2));
        }
        console.log('\n');
    }    

    calculateSumOfAllPartNumbers(stringArray) {
        const partNumbers = this.findPartNumbers(stringArray);
        let total = 0;
        for (let num of partNumbers) {
            total = total + num;
        }
        return total;
    }

}

