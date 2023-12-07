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

    describe('processCalibrationLine', function () {
        it('should extract the first and last numbers in the line and turn them into a number', function () {
            const trebuchetCalibrator = new TrebuchetCalibrator();
            expect(trebuchetCalibrator.processCalibrationLine('1abc2')).toEqual(12);
            expect(trebuchetCalibrator.processCalibrationLine('pqr3stu8vwx')).toEqual(38);
            expect(trebuchetCalibrator.processCalibrationLine('a1b2c3d4e5f')).toEqual(15);
            expect(trebuchetCalibrator.processCalibrationLine('treb7uchet')).toEqual(77);
        });
    });

    describe('calibrate', function () {
        it('should process all lines and add them together to get the total calibration number', function () {
            const trebuchetCalibrator = new TrebuchetCalibrator();
            expect(trebuchetCalibrator.calibrate('test-input.txt')).toEqual(142);
        });
    });

    
    
});