
describe('ScratchcardCalculator', function () {

    const ScratchcardCalculator = require('./scratchcard-calculator');

    describe('parseCardData', function () {
        it('should parse the card data from the input.', function () {
            const scratchcardCalculator = new ScratchcardCalculator();
            let stringArray = scratchcardCalculator.loadInput('test-input.txt');

            const expected = [
                { num: 1, winningNumbers: [ 41, 48, 83, 86, 17 ], playedNumbers: [ 83, 86, 6, 31, 17, 9, 48, 53 ] },
                { num: 2, winningNumbers: [ 13, 32, 20, 16, 61 ], playedNumbers: [ 61, 30, 68, 82, 17, 32, 24, 19 ] },
                { num: 3, winningNumbers: [ 1, 21, 53, 59, 44 ], playedNumbers: [ 69, 82, 63, 72, 16, 21, 14, 1 ] },
                { num: 4, winningNumbers: [ 41, 92, 73, 84, 69 ], playedNumbers: [ 59, 84, 76, 51, 58, 5, 54, 83 ] },
                { num: 5, winningNumbers: [ 87, 83, 26, 28, 32 ], playedNumbers: [ 88, 30, 70, 12, 93, 22, 82, 36 ] },
                { num: 6, winningNumbers: [ 31, 18, 13, 56, 72 ], playedNumbers: [ 74, 77, 10, 23, 35, 67, 36, 11 ] }
            ];

            expect(scratchcardCalculator.parseCardData(stringArray)).toEqual(expected);

        });
    });

    describe('calculateScoreForCard', function () {
        it('should calculate the score of a given card.', function () {
            const scratchcardCalculator = new ScratchcardCalculator();
            
            expect(scratchcardCalculator.calculateScoreForCard({ num: 1, winningNumbers: [ 41, 48, 83, 86, 17 ], playedNumbers: [ 83, 86, 6, 31, 17, 9, 48, 53 ] })).toBe(8);
            expect(scratchcardCalculator.calculateScoreForCard({ num: 2, winningNumbers: [ 13, 32, 20, 16, 61 ], playedNumbers: [ 61, 30, 68, 82, 17, 32, 24, 19 ] })).toBe(2);
            expect(scratchcardCalculator.calculateScoreForCard({ num: 3, winningNumbers: [ 1, 21, 53, 59, 44 ], playedNumbers: [ 69, 82, 63, 72, 16, 21, 14, 1 ] })).toBe(2);
            expect(scratchcardCalculator.calculateScoreForCard({ num: 4, winningNumbers: [ 41, 92, 73, 84, 69 ], playedNumbers: [ 59, 84, 76, 51, 58, 5, 54, 83 ] })).toBe(1);
            expect(scratchcardCalculator.calculateScoreForCard({ num: 5, winningNumbers: [ 87, 83, 26, 28, 32 ], playedNumbers: [ 88, 30, 70, 12, 93, 22, 82, 36 ] })).toBe(0);
        });
    });

    describe('calculateTotalScoreForAllCards', function () {
        it('should calculate the score for all cards and add them together.', function () {
            const scratchcardCalculator = new ScratchcardCalculator();
            let stringArray = scratchcardCalculator.loadInput('test-input.txt');
            expect(scratchcardCalculator.calculateTotalScoreForAllCards(stringArray)).toBe(13);
        });
    });

    describe('processAllCardsWithCopies', function () {
        it('should find matches for all cards, including duplicate cards won from previous cards and return the total number of cards at the end.', function () {
            const scratchcardCalculator = new ScratchcardCalculator();
            let stringArray = scratchcardCalculator.loadInput('test-input.txt');
            expect(scratchcardCalculator.processAllCardsWithCopies(stringArray)).toBe(30);
        });
    });
    
});