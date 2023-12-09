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

    calculateSumOfAllPartNumbers(stringArray) {
        const partNumbers = this.findPartNumbers(stringArray);
        let total = 0;
        for (let num of partNumbers) {
            total = total + num;
        }
        return total;
    }

    findAllGears(stringArray) {
        const gearRegex = /(\*)/g;
        const gearArray = [];
        for (let row = 0; row < stringArray.length; row++) {
            let str = stringArray[row], result;
            while (result = gearRegex.exec(str)) {
                const gearInfo = this.determineGearConfiguration(row, result.index, stringArray);
                if (gearInfo) {
                    gearArray.push(gearInfo)
                }
            }
        }
        return gearArray;
    }

    calculateSumOfAllGearRatios(stringArray) {
        const gears = this.findAllGears(stringArray);
        let total = 0;
        for (let gear of gears) {
            total += gear.ratio;
        }
        return total;
    }


    expandAndExtractNumbers(fullStr, startIndex, endIndex) {
        // console.log(fullStr.substring(startIndex, endIndex+1));
        while (startIndex > 0 && this.isNumeric(fullStr.charAt(startIndex))) {
            startIndex--;
        }
        // console.log(fullStr.substring(startIndex, endIndex+1));
        while (endIndex < fullStr.length-1 && this.isNumeric(fullStr.charAt(endIndex))) {
            endIndex++;
        }
        // console.log(fullStr.substring(startIndex, endIndex+1));
        const searchStr = fullStr.substring(startIndex, endIndex+1);
        let numbers = [];
        let result;
        const numberRegex = /(\d+)/g;

        while (result = numberRegex.exec(searchStr)) {
            numbers.push(parseInt(result[0]));
        }

        return numbers;
    }


    determineGearConfiguration(row, index, stringArray) {
        let borderingNumbers = [];

        if (index > 0) {
            borderingNumbers.push(...this.expandAndExtractNumbers(stringArray[row], index-1, index-1));
        }
        if (index < stringArray[0].length-1) {
            borderingNumbers.push(...this.expandAndExtractNumbers(stringArray[row], index+1, index+1));
        }
        if (row > 0) {
            borderingNumbers.push(...this.expandAndExtractNumbers(stringArray[row-1], index-1, index+1));
        }
        if (row < stringArray.length-1) {
            borderingNumbers.push(...this.expandAndExtractNumbers(stringArray[row+1], index-1, index+1));
        }
        if (borderingNumbers.length == 2) {
            return {
                row: row,
                index: index,
                ratio: borderingNumbers[0] * borderingNumbers[1]
            };
        } else {
            return undefined;
        }
    }


}

