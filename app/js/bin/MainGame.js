// var Game

// $(document).ready(() => {
document.addEventListener("DOMContentLoaded", () => {
    for(let i = 0; i < document.body.children.length - 1;i++){
        document.body.children[i].style.top = 50 * i + "px"
    }
    var _Game = new Game()
    
    console.log("MainGame has been generated")
    
})