/**
 * This file is in charge of displaying all the stuff
 */
class View {
    constructor() {
        this.cacheElements()
        this.bindEvents()
    }

    placeNumberCard(card, position) {
        if (card == null) return
        const {value, suite} = card
        const $card = this.createCard(value, suite)
        this.$tiles[position].html($card)
    }

    placeRoyaleCard(card, position) {
        const {value, suite} = card
        const $card = this.createCard(value, suite)
        this.$royales[position].html($card)
    }

    gameModeUpdate(gameMode) {
        if (gameMode == 0) {
            $("#cardStack").addClass("pickable")
        } else if (gameMode == 1) {
            $("#cardStack").removeClass("pickable")
        }
    }

    /**
     * Sets the cursor to a card
     * @param {Card} card The card to be set
     */
    setCardAsCursor(card) {
        const {value, suite} = card
        let $card = this.createCard(value, suite)
        $card.classList += " cursor"
        document.body.appendChild($card)
        this.$cursor = $card
        $(this.$cursor).css({
            left: 170,
            top: 620
        })
    }

    removeCardAsCursor() {
        $(".cursor").remove()
        this.$cursor = null
    }

    /**
     * Sets an indicator for the available royale spots
     * @param {number[]} available Array of available spots
     */
    setAvailableRoyale(available) {
        for (let i = 0; i < this.$royales.length; i++) {
            if (available.includes(i)) {
                this.$royales[i].addClass("validMove")
            } else {
                this.$royales[i].removeClass("validMove")
            }
        }
    }

    /**
     * Sets an indicator for the available number tiles
     * @param {number[]} available Array of available spots
     */
    setAvailableNumber(available) {
        for (let i = 0; i < this.$tiles.length; i++) {
            if (available.includes(i)) {
                this.$tiles[i].addClass("validMove")
            } else {
                this.$tiles[i].removeClass("validMove")
            }
        }
    }

    resetAvailable() {
        this.$royales.forEach($royale => {
            $royale.removeClass("validMove")
        })
        this.$tiles.forEach($tile => {
            $tile.removeClass("validMove")
        })
    }

    /**
     * Place the initial empty tiles of the game
     */
    initEmptyTiles() {
        for (let i = 0; i < this.$royales.length; i++) {
            const $empty = document.createElement("div")
            $empty.classList = "emptyTile"
    
            this.$royales[i].html($empty)
        }
        
        // center tile
        const $empty = document.createElement("div")
        $empty.classList = "emptyTile"

        this.$tiles[4].html($empty)
    }

    /**
     * A helper function that creates a card element
     * 
     * 0 = hearts, 1 = diamonds, 2 = clubs, 3 = clubs
     * @param {number} value The value of the card being created
     * @param {number} suite The suite of the card being created
     * 
     * @returns {Element}
     */
    createCard(value, suite) {
        let $card = document.createElement("div")
        let $top = document.createElement("div")
        let $middle = document.createElement("div")
        let $bottom = document.createElement("div")

        $card.classList = "card"

        $top.classList = "top"
        $top.innerHTML = value

        $middle.classList = "middle "
        $middle.classList += (suite == 0 || suite == 1) ? "redSuite" : "blackSuite"
        let suiteHTML = ""
        switch(suite) {
            case 0:
                suiteHTML = "&hearts; "
                break
            case 1:
                suiteHTML = "&diamondsuit; "
                break
            case 2:
                suiteHTML = "&clubsuit; "
                break
            case 3:
                suiteHTML = "&spadesuit; "
        }
        $middle.innerHTML = suiteHTML.repeat(value)

        $bottom.classList = "bottom"
        $bottom.innerHTML = value

        $card.appendChild($top)
        $card.appendChild($middle)
        $card.appendChild($bottom)
        return $card
    }

    bindEvents() {
        $(document).on("mousemove", e => {
            if (this.$cursor) {
                $(this.$cursor).css({
                    left: e.pageX,
                    top: e.pageY
                })    
            }
        })
    }

    cacheElements() {
        let $royale1  = $("#royale1")
        let $royale2  = $("#royale2")
        let $royale3  = $("#royale3")
        let $royale4  = $("#royale4")
        let $royale5  = $("#royale5")
        let $royale6  = $("#royale6")
        let $royale7  = $("#royale7")
        let $royale8  = $("#royale8")
        let $royale9  = $("#royale9")
        let $royale10 = $("#royale10")
        let $royale11 = $("#royale11")
        let $royale12 = $("#royale12")
        this.$royales = [
            $royale1,  $royale2,  $royale3,
            $royale4,  $royale5,  $royale6,
            $royale7,  $royale8,  $royale9,
            $royale10, $royale11, $royale12
        ]

        let $tile1 = $("#tile1")
        let $tile2 = $("#tile2")
        let $tile3 = $("#tile3")
        let $tile4 = $("#tile4")
        let $tile5 = $("#tile5")
        let $tile6 = $("#tile6")
        let $tile7 = $("#tile7")
        let $tile8 = $("#tile8")
        let $tile9 = $("#tile9")
        this.$tiles = [
            $tile1, $tile2, $tile3,
            $tile4, $tile5, $tile6,
            $tile7, $tile8, $tile9
        ]
    }
}