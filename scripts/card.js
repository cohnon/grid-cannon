/**
 * An object to store a card's information
 * 
 * value : the number on the card. 1 = ace, 11 = jack, 12 = queen, 13 = king
 * 
 * suite : the suite the card is in. 0 = hearts, 1 = diamonds, 2 = clubs, 3 = spades
 */
class Card {
    /**
     * 
     * @param {number} value The value of the card
     * @param {number} suite The suite of the card
     */
    constructor(value, suite) {
        this.value = value
        this.suite = suite
        this.isDead = false // if a royale is dead
    }
}