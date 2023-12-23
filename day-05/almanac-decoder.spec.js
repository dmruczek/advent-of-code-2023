
describe('AlmanacDecoder', function () {

    const AlmanacDecoder = require('./almanac-decoder');

    describe('parseAlmanacData', function () {
        it('should parse the almanac data from the input.', function () {
            const almanacDecoder = new AlmanacDecoder();
            let stringArray = almanacDecoder.loadInput('test-input.txt');

            const expectedLatMapData = {
                "from": "humidity",
                "to": "location",
                "ranges": [
                    {
                        "destinationStart": 60,
                        "sourceStart": 56,
                        "rangeLength": 37
                    },
                    {
                        "destinationStart": 56,
                        "sourceStart": 93,
                        "rangeLength": 4
                    }
                ]
            };

            const almanacData = almanacDecoder.parseAlmanacData(stringArray);

            expect(almanacData.seeds).toEqual([79, 14, 55, 13]);
            expect(almanacData.maps.length).toBe(7);
            expect(almanacData.maps[6]).toEqual(expectedLatMapData);
        });
    });

    describe('getMapsForSourceObject', function () {
        it('should find the appropriate range maps for the given source object', function () {
            const almanacDecoder = new AlmanacDecoder();
            let stringArray = almanacDecoder.loadInput('test-input.txt');
            const almanacData = almanacDecoder.parseAlmanacData(stringArray);
            const maps = almanacDecoder.getMapsForSourceObject(almanacData, 'humidity');


            expect(maps.from).toEqual('humidity');
            expect(maps.to).toEqual('location');
            expect(maps.ranges.length).toBe(2);
        });

        it('should throw an error if the map is not found', function () {
            const almanacDecoder = new AlmanacDecoder();
            let stringArray = almanacDecoder.loadInput('test-input.txt');
            const almanacData = almanacDecoder.parseAlmanacData(stringArray);
            try {
                almanacDecoder.getMapsForSourceObject(almanacData, 'elephant');
                fail('should have thrown an error');
            } catch (e) {
                expect(e).toEqual('no map found for elephant');
            }
        });
    });

    describe('findDestinationNumberUsingGivenRanges', function () {
        it('should use the given range maps to find the destination number for the given source number', function () {

            const seedToSoilMapRanges = [
                    {
                        "destinationStart": 50,
                        "sourceStart": 98,
                        "rangeLength": 2
                    },
                    {
                        "destinationStart": 52,
                        "sourceStart": 50,
                        "rangeLength": 48
                    }
                ];
            const almanacDecoder = new AlmanacDecoder();

            expect(almanacDecoder.findDestinationNumberUsingGivenRanges(79, seedToSoilMapRanges)).toBe(81);
            expect(almanacDecoder.findDestinationNumberUsingGivenRanges(14, seedToSoilMapRanges)).toBe(14);
            expect(almanacDecoder.findDestinationNumberUsingGivenRanges(55, seedToSoilMapRanges)).toBe(57);
            expect(almanacDecoder.findDestinationNumberUsingGivenRanges(13, seedToSoilMapRanges)).toBe(13);
        });
    });

    describe('findLocationForGivenSeed', function () {
        it('should traverse through all of the mapping data in the almanac to get a location for a given seed number.', function () {
            const almanacDecoder = new AlmanacDecoder();
            let stringArray = almanacDecoder.loadInput('test-input.txt');
            const almanacData = almanacDecoder.parseAlmanacData(stringArray);

            expect(almanacDecoder.findLocationForGivenSeed(almanacData, 79)).toBe(82);
            expect(almanacDecoder.findLocationForGivenSeed(almanacData, 14)).toBe(43);
            expect(almanacDecoder.findLocationForGivenSeed(almanacData, 55)).toBe(86);
            expect(almanacDecoder.findLocationForGivenSeed(almanacData, 13)).toBe(35);
        });
    });

    describe('findLowestLocationForAllSeeds', function () {
        it('should use the almanac data to find the location of all seeds, and then return the lowest location.', function () {
            const almanacDecoder = new AlmanacDecoder();
            let stringArray = almanacDecoder.loadInput('test-input.txt');
            const almanacData = almanacDecoder.parseAlmanacData(stringArray);

            expect(almanacDecoder.findLowestLocationForAllSeeds(almanacData)).toBe(35);
        });
    });
    
});