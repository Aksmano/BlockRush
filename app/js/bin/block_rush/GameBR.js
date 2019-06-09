class GameBR {
    constructor(brickType = "normic_brick") {

        this.scene = new THREE.Scene()
        this.camera = Specs.orthoCamera
        this.brickType = brickType
        this.BRBoard = Specs.BRTable
        this.LineCheck = new LineMatch()

        this.currentBlockPosition = null
        this.currentBlockModel = null
        this.currentBlockClicked = null
        this.currentDirectionVect = null

        this.nextBlockModel = null
        this.nextBlockPosition = null
        this.nextBlockClicked = null
        this.nextDirectionVect = null

        this.pointedBlockModel = null

        this.indexesMatched = []
        this.blocksToDestruction = []
        this.fallingBlocks = []
        this.blocksToInsert = []

        this.fallCounter = 0

        this.isBlockClicked = false
        this.isSwapRendering = false
        this.isSwapPossible = false
        this.isLineMatchChecked = false
        this.isSwapped = 0
        this.isLineMatched = false
        this.isEveryLineChecked = true

        // var axes = new THREE.AxesHelper(100)
        // this.scene.add(axes)

        // var grid = Specs.gridHelper
        // this.scene.add(grid)

        // this.light = Specs.hemiLight
        this.light = Specs.ambientLight
        // this.light.position.set(0, 2 * Specs.scale, 0)
        this.scene.add(this.light)

        this.BrickC = new Brick()
        this.Brick = null
        this.BrickC.loadBrick("../../models/normic_brick.gltf", (modeldata) => {
            console.log("model has been loaded", modeldata)
            modeldata.position.set(Specs.blockRushBrickDist[this.brickType] * Specs.scale * 1000, Specs.blockRushBrickDist[this.brickType] * Specs.scale * 1000, Specs.blockRushBrickDist[this.brickType] * Specs.scale * 1000)
            this.Brick = modeldata
            this.scene.add(modeldata)
            for (let i = 1; i < 10; i++)
                for (let j = 1; j < 10; j++) {
                    var model = this.Brick.clone()
                    var rand = Math.ceil(Math.random() * 6) - 1
                    this.BRBoard[10 - j][i - 1] = rand
                    model.children[1].material = Specs.matW[rand]
                    model.name = "Brick" + rand.toString()
                    model.position.set(Specs.scale * 2 * (i - 1), Specs.scale * 2 * (j - 1), 0)
                    this.scene.add(model)
                }
            console.log(JSON.stringify(this.BRBoard, null, ""));
        })

        this.renderer = new THREE.WebGLRenderer
        // var orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement)

        // orbitControl.addEventListener('change', () => {
        //     this.renderer.render(this.scene, this.camera)
        // });

        this.raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
        this.mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany
        this.renderer.setClearColor(0x444444) // zamiast # jest 0x
        this.renderer.setSize(window.innerWidth, window.innerHeight) //ustawienie wymiarów renderu okna
        this.renderer.antialias = true
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        $("#root").append(this.renderer.domElement)  // dodanie renderera do diva
        this.camera.position.set(0, 0, 6000) // ustawienie pozycji kamery, mozna tez camera.position.oś = wartość
        this.camera.lookAt(this.scene.position) // nakierowanie kamery na punkt (0,0,0)
        this.camera.position.set(440, 400, 0)
        this.camera.fov = 34 // ustalenie domyślnego FOVa
        this.camera.updateProjectionMatrix()
        console.log(this.scene);

        this.insertingBlocks = () => {
            for (let i = 1; i < 9; i++)
                for (let j = 0; j < 9; j++)
                    if (!this.getBlockByPosition(j, 9 - i)) {
                        var model = this.Brick.clone()
                        model.children[1].material = Specs.matW[this.BRBoard[9 - i][j]]
                        model.name = "Brick" + this.BRBoard[9 - i][j].toString()
                        model.position.set(Specs.scale * 2 * j, Specs.scale * 2 * i, 0)
                        model.scale.set(0, 0, 0)
                        this.scene.add(model)
                        this.blocksToInsert.push(model)
                    }
            console.log(this.blocksToInsert);

            const insertNewBlock = () => {
                var request = requestAnimationFrame(insertNewBlock)
                var scale = null
                for (let i = 0; i < this.blocksToInsert.length; i++) {
                    scale = this.blocksToInsert[i].scale
                    this.blocksToInsert[i].scale.set(scale.x + Specs.fadingSpeed, scale.y + Specs.fadingSpeed, scale.z + Specs.fadingSpeed)
                }
                if (scale.x == Specs.scale - 12 && scale.y == Specs.scale - 12 && scale.z == Specs.scale - 12) {
                    cancelAnimationFrame(request)
                    this.blocksToInsert = []
                    document.addEventListener("mousemove", this.cursorMove)
                    document.addEventListener("click", this.leftClick)
                    document.addEventListener("contextmenu", this.rightClick)
                    this.isSwapPossible = false
                    this.isSwapped = 0
                    this.currentBlockModel = null
                    this.nextBlockModel = null
                    this.isLineMatchChecked = false
                    this.isLineMatched = false
                    this.indexesMatched = []
                    this.isEveryLineChecked = true
                    console.log(this.blocksToDestruction);
                    console.log(this.blocksToInsert);
                    console.log(this.fallingBlocks);
                    for (let i = 2; i < this.scene.children.length; i++)
                        if (![0, 1, 2, 3, 4, 5, 6, 7, 8].includes(this.scene.children[i].position.x / (Specs.scale * 2))
                            || ![0, 1, 2, 3, 4, 5, 6, 7, 8].includes(this.scene.children[i].position.y / (Specs.scale * 2))
                            || ![0, 1, 2, 3, 4, 5, 6, 7, 8].includes(this.scene.children[i].position.z / (Specs.scale * 2)))
                            console.log(this.scene.children[i], this.scene.children[i].position.x / (Specs.scale * 2), this.scene.children[i].position.y / (Specs.scale * 2), this.scene.children[i].position.z / (Specs.scale * 2));
                    // this.checkHorizontal()

                }
            }
            insertNewBlock()
        }

        this.blockFalling = () => {
            var request = requestAnimationFrame(this.blockFalling)
            var positionY = null
            for (let i = 0; i < this.fallingBlocks.length; i++) {
                positionY = this.fallingBlocks[i].position.y
                this.fallingBlocks[i].position.y = positionY - Specs.fallingSpeed
            }
            this.fallCounter += Specs.fallingSpeed
            if (this.fallCounter == Specs.scale * 2) {
                cancelAnimationFrame(request)
                this.fallCounter = 0
                this.fallingBlocks = []
                this.insertingBlocks()
            }
        }

        this.scaleBlockSmaller = () => {
            var request = requestAnimationFrame(this.scaleBlockSmaller)
            var scale = null
            for (let i = 0; i < this.blocksToDestruction.length; i++) {
                scale = this.blocksToDestruction[i].scale
                this.blocksToDestruction[i].scale.set(scale.x - Specs.fadingSpeed, scale.y - Specs.fadingSpeed, scale.z - Specs.fadingSpeed)
                console.log(scale)
            }
            if (scale.x == 0 && scale.y == 0 && scale.z == 0) {
                for (let i = 0; i < this.blocksToDestruction.length; i++)
                    this.scene.remove(this.blocksToDestruction[i])
                cancelAnimationFrame(request)
                this.blocksToDestruction = []
                this.blockFalling()
            }
        }



        const render = () => {
            requestAnimationFrame(render)
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.render(this.scene, this.camera);

            if (this.isSwapPossible) {
                // console.log(this.currentBlockClicked);
                // console.log(this.nextBlockClicked);
                if (this.isSwapped < 2) {
                    if (this.currentBlockModel.position.clone().distanceTo(this.nextBlockClicked) > Specs.swapSpeed)
                        this.currentBlockModel.translateOnAxis(this.currentDirectionVect, Specs.swapSpeed)

                    else {
                        this.isSwapped++
                        this.currentBlockModel.position.set(this.nextBlockClicked.x, this.nextBlockClicked.y, 0)
                    }

                    if (this.nextBlockModel.position.clone().distanceTo(this.currentBlockClicked) > Specs.swapSpeed)
                        this.nextBlockModel.translateOnAxis(this.nextDirectionVect, Specs.swapSpeed)

                    else {
                        this.isSwapped++
                        this.nextBlockModel.position.set(this.currentBlockClicked.x, this.currentBlockClicked.y, 0)
                    }
                }

                if (this.isSwapped == 2) {

                    // while (this.isEveryLineChecked)
                    // this.checkHorizontal()
                    for (let i = 0; i < 9; i++) {
                        var indexes = []
                        var prevLine = null
                        var currLine = null
                        for (let j = 0; j < 9; j++)
                            prevLine += this.BRBoard[j][i].toString()
                        this.BRBoard, indexes = this.LineCheck.checkVert(this.BRBoard, i)
                        for (let j = 0; j < 9; j++)
                            currLine += this.BRBoard[j][i].toString()
                        // console.log(prevLine)
                        // console.log(JSON.stringify(this.BRBoard[i], null, ""));
                        console.log(this.isLineMatched, "before")
                        if (prevLine != currLine)
                            this.isLineMatched = true
                        // else counter++
                        console.log(indexes)
                        console.log(this.isLineMatched, "after")

                        if (this.isLineMatched) {
                            this.isSwapPossible = false
                            this.isSwapped = 0
                            this.currentBlockModel = null
                            this.nextBlockModel = null
                            console.log("in isLineMatched")

                            for (let j = 0; j < indexes.length; j++)
                                for (let k = 0; k < indexes[j].length; k++)
                                    this.indexesMatched.push(indexes[j][k])
                            console.log(this.indexesMatched);

                            var index = 0
                            console.log(i);
                            // while (index < this.indexesMatched.length) {
                            for (let k = 0; k < indexes.length; k++)
                                for (let j = 2; j < this.scene.children.length; j++) {
                                    if ((Math.round(9 - this.scene.children[j].position.x / (Specs.scale * 2)) == i)
                                        && Math.round(this.scene.children[j].position.y / (Specs.scale * 2)) == 9 - this.indexesMatched[index]) {
                                        index++
                                        this.blocksToDestruction.push(this.scene.children[j])
                                        if (index == indexes[k].length)
                                            break

                                    }
                                }
                            // }
                            console.log(this.blocksToDestruction)
                            // for (let j = i - 1; j > 0; j--)
                            for (let k = 9; k > 0; k--) {
                                if (k < this.indexesMatched[0])
                                    this.fallingBlocks.push(this.getBlockByPosition(i, this.indexesMatched[k]))
                            }

                            console.log(this.fallingBlocks);
                            document.removeEventListener("click", this.leftClick)
                            document.removeEventListener("mousemove", this.cursorMove)
                            document.removeEventListener("contextmenu", this.rightClick)
                            this.scaleBlockSmaller()
                            // return true
                            // blockFalling()
                            break

                        }
                        else {
                            this.isLineMatchChecked = true
                        }
                    }

                    if (this.isLineMatchChecked) {
                        console.log("heherere");

                        if (this.currentBlockModel.position.clone().distanceTo(this.currentBlockClicked) > Specs.swapSpeed)
                            this.currentBlockModel.translateOnAxis(this.nextDirectionVect, Specs.swapSpeed)

                        if (this.nextBlockModel.position.clone().distanceTo(this.nextBlockClicked) > Specs.swapSpeed)
                            this.nextBlockModel.translateOnAxis(this.currentDirectionVect, Specs.swapSpeed)

                        if (this.nextBlockModel.position.clone().distanceTo(this.nextBlockClicked) < Specs.swapSpeed
                            && this.currentBlockModel.position.clone().distanceTo(this.currentBlockClicked) < Specs.swapSpeed) {

                            this.nextBlockModel.position.set(this.nextBlockClicked.x, this.nextBlockClicked.y, 0)
                            this.currentBlockModel.position.set(this.currentBlockClicked.x, this.currentBlockClicked.y, 0)

                            var swap = this.getBRBoardPosition(this.currentBlockPosition)
                            this.BRBoard[9 - this.currentBlockPosition.y / (Specs.scale * 2)][this.currentBlockPosition.x / (Specs.scale * 2)] = this.getBRBoardPosition(this.nextBlockPosition)
                            this.BRBoard[9 - this.nextBlockPosition.y / (Specs.scale * 2)][this.nextBlockPosition.x / (Specs.scale * 2)] = swap

                            this.isSwapPossible = false
                            this.isSwapped = 0
                            this.currentBlockModel = null
                            this.nextBlockModel = null
                            this.isLineMatchChecked = false
                            this.indexesMatched = []

                            document.addEventListener("mousemove", this.cursorMove)
                            document.addEventListener("click", this.leftClick)
                            document.addEventListener("contextmenu", this.rightClick)

                            console.log("After swap")

                        }

                    }

                    // console.log(this.currentBlockModel.position);
                    // console.log(this.nextBlockModel.position);
                }

            }
        }
        render()



        this.cursorMove = (e) => {
            this.mouseVector.x = (e.clientX / $(window).width()) * 2 - 1;
            this.mouseVector.y = -(e.clientY / $(window).height()) * 2 + 1;
            this.raycaster.setFromCamera(this.mouseVector, this.camera);
            var intersects = this.raycaster.intersectObjects(this.scene.children, true);

            if ((intersects.length <= 0 && !this.isBlockClicked)
                || (intersects.length <= 0 && this.isBlockClicked && this.pointedBlockModel.parent.children[0].material.color.r != 1)) {
                if (this.pointedBlockModel != null)
                    if (!this.isBlockClicked)
                        for (let i = 2; i < this.scene.children.length; i++)
                            this.scene.children[i].children[0].material = Specs.matCDark
                    else if (this.isBlockClicked)
                        for (let i = 2; i < this.scene.children.length; i++)
                            if (this.scene.children[i] != this.currentBlockModel)
                                this.scene.children[i].children[0].material = Specs.matCDark
                document.body.style.cursor = "default"
            }
            else if (!this.isBlockClicked) {
                this.pointedBlockModel = intersects[0].object.parent.children[0]
                this.pointedBlockModel.material = Specs.matCGray
                document.body.style.cursor = "pointer"
            }
            else if (this.isBlockClicked && intersects.length > 0 && this.currentBlockModel != intersects[0].object.parent) {
                this.pointedBlockModel = intersects[0].object.parent.children[0]
                this.pointedBlockModel.material = Specs.matCLightBlue
                document.body.style.cursor = "pointer"
            }
        }

        this.leftClick = (e) => {
            this.mouseVector.x = (e.clientX / $(window).width()) * 2 - 1;
            this.mouseVector.y = -(e.clientY / $(window).height()) * 2 + 1;
            this.raycaster.setFromCamera(this.mouseVector, this.camera);
            var intersects = this.raycaster.intersectObjects(this.scene.children, true);

            console.log(intersects.length)
            if (intersects.length > 0) {
                if (!this.isBlockClicked) {
                    // console.log(intersects[0].object.parent.children[0].material)                    
                    console.log(intersects[0].object)
                    this.currentBlockModel = intersects[0].object.parent
                    this.currentBlockPosition = intersects[0].object.parent.position
                    this.isBlockClicked = true
                    intersects[0].object.parent.children[0].material = Specs.matCWhite
                    document.body.style.cursor = "default"
                }
                else if (this.isBlockClicked && this.currentBlockModel != intersects[0].object) {
                    // console.log("you clicked that block", this.currentBlockModel)
                    this.nextBlockModel = intersects[0].object.parent
                    this.nextBlockPosition = intersects[0].object.parent.position
                    this.currentBlockClicked = new THREE.Vector3(this.currentBlockPosition.x, this.currentBlockPosition.y, 0)
                    this.nextBlockClicked = new THREE.Vector3(this.nextBlockPosition.x, this.nextBlockPosition.y, 0)
                    this.currentDirectionVect = this.nextBlockClicked.clone().sub(this.currentBlockClicked).normalize()
                    this.nextDirectionVect = this.currentBlockClicked.clone().sub(this.nextBlockClicked).normalize()
                    if (this.nextBlockModel.position.clone().distanceTo(this.currentBlockClicked) < 105) {

                        console.log(this.BRBoard[9 - this.currentBlockPosition.y / (Specs.scale * 2)][this.currentBlockPosition.x / (Specs.scale * 2)]);
                        console.log(9 - this.currentBlockPosition.y / (Specs.scale * 2), this.currentBlockPosition.x / (Specs.scale * 2));
                        console.log(this.BRBoard[9 - this.nextBlockPosition.y / (Specs.scale * 2)][this.nextBlockPosition.x / (Specs.scale * 2)]);
                        console.log(9 - this.nextBlockPosition.y / (Specs.scale * 2), this.nextBlockPosition.x / (Specs.scale * 2));
                        console.log(this.currentBlockModel.position);
                        console.log(this.nextBlockModel.position);

                        var swap = this.getBRBoardPosition(this.currentBlockPosition)
                        this.BRBoard[9 - this.currentBlockPosition.y / (Specs.scale * 2)][this.currentBlockPosition.x / (Specs.scale * 2)] = this.getBRBoardPosition(this.nextBlockPosition)
                        this.BRBoard[9 - this.nextBlockPosition.y / (Specs.scale * 2)][this.nextBlockPosition.x / (Specs.scale * 2)] = swap
                        this.isBlockClicked = false
                        this.isSwapPossible = true
                        this.currentBlockModel.children[0].material = Specs.matCDark
                        this.nextBlockModel.children[0].material = Specs.matCDark

                        document.body.style.cursor = "default"
                        document.removeEventListener("click", this.leftClick)
                        document.removeEventListener("mousemove", this.cursorMove)
                        document.removeEventListener("contextmenu", this.rightClick)
                        console.log(this.nextBlockModel.position.clone().distanceTo(this.currentBlockClicked))
                        console.log(this.currentBlockModel.position.clone().distanceTo(this.nextBlockClicked))

                    }

                }
            }
        }

        this.rightClick = (e) => {
            e.preventDefault()
            try { this.currentBlockModel.parent.children[0].material = Specs.matCDark }
            catch{ console.log("currentBlockModel == null"); }

            try { this.pointedBlockModel.material = Specs.matCDark }
            catch{ console.log("pointedBlockModel == null"); }


            this.isBlockClicked = false
        }

        document.addEventListener("mousemove", this.cursorMove)
        document.addEventListener("click", this.leftClick)
        document.addEventListener("contextmenu", this.rightClick)
    }

    getBRBoardPosition(object) {
        return this.BRBoard[Math.round(9 - object.y / (Specs.scale * 2))][Math.round(object.x / (Specs.scale * 2))]
    }

    getBlockByPosition(x, y) {
        for (let i = 2; i < this.scene.children.length; i++)
            if (Math.round(this.scene.children[i].position.x / (Specs.scale * 2)) == x && Math.round(9 - this.scene.children[i].position.y / (Specs.scale * 2)) == y)
                return this.scene.children[i]
        return false
    }

    checkHorizontal() {
        var counter = 0
        for (let i = 9; i > 0; i--) {
            var indexes = []
            var prevLine = null
            prevLine = JSON.stringify(this.BRBoard[i], null, "")
            this.BRBoard, indexes = this.LineCheck.checkHoriz(this.BRBoard, i)
            // console.log(prevLine)
            // console.log(JSON.stringify(this.BRBoard[i], null, ""));
            console.log(this.isLineMatched, "before")
            if (prevLine != JSON.stringify(this.BRBoard[i], null, ""))
                this.isLineMatched = true
            else counter++
            console.log(indexes)
            console.log(this.isLineMatched, "after")

            if (this.isLineMatched) {
                this.isSwapPossible = false
                this.isSwapped = 0
                this.currentBlockModel = null
                this.nextBlockModel = null
                console.log("in isLineMatched")

                for (let j = 0; j < indexes.length; j++)
                    for (let k = 0; k < indexes[j].length; k++)
                        this.indexesMatched.push(indexes[j][k])
                console.log(this.indexesMatched);

                var index = 0
                console.log(i);
                while (index < this.indexesMatched.length) {
                    for (let k = 0; k < indexes.length; k++)
                        for (let j = 2; j < this.scene.children.length; j++) {
                            if ((Math.round(9 - this.scene.children[j].position.y / (Specs.scale * 2)) == i)
                                && Math.round(this.scene.children[j].position.x / (Specs.scale * 2)) == this.indexesMatched[index]) {
                                index++
                                this.blocksToDestruction.push(this.scene.children[j])
                                if (index == indexes[k].length)
                                    break

                            }
                        }
                }
                console.log(this.blocksToDestruction)
                for (let j = i - 1; j > 0; j--)
                    for (let k = 0; k < this.indexesMatched.length; k++) {
                        this.fallingBlocks.push(this.getBlockByPosition(this.indexesMatched[k], j))
                    }

                console.log(this.fallingBlocks);
                document.removeEventListener("click", this.leftClick)
                document.removeEventListener("mousemove", this.cursorMove)
                document.removeEventListener("contextmenu", this.rightClick)
                this.scaleBlockSmaller()
                // return true
                // blockFalling()
                break
            }

            else {
                this.isLineMatchChecked = true
            }

        }
        if (counter == 9) {
            // this.isLineMatchChecked = true
            this.isEveryLineChecked = false
        }
    }

}