module.exports = class ScratchcardCalculator {

    
    loadInput(filename) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');
    
        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        const stringArray = data.split(os.EOL);
        return stringArray;
    }

    parseCardData(stringArray) {
        const regex = /^Card\s*(\d+): ((?:\s*\d+\s*)*) \| ((?:\s*\d+\s*)*)$/;

        let cards = []
        for (let str of stringArray) {
            let result = regex.exec(str)
            cards.push({
                num: Number(result[1]),
                winningNumbers: result[2].trim().split(/\s+/).map(Number),
                playedNumbers: result[3].trim().split(/\s+/).map(Number)
            })
        }
        return cards;
    }

    calculateScoreForCard(card) {
        let matches = 0;
        for (let num of card.playedNumbers) {
            if (card.winningNumbers.includes(num)) {
                matches ++;
            }
        }
        if (matches == 0) {
            return 0;
        } else {
            return Math.pow(2, matches-1);
        }
    }

    calculateTotalScoreForAllCards(stringArray) {
        const cards = this.parseCardData(stringArray);
        let total = 0;
        for (let card of cards) {
            total += this.calculateScoreForCard(card);
        }
        return total;
    }


}

