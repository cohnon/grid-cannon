class Menus {
    constructor() {
        this.bindEvents()
        this.changePage($("#menuTemplate").html())
    }

    bindEvents() {
        $(document).on("click", "#startButton", () => {
            this.changePage($("#gameTemplate").html())
            new Game()
        })
        $(document).on("click", "#aboutButton", () => {
            this.changePage($("#aboutTemplate").html())
        })
        $(document).on("click", "#backToMenuButton", () => {
            this.changePage($("#menuTemplate").html())
        })
    }
    
    changePage($page) {
        $("#app").html($page)
    }
}
