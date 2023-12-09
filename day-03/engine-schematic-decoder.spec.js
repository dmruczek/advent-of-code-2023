describe('EngineSchematicDecoder', function () {

    const EngineSchematicDecoder = require('./engine-schematic-decoder');

    describe('isPart', function () {
        it('should correctly identify a part', function () {
            const engineSchematicDecoder = new EngineSchematicDecoder();
            let stringArray = engineSchematicDecoder.loadInput('test-input.txt');
            expect(engineSchematicDecoder.isPart(0, 0, 2, stringArray)).toBe(true);

        });
    });

    describe('findPartNumbers', function () {
        it('should find all of the part numbers in the schematic.', function () {
            const engineSchematicDecoder = new EngineSchematicDecoder();
            let stringArray = engineSchematicDecoder.loadInput('test-input.txt');
            expect(engineSchematicDecoder.findPartNumbers(stringArray)).toEqual([467, 35, 633, 617, 592, 755, 664, 598]);

            stringArray.push('#777...888')
            expect(engineSchematicDecoder.findPartNumbers(stringArray)).toEqual([467, 35, 633, 617, 592, 755, 664, 598, 777]);

            stringArray = engineSchematicDecoder.loadInput('test-input.txt');
            stringArray.push('#777..@888')
            expect(engineSchematicDecoder.findPartNumbers(stringArray)).toEqual([467, 35, 633, 617, 592, 755, 664, 598, 777, 888]);

        });
    });

    describe('calculateSumOfAllPartNumbers', function () {
        it('should calculate the sum of all part numbers in the schematic.', function () {
            const engineSchematicDecoder = new EngineSchematicDecoder();
            let stringArray = engineSchematicDecoder.loadInput('test-input.txt');
            expect(engineSchematicDecoder.calculateSumOfAllPartNumbers(stringArray)).toEqual(4361);
        });
    });
   

    describe('findAllGears', function () {
        it('should find all of the "gears" in the schematic', function () {
            const engineSchematicDecoder = new EngineSchematicDecoder();
            let stringArray = engineSchematicDecoder.loadInput('test-input.txt');
            expect(engineSchematicDecoder.findAllGears(stringArray)).toEqual([{ row: 1, index: 3, ratio: 16345}, { row: 8, index: 5, ratio: 451490}]);
        });
    });
    
    describe('expandAndExtractNumbers', function () {
        it('should expand the search area of a string until all numbers are fully uncovered, then return those numbers', function () {
            const engineSchematicDecoder = new EngineSchematicDecoder();
            expect(engineSchematicDecoder.expandAndExtractNumbers('.467..114..', 3, 5)).toEqual([467]);
            expect(engineSchematicDecoder.expandAndExtractNumbers('.467.114...', 3, 5)).toEqual([467,114]);
            expect(engineSchematicDecoder.expandAndExtractNumbers('.467.......', 2, 4)).toEqual([467]);
        });
    });
    
    describe('calculateSumOfAllGearRatios', function () {
        it('should find all of the gears in the schematic and add up their ratios', function () {
            const engineSchematicDecoder = new EngineSchematicDecoder();
            let stringArray = engineSchematicDecoder.loadInput('test-input.txt');
            expect(engineSchematicDecoder.calculateSumOfAllGearRatios(stringArray)).toBe(467835);
        });
    })
    
});