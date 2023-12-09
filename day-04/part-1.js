const ScratchcardCalculator = require('./scratchcard-calculator')
const scratchcardCalculator = new ScratchcardCalculator();
const stringArray = scratchcardCalculator.loadInput('input.txt');
console.log(scratchcardCalculator.calculateTotalScoreForAllCards(stringArray))

//20434 too high