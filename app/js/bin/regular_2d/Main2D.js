var Game = null

document.addEventListener("DOMContentLoaded", () => {
    Game = new Tetris2D()

    for (let i = 0; i < document.body.children.length - 1; i++) {
        document.body.children[i].style.top = 50 * i + "px"
    }
})