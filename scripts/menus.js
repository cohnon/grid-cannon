class Menus {
    constructor() {
        this.bindEvents()
        this.changePage($("#menuTemplate").html())
        this.game = new Game()
    }

    bindEvents() {
        $(document).on("click", "#startButton", () => {
            this.changePage($("#gameTemplate").html())
            this.game.newGame()
        })
        $(document).on("click", "#aboutButton", () => {
            this.changePage($("#aboutTemplate").html())
        })
        $(document).on("click", "#backToMenuButton", () => {
            this.changePage($("#menuTemplate").html())
            if (this.game) {
                this.game.endGame()
            }
        })
        $(document).on("click", "#restartGame", () => {
            this.game.endGame()
            this.game.newGame()
        })
    }
    
    changePage($page) {
        $("#app").html($page)
    }
}
