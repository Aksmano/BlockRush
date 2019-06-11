var BlockPositionChange = null,
    AnimateBlock = null,
    LineCheck = null,
    MouseEvent = null,
    Game = null

document.addEventListener("DOMContentLoaded", () => {
    MouseEvent = new MouseEvents()
    LineCheck = new LineMatch()
    BlockPositionChange = new BlockChange()
    AnimateBlock = new BlockAnimations()
    Game = new GameBR()
})