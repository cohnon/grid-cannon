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
        let highestCard          = null

        let royalePositions = [0]

        // loop through the royale tiles and get the highest
        // neighboring card, suite, and color 
        for (let i = 0; i < this.royaleTiles.length; i++) {
            if (this.royaleTiles[i] != null) continue

            const numberIndex = this.checkRoyaleNeighbor(i)
            const numberCard = this.gridTiles[numberIndex]

            // highest card
            if (highestCardSameColor == null && highestCardSameSuite == null) {
                if (
                    highestCard == null ||
                    numberCard.value > this.gridTiles[highestCard].value
                ) {
                    royalePositions = [i]
                    highestCard = numberIndex
                } else if (
                    numberCard.value == this.gridTiles[highestCard].value &&
                    numberCard.suite == this.gridTiles[highestCard].suite
                ) {
                    royalePositions.push(i)
                }
            }

            // highest color
            if (highestCardSameSuite == null) {
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
                    if (highestCardSameColor == null ||
                        numberCard.value > this.gridTiles[highestCardSameColor].value
                    ) {
                        highestCardSameColor = numberIndex
                        royalePositions = [i]
                    } else if (
                        numberCard.value == this.gridTiles[highestCardSameColor].value &&
                        numberCard.suite == this.gridTiles[highestCardSameColor].suite
                    ) {
                        royalePositions.push(i)
                    }
                }
            }

            // highest suite
            if (numberCard.suite == royaleCard.suite) {
                if (
                    highestCardSameSuite == null ||
                    numberCard.value > this.gridTiles[highestCardSameSuite].value
                ) {
                    highestCardSameSuite = numberIndex
                    royalePositions = [i]

                } else if (
                    numberCard.value == this.gridTiles[highestCardSameSuite].value
                ) {
                    royalePositions.push(i)
                }
            }
        }

        return royalePositions
    }

    /**
     * Returns the index of a royale's neighboring number tile
     * @param {number} position The royale position
     */
    checkRoyaleNeighbor(position) {
        switch(position) {
            case 0  : return 0
            case 1  : return 1
            case 2  : return 2
            case 3  : return 0
            case 4  : return 2
            case 5  : return 3
            case 6  : return 5
            case 7  : return 6
            case 8  : return 8
            case 9  : return 6
            case 10 : return 7
            case 11 : return 8
        }
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