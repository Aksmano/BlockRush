var Game = null

// $(document).ready(() => {
document.addEventListener("DOMContentLoaded", () => {
    Game = new Preset()

    for (let i = 0; i < document.body.children.length - 1; i++) {
        document.body.children[i].style.top = 50 * i + "px"
    }


    var sel = document.body.children[2]
    for (let j = 0; j < 7; j++) {
        sel.children[j].addEventListener("click", () => {Game.changeBlock2D(sel.children[j].value); console.log("option clicked")})
    }

    var sel = document.body.children[3]
    for (let j = 0; j < 7; j++) {
        sel.children[j].addEventListener("click", () => {Game.changeBlock3D(sel.children[j].value); console.log("option clicked")})
    }


    console.log("MainGame has been generated")

})