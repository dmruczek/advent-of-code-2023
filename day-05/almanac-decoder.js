module.exports = class AlmanacDecoder {

    
    loadInput(filename) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');
    
        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        const stringArray = data.split(os.EOL);
        return stringArray;
    }

    parseAlmanacData(stringArray) {

        let almanacData = {
            seeds: [],
            maps: []
        };

        const seedsRegex = /^seeds: ((?:\d+\s*)*)$/;

        let result = seedsRegex.exec(stringArray[0]);
        let seedStrArray = result[1].split(' ');
        for (let str of seedStrArray) {
            almanacData.seeds.push(parseInt(str, 10));
        }

        let almanacIndex = 1;

        const mapHeaderRegex = /^([^-]*)-to-([^-]*) map:$/;
        const rangeRegex = /^(\d+) (\d+) (\d+)$/;

        while (almanacIndex < stringArray.length) {
            if (stringArray[almanacIndex] == '') {
                // new map
                almanacIndex++;
                result = mapHeaderRegex.exec(stringArray[almanacIndex]);
                almanacData.maps.push({
                    from: result[1],
                    to: result[2],
                    ranges: []
                });
            } else {
                result = rangeRegex.exec(stringArray[almanacIndex]);
                almanacData.maps[almanacData.maps.length-1].ranges.push({
                    destinationStart: parseInt(result[1], 10),
                    sourceStart: parseInt(result[2], 10),
                    rangeLength: parseInt(result[3], 10)
                });
            }

            almanacIndex++;
        }

        return almanacData;
    }

    getMapsForSourceObject(almanacData, sourceObjectName) {
        for (let i = 0; i < almanacData.maps.length; i++) {
            if (almanacData.maps[i].from == sourceObjectName) {
                return almanacData.maps[i];
            }
        }
        throw 'no map found for ' + sourceObjectName;
    }

    findDestinationNumberUsingGivenRanges(sourceNumber, ranges) {

        for (let i = 0; i < ranges.length; i++) {
            const thisRange = ranges[i];
            if (sourceNumber >= thisRange.sourceStart && sourceNumber < thisRange.sourceStart + thisRange.rangeLength) {
                return thisRange.destinationStart + (sourceNumber - thisRange.sourceStart);

            }
        }
        // if no range applies, return the same number
        return sourceNumber;
    }

    findLocationForGivenSeed(almanacData, seedNumber) {
        let sourceObjectName = 'seed';
        let currentNumber = seedNumber;

        while( sourceObjectName != 'location') {
            let mapObj = this.getMapsForSourceObject(almanacData, sourceObjectName);
            currentNumber = this.findDestinationNumberUsingGivenRanges(currentNumber, mapObj.ranges);
            sourceObjectName = mapObj.to;
        }

        return currentNumber;
    }

    findLowestLocationForAllSeeds(almanacData) {
        let lowestLocation;

        for (let i = 0; i < almanacData.seeds.length; i++) {
            let thisLocation = this.findLocationForGivenSeed(almanacData, almanacData.seeds[i]);
            if (lowestLocation === undefined || thisLocation < lowestLocation) {
                lowestLocation = thisLocation;
            }
        }
        return lowestLocation;
    }


};