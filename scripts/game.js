/**
 * The controller for all things related to the game
 * 
 * gameMode : The current game mode the player is in
 * 0 = normal
 * 1 = The player is holding a card
 * 2 = There is nowhere to place a card
 */
class Game {
    cardInHand = null
    cardsInStack = []
    gameMode = 0
    board = new Board()
    view = new View()

    constructor() {
        // initialize onClick events
        $(document).on("click", "#cardStack", () => this.pickUpCardFromStack())

        // when the user clicks a position
        // not optimized but can't think of another way atm
        $(document).on("click", "#tile1",    e => this.placeCard(e, 0 ))
        $(document).on("click", "#tile2",    e => this.placeCard(e, 1 ))
        $(document).on("click", "#tile3",    e => this.placeCard(e, 2 ))
        $(document).on("click", "#tile4",    e => this.placeCard(e, 3 ))
        $(document).on("click", "#tile5",    e => this.placeCard(e, 4 ))
        $(document).on("click", "#tile6",    e => this.placeCard(e, 5 ))
        $(document).on("click", "#tile7",    e => this.placeCard(e, 6 ))
        $(document).on("click", "#tile8",    e => this.placeCard(e, 7 ))
        $(document).on("click", "#tile9",    e => this.placeCard(e, 8 ))
        $(document).on("click", "#royale1",  e => this.placeCard(e, 9 ))
        $(document).on("click", "#royale2",  e => this.placeCard(e, 10))
        $(document).on("click", "#royale3",  e => this.placeCard(e, 11))
        $(document).on("click", "#royale4",  e => this.placeCard(e, 12))
        $(document).on("click", "#royale5",  e => this.placeCard(e, 13))
        $(document).on("click", "#royale6",  e => this.placeCard(e, 14))
        $(document).on("click", "#royale7",  e => this.placeCard(e, 15))
        $(document).on("click", "#royale8",  e => this.placeCard(e, 16))
        $(document).on("click", "#royale9",  e => this.placeCard(e, 17))
        $(document).on("click", "#royale10", e => this.placeCard(e, 18))
        $(document).on("click", "#royale11", e => this.placeCard(e, 19))
        $(document).on("click", "#royale12", e => this.placeCard(e, 20))
    }

    /**
     * Sets up a new game and removes any other game data
     */
    newGame() {
        this.gameMode = 0
        this.createNewStack()

        // get 8 cards from the stack
        // while ignoring face cards
        let numberCardsNeeded = 8
        let currentIndex = 0
        let initCards = []
        while (numberCardsNeeded > 0) {
            let currentCard = this.cardsInStack[currentIndex]
            if (currentCard.value <= 10) {
                initCards.push(currentCard)
                this.cardsInStack.splice(currentIndex, 1)
                numberCardsNeeded--
            } else {
                currentIndex++
            }
        }

        this.board.initBoard(initCards)

        // view
        this.view.newGame()
        this.view.initEmptyTiles()
        this.view.gameModeUpdate(this.gameMode)
        for (let i = 0; i < this.board.gridTiles.length; i++) {
            this.view.placeNumberCard(this.board.gridTiles[i], i)
        }
    }

    /**
     * deletes all game data
     */
    endGame() {
        this.view.removeCardAsCursor()
    }

    /**
     * Creates an array of 52 shuffled cards
     */
    createNewStack() {
        // removes any cards that may still be in the stack
        this.cardsInStack = []

        // create the 52 cards
        for (let suite = 0; suite < 4; suite++) {
            for (let value = 0; value < 13; value++) {
                this.cardsInStack.push(new Card(value + 1, suite))
            }
        }

        // shuffle the cards using a fish algorithm
        // goes over each card and switches with another random card
        for (let i = this.cardsInStack.length - 1; i > 2; i--) {
            let randomIndex = Math.floor(Math.random() * i)
            let tempCard = this.cardsInStack[randomIndex]
            this.cardsInStack[randomIndex] = this.cardsInStack[i]
            this.cardsInStack[i] = tempCard
        }
    }

    /**
     * When the player clicks the stack
     */
    pickUpCardFromStack() {
        // player can only pick up a card in game mode 0
        if (this.gameMode != 0) return

        // update gameMode
        this.gameMode = 1
        this.view.gameModeUpdate(this.gameMode)

        // get the card drawn and remove it from the card stack
        this.cardInHand = this.cardsInStack.shift()

        // get available position(s)
        let available = []
        if (this.cardInHand.value <= 10) {
            available = this.board.availableNumberCards(this.cardInHand.value)
            this.view.setAvailableNumber(available)
        } else {
            available = this.board.availableRoyaleCards(this.cardInHand)
            this.view.setAvailableRoyale(available)
        }

        // view
        this.view.setCardAsCursor(this.cardInHand)
    }

    /**
     * When the player places a card on a valid tile
     */
    placeCard(e, i) {
        if (e.currentTarget.classList.value == "validMove") {
            // if card is a royale
            if (i >9) {
                let royaleI = i - 9
                this.board.placeRoyale(this.cardInHand, royaleI)
                this.view.placeRoyaleCard(this.cardInHand, royaleI)
            } else {
                this.board.placeNumber(this.cardInHand, i)
                this.view.placeNumberCard(this.cardInHand, i)
            }
            this.cardInHand = null
            this.view.removeCardAsCursor()
            this.view.resetAvailable()
            this.gameMode = 0
            this.view.gameModeUpdate(this.gameMode)
        }
    }

    /**
     * Fire a cannon from a specific tile
     */
    fireCannon() {

    }

    /**
     * Add armour to a royale
     */
    noMove() {

    }
}