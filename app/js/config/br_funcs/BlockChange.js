class BlockChange {
    constructor() {
        this.counter = 0
    }

    changeHorizontal() {
        for (let i = 9; i > 0; i--) {
            var prevLine = null
            prevLine = JSON.stringify(Specs.BRBoard[i], null, "")
            Specs.BRBoard, Specs.matches = LineCheck.checkHoriz(Specs.BRBoard, i)
            // console.log(prevLine)
            // console.log(JSON.stringify(Specs.BRBoard[i], null, ""));
            console.log(Specs.isLineMatched, "before")
            if (prevLine != JSON.stringify(Specs.BRBoard[i], null, ""))
                Specs.isLineMatched = true
            else this.counter++
            console.log(Specs.matches)
            console.log(Specs.isLineMatched, "after")

            if (Specs.isLineMatched) {
                Specs.isSwapPossible = false
                Specs.isSwapped = 0
                Specs.currentBlockModel = null
                Specs.nextBlockModel = null
                Specs.comboMultipler++
                console.log("in isLineMatched")

                for (let j = 0; j < Specs.matches.length; j++)
                    for (let k = 0; k < Specs.matches[j].length; k++)
                        Specs.indexesMatched.push(Specs.matches[j][k])
                console.log(Specs.indexesMatched);

                var index = 0
                console.log(i);
                while (index < Specs.indexesMatched.length) {
                    for (let k = 0; k < Specs.matches.length; k++)
                        for (let j = 2; j < Specs.scene.children.length; j++) {
                            if ((Math.round(9 - Specs.scene.children[j].position.y / (Specs.scale * 2)) == i)
                                && Math.round(Specs.scene.children[j].position.x / (Specs.scale * 2)) == Specs.indexesMatched[index]) {
                                index++
                                Specs.blocksToDestruction.push(Specs.scene.children[j])
                                Specs.playerPoints += 20 * Specs.comboMultipler
                                if (index == Specs.matches[k].length)
                                    break

                            }
                        }
                }
                console.log(Specs.blocksToDestruction)
                for (let j = i - 1; j > 0; j--)
                    for (let k = 0; k < Specs.indexesMatched.length; k++) {
                        Specs.fallingBlocks.push(Specs.getBlockByPosition(Specs.indexesMatched[k], j))
                    }

                console.log(Specs.fallingBlocks);
                if (!Specs.isFirstTime) {
                    document.getElementById("pointsNumber").innerText = Specs.playerPoints
                    document.getElementById("multiplerNumber").innerText = Specs.comboMultipler
                }
                document.removeEventListener("click", MouseEvent.leftClick)
                document.removeEventListener("mousemove", MouseEvent.cursorMove)
                document.removeEventListener("contextmenu", MouseEvent.rightClick)
                this.counter = 0
                AnimateBlock.scaleBlockSmaller(1, true)
                // return true
                // blockFalling()
                break
            }

            else {

                Specs.isLineMatchChecked = true
            }

        }
        if (this.counter == 9) {
            this.changeVertical()
        }
        else if (this.counter == 18) {
            document.body.style.cursor = "default"
            Specs.isEveryLineChecked = false
            Specs.comboMultipler = 0
            this.counter = 0
            if (Specs.isFirstTime) {
                Specs.isFirstTime = false
                Specs.playerPoints = 0
            }
            else
                document.getElementById("multiplerNumber").innerText = Specs.comboMultipler
        }
    }

    changeVertical() {
        for (let i = 0; i < 9; i++) {
            var prevLine = null
            var currLine = null
            for (let j = 0; j < 9; j++)
                prevLine += Specs.BRBoard[j][i].toString()
            Specs.BRBoard, Specs.matches = LineCheck.checkVert(Specs.BRBoard, i)
            for (let j = 0; j < 9; j++)
                currLine += Specs.BRBoard[j][i].toString()
            // console.log(prevLine)
            // console.log(JSON.stringify(Specs.BRBoard[i], null, ""));
            console.log(Specs.isLineMatched, "before")
            if (prevLine != currLine)
                Specs.isLineMatched = true
            else this.counter++
            console.log(Specs.matches)
            console.log(Specs.isLineMatched, "after")

            if (Specs.isLineMatched) {
                Specs.isSwapPossible = false
                Specs.isSwapped = 0
                Specs.currentBlockModel = null
                Specs.nextBlockModel = null
                Specs.comboMultipler++
                console.log("in isLineMatched")

                for (let j = 0; j < Specs.matches.length; j++)
                    for (let k = 0; k < Specs.matches[j].length; k++)
                        Specs.indexesMatched.push(Specs.matches[j][k])
                console.log(Specs.indexesMatched);

                var index = 0
                console.log(i);
                // while (index < Specs.indexesMatched.length) {
                for (let k = 0; k < Specs.matches.length; k++)
                    for (let j = 2; j < Specs.scene.children.length; j++) {
                        if ((Math.round(Specs.scene.children[j].position.x / (Specs.scale * 2)) == i)
                            && Specs.indexesMatched.includes(Math.round(9 - Specs.scene.children[j].position.y / (Specs.scale * 2)))) {
                            index++
                            Specs.blocksToDestruction.push(Specs.scene.children[j])
                            Specs.playerPoints += 20 * Specs.comboMultipler
                            if (index == Specs.matches[k].length)
                                break

                        }
                    }
                // }
                console.log(Specs.blocksToDestruction)
                // for (let j = i - 1; j > 0; j--)
                for (let k = 9; k > 0; k--)
                    if (k < Specs.indexesMatched[0] && !Specs.indexesMatched.includes(k))
                        Specs.fallingBlocks.push(Specs.getBlockByPosition(i, k))


                console.log(Specs.fallingBlocks);
                if (!Specs.isFirstTime) {
                    document.getElementById("pointsNumber").innerText = Specs.playerPoints
                    document.getElementById("multiplerNumber").innerText = Specs.comboMultipler
                }
                document.removeEventListener("click", MouseEvent.leftClick)
                document.removeEventListener("mousemove", MouseEvent.cursorMove)
                document.removeEventListener("contextmenu", MouseEvent.rightClick)
                this.counter = 0
                AnimateBlock.scaleBlockSmaller(Specs.indexesMatched.length, false)
                // AnimateBlock.scaleBlockSmaller(2)
                // return true
                // blockFalling()
                break

            }
            else {

                Specs.isLineMatchChecked = true
            }
        }
        if (this.counter == 9) this.changeHorizontal()
        else if (this.counter == 18) {
            document.body.style.cursor = "default"
            Specs.isEveryLineChecked = false
            Specs.comboMultipler = 0
            this.counter = 0
            if (Specs.isFirstTime) {
                Specs.isFirstTime = false
                Specs.playerPoints = 0
            }
            else
                document.getElementById("multiplerNumber").innerText = Specs.comboMultipler
        }
    }

    swapBlocks() {

        if (Specs.currentBlockModel.position.clone().distanceTo(Specs.nextBlockClicked) > Specs.swapSpeed)
            Specs.currentBlockModel.translateOnAxis(Specs.currentDirectionVect, Specs.swapSpeed)

        else {
            Specs.isSwapped++
            Specs.currentBlockModel.position.set(Specs.nextBlockClicked.x, Specs.nextBlockClicked.y, 0)
        }

        if (Specs.nextBlockModel.position.clone().distanceTo(Specs.currentBlockClicked) > Specs.swapSpeed)
            Specs.nextBlockModel.translateOnAxis(Specs.nextDirectionVect, Specs.swapSpeed)

        else {
            Specs.isSwapped++
            Specs.nextBlockModel.position.set(Specs.currentBlockClicked.x, Specs.currentBlockClicked.y, 0)
        }
    }

    swapBlocksBack() {
        console.log("heherere");

        if (Specs.currentBlockModel.position.clone().distanceTo(Specs.currentBlockClicked) > Specs.swapSpeed)
            Specs.currentBlockModel.translateOnAxis(Specs.nextDirectionVect, Specs.swapSpeed)

        if (Specs.nextBlockModel.position.clone().distanceTo(Specs.nextBlockClicked) > Specs.swapSpeed)
            Specs.nextBlockModel.translateOnAxis(Specs.currentDirectionVect, Specs.swapSpeed)

        if (Specs.nextBlockModel.position.clone().distanceTo(Specs.nextBlockClicked) < Specs.swapSpeed
            && Specs.currentBlockModel.position.clone().distanceTo(Specs.currentBlockClicked) < Specs.swapSpeed) {

            Specs.nextBlockModel.position.set(Specs.nextBlockClicked.x, Specs.nextBlockClicked.y, 0)
            Specs.currentBlockModel.position.set(Specs.currentBlockClicked.x, Specs.currentBlockClicked.y, 0)

            var swap = Specs.getBRBoardPosition(Specs.currentBlockPosition)
            Specs.BRBoard[9 - Specs.currentBlockPosition.y / (Specs.scale * 2)][Specs.currentBlockPosition.x / (Specs.scale * 2)] = Specs.getBRBoardPosition(Specs.nextBlockPosition)
            Specs.BRBoard[9 - Specs.nextBlockPosition.y / (Specs.scale * 2)][Specs.nextBlockPosition.x / (Specs.scale * 2)] = swap

            Specs.isSwapPossible = false
            Specs.isSwapped = 0
            Specs.currentBlockModel = null
            Specs.nextBlockModel = null
            Specs.isLineMatchChecked = false
            Specs.indexesMatched = []

            // document.addEventListener("mousemove", MouseEvent.cursorMove)
            // document.addEventListener("click", MouseEvent.leftClick)
            // document.addEventListener("contextmenu", MouseEvent.rightClick)

            console.log("After swap")

        }
    }
}