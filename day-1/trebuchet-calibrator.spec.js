describe('TrebuchetCalibrator', function () {

    const TrebuchetCalibrator = require('./trebuchet-calibrator');

    describe('extractNumbers', function () {
        it('should extract all of the numbers from the given string', function () {
            const trebuchetCalibrator = new TrebuchetCalibrator();
            expect(trebuchetCalibrator.extractNumbers('1abc2')).toEqual([ '1', '2' ]);
            expect(trebuchetCalibrator.extractNumbers('pqr3stu8vwx')).toEqual([ '3', '8' ]);
            expect(trebuchetCalibrator.extractNumbers('a1b2c3d4e5f')).toEqual([ '1', '2', '3', '4', '5' ]);
            expect(trebuchetCalibrator.extractNumbers('treb7uchet')).toEqual([ '7' ]);
        });
    });

});