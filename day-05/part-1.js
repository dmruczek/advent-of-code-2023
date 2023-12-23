const AlmanacDecoder = require('./almanac-decoder');
const almanacDecoder = new AlmanacDecoder();
const stringArray = almanacDecoder.loadInput('input.txt');
const almanacData = almanacDecoder.parseAlmanacData(stringArray);

console.log(almanacDecoder.findLowestLocationForAllSeeds(almanacData));
