const EngineSchematicDecoder = require('./engine-schematic-decoder');
const engineSchematicDecoder = new EngineSchematicDecoder();
const stringArray = engineSchematicDecoder.loadInput('input.txt');
console.log(engineSchematicDecoder.calculateSumOfAllPartNumbers(stringArray));

// 550435 is too low