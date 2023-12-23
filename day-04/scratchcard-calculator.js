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

        let cards = [];
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

    processCard(card) {
        let matches = 0;
        for (let num of card.playedNumbers) {
            if (card.winningNumbers.includes(num)) {
                matches ++;
            }
        }
        card.matches = matches;
        if (matches == 0) {
            card.score = 0;
        } else {
            card.score = Math.pow(2, card.matches-1);
        }
        return card;
    }

    calculateScoreForCard(card) {
        card = this.processCard(card);
        return card.score;
    }

    calculateTotalScoreForAllCards(stringArray) {
        const cards = this.parseCardData(stringArray);
        let total = 0;
        for (let card of cards) {
            total += this.calculateScoreForCard(card);
        }
        return total;
    }

    processAllCardsWithCopies(stringArray) {
        let cardCopies = Array(stringArray.length+1).fill(0);
        let totalCards = 0;
        const cards = this.parseCardData(stringArray);

        for (let card of cards) {
            card = this.processCard(card);
            for (let i = 1; i <= card.matches; i++) {
                cardCopies[card.num + i] += (1 + cardCopies[card.num])
            }
            totalCards+= (1 + cardCopies[card.num]);
        }
        return totalCards;
    }

}

