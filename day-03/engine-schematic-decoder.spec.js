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
    
});