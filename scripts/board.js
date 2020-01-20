/**
 * A representation of the game board
 * 
 * gridTiles : The 3x3 tiles where numbered cards can be placed
 * royaleTiles : The outer tiles where face cards can be placed
 */
class Board {
    gridTiles = []
    royaleTiles = []

    /**
     * Places a number card at a position
     * @param {Card} card 
     * @param {number} position 
     */
    placeRoyale(card, position) {
        this.royaleTiles[position] = card
    }

    /**
     * Places a number card at a position and fires a shot if possible
     * @param {Card} card 
     * @param {number} position 
     */
    placeNumber(card, position) {
        this.gridTiles[position] = card
    }

    /**
     * Gets a list of available tiles a card of a certain value can be placed on
     * @param {Card} value the value of the card
     */
    getAvailableTiles(card) {
        if (value >= 11) {
            this.availableFaceCards(card)
        } else {
            this.availableNumberCards(card.value)
        }
    }

    // loops through gridTiles and compares value
    availableNumberCards(value) {
        let numberPositions = []
        for (let i = 0; i < this.gridTiles.length; i++) {
            if (this.gridTiles[i] == null || this.gridTiles[i].value <= value) {
                numberPositions.push(i)
            }
        }
        return numberPositions
    }
    
    /**
     * Finds the lowest card in gridTiles with the same suite and gets its neighbors
     * @param {Card} card The royale card to check against
     * 
     * @returns {Card}
     */
    availableRoyaleCards(royaleCard) {
        let highestCardSameSuite = null
        let highestCardSameColor = null
        let highestCard          = 0

        // loop through the numbered tiles and get the highest
        // card, suite, and color 
        for (let i = 1; i < this.gridTiles.length; i++) {
            if (i == 4 || this.gridTiles[i] == null) {
                continue
            }

            const numberCard = this.gridTiles[i]
            // highest card
            if (numberCard.value > this.gridTiles[highestCard].value) {
                highestCard = i
            }
            // highest suite
            if (numberCard.suite == royaleCard.suite) {
                    if (!highestCardSameSuite ||
                        numberCard.value > this.gridTiles[highestCardSameSuite].value) {
                        highestCardSameSuite = i
                    }
            }
            // highest color
            if (
                (
                    (numberCard.suite == 0 || numberCard.suite == 1) &&
                    (royaleCard.suite == 0 || royaleCard.suite == 1)
                ) ||
                (
                    (numberCard.suite == 2 || numberCard.suite == 3) &&
                    (royaleCard.suite == 2 || royaleCard.suite == 3)
                )
            ) {
                if (!highestCardSameColor ||
                    numberCard.value > this.gridTiles[highestCardSameColor].value) {
                        highestCardSameColor = i
                    }
            }
        }

        // get the closest matching numbered tile
        let bestMatchIndex = null
        if (highestCard) {
            bestMatchIndex = highestCard
        }
        
        if (highestCardSameColor) {
            bestMatchIndex = highestCardSameColor
        }

        if (highestCardSameSuite) {
            bestMatchIndex = highestCardSameSuite
        }

        // get the adjacent royale tiles from the closest matching numbered tile
        let royalePositions = []
        switch (bestMatchIndex) {
            case 0:
                royalePositions = [0, 3]
                break;
            case 1:
                royalePositions = [1]
                break;
            case 2:
                royalePositions = [2, 4]
                break;
            case 3:
                royalePositions = [5]
                break;
            case 5:
                royalePositions = [6]
                break;
            case 6:
                royalePositions = [7, 9]
                break;
            case 7:
                royalePositions = [10]
                break;
            case 8:
                royalePositions = [8, 11]
                break;
            default:
                break;
        }

        return royalePositions
    }

    /**
     * Sets up cards on the board in an O formation to start the game
     * and stores any royales picked up to be placed later
     * 
     * @param {Card[]} cards A list of 8 cards to start the game
     */
    initBoard(cards) {
        for (let i = 0; i < 9; i++) {
            if (i < 4) {
                this.gridTiles[i] = cards[i]
            }
            else if (i == 4) {
                // leave the center tile empty
                this.gridTiles[i] = null
                continue
            } else {
                // arrays dont align since we skipped the center so
                // subtract one from cards
                this.gridTiles[i] = cards[i - 1]
            }

        }
        // all royale tiles are empty at the start
        for (let i = 0; i < 12; i++) {
            this.royaleTiles[i] = null
        }
    }
}