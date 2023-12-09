const EngineSchematicDecoder = require('./engine-schematic-decoder');
const engineSchematicDecoder = new EngineSchematicDecoder();
const stringArray = engineSchematicDecoder.loadInput('input.txt');
console.log(engineSchematicDecoder.calculateSumOfAllGearRatios(stringArray));
