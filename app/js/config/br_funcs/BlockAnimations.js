class BlockAnimations {
    constructor() {
        // this.BlockPositionChange = new BlockChange()

        this.insertingBlocks = (whichChange) => {
            for (let i = 1; i < 9; i++)
                for (let j = 0; j < 9; j++)
                    if (!Specs.getBlockByPosition(j, 9 - i)) {
                        var model = Specs.Brick.clone()
                        model.children[1].material = Specs.matW[Specs.BRBoard[9 - i][j]]
                        model.name = "Brick" + Specs.BRBoard[9 - i][j].toString()
                        model.position.set(Specs.scale * 2 * j, Specs.scale * 2 * i, 0)
                        model.scale.set(0, 0, 0)
                        Specs.scene.add(model)
                        Specs.blocksToInsert.push(model)
                    }
            console.log(Specs.blocksToInsert);

            const insertNewBlock = () => {
                var request = requestAnimationFrame(insertNewBlock)
                var scale = null
                for (let i = 0; i < Specs.blocksToInsert.length; i++) {
                    scale = Specs.blocksToInsert[i].scale
                    Specs.blocksToInsert[i].scale.set(scale.x + Specs.fadingSpeed, scale.y + Specs.fadingSpeed, scale.z + Specs.fadingSpeed)
                }
                if (scale.x == Specs.scale - 12 && scale.y == Specs.scale - 12 && scale.z == Specs.scale - 12) {
                    cancelAnimationFrame(request)
                    Specs.blocksToInsert = []
                    document.addEventListener("mousemove", Specs.MouseEvent.cursorMove)
                    document.addEventListener("click", Specs.MouseEvent.leftClick)
                    document.addEventListener("contextmenu", Specs.MouseEvent.rightClick)
                    Specs.isSwapPossible = false
                    Specs.isSwapped = 0
                    Specs.currentBlockModel = null
                    Specs.nextBlockModel = null
                    Specs.isLineMatchChecked = false
                    Specs.isLineMatched = false
                    Specs.indexesMatched = []
                    Specs.isEveryLineChecked = true
                    console.log(Specs.blocksToDestruction);
                    console.log(Specs.blocksToInsert);
                    console.log(Specs.fallingBlocks);
                    for (let i = 2; i < Specs.scene.children.length; i++)
                        if (![0, 1, 2, 3, 4, 5, 6, 7, 8].includes(Specs.scene.children[i].position.x / (Specs.scale * 2))
                            || ![0, 1, 2, 3, 4, 5, 6, 7, 8].includes(Specs.scene.children[i].position.y / (Specs.scale * 2))
                            || ![0, 1, 2, 3, 4, 5, 6, 7, 8].includes(Specs.scene.children[i].position.z / (Specs.scale * 2)))
                            console.log(Specs.scene.children[i], Specs.scene.children[i].position.x / (Specs.scale * 2), Specs.scene.children[i].position.y / (Specs.scale * 2), Specs.scene.children[i].position.z / (Specs.scale * 2));
                    for (let i = 2; i < Specs.scene.children.length; i++)
                        if (Specs.getBRBoardPosition(Specs.scene.children[i].position) != Specs.scene.children[i].name[5])
                            console.log(Specs.scene.children[i].name[5], Specs.getBRBoardPosition(Specs.scene.children[i].position))
                    if (whichChange) Specs.BlockPositionChange.changeHorizontal()
                    else Specs.BlockPositionChange.changeVertical()

                }
            }
            insertNewBlock()
        }

        this.blockFalling = (howManyTimes, whichChange) => {
            const animate = () => {
                var request = requestAnimationFrame(animate)
                console.log(howManyTimes);
                var positionY = null
                for (let i = 0; i < Specs.fallingBlocks.length; i++) {
                    positionY = Specs.fallingBlocks[i].position.y
                    Specs.fallingBlocks[i].position.y = positionY - Specs.fallingSpeed
                }
                Specs.fallCounter += Specs.fallingSpeed
                if (Specs.fallCounter == Specs.scale * 2 * howManyTimes) {
                    cancelAnimationFrame(request)
                    Specs.fallCounter = 0
                    Specs.fallingBlocks = []
                    this.insertingBlocks(whichChange)
                }
            }
            animate()
        }

        this.scaleBlockSmaller = (howManyTimes, whichChange) => {
            const animate = () => {
                var request = requestAnimationFrame(animate)
                var scale = null
                for (let i = 0; i < Specs.blocksToDestruction.length; i++) {
                    scale = Specs.blocksToDestruction[i].scale
                    Specs.blocksToDestruction[i].scale.set(scale.x - Specs.fadingSpeed, scale.y - Specs.fadingSpeed, scale.z - Specs.fadingSpeed)
                    // console.log(scale)
                }
                if (scale.x == 0 && scale.y == 0 && scale.z == 0) {
                    for (let i = 0; i < Specs.blocksToDestruction.length; i++)
                        Specs.scene.remove(Specs.blocksToDestruction[i])
                    cancelAnimationFrame(request)
                    Specs.blocksToDestruction = []
                    console.log(howManyTimes);

                    /*if (which)*/ this.blockFalling(howManyTimes, whichChange)
                    // else this.blockFallingVert()
                }
            }
            animate()
        }
    }
}