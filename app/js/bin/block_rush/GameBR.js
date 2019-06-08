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
        this.isBlockClicked = false
        this.isSwapRendering = false
        this.isSwapPossible = false
        this.isSwapped = 0

        var axes = new THREE.AxesHelper(100)
        this.scene.add(axes)

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
                    model.name = rand.toString()
                    model.position.set(Specs.scale * 2 * (i - 1), Specs.scale * 2 * (j - 1), rand * Specs.scale / 10)
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



        const render = () => {
            requestAnimationFrame(render)
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.render(this.scene, this.camera);

            if (this.isSwapPossible) {
                // console.log(this.currentBlockClicked);
                // console.log(this.nextBlockClicked);

                if (this.currentBlockModel.position.clone().distanceTo(this.nextBlockClicked) > 3) {
                    this.currentBlockModel.translateOnAxis(this.currentDirectionVect, 3)
                }
                else {
                    this.isSwapped++
                    this.currentBlockModel.position.set(this.nextBlockClicked.x, this.nextBlockClicked.y, this.nextBlockClicked.z)
                }

                if (this.nextBlockModel.position.clone().distanceTo(this.currentBlockClicked) > 3) {
                    this.nextBlockModel.translateOnAxis(this.nextDirectionVect, 3)
                }
                else {
                    this.isSwapped++
                    this.nextBlockModel.position.set(this.currentBlockClicked.x, this.currentBlockClicked.y, this.currentBlockClicked.z)
                }

                if (this.isSwapped == 2) {
                    this.isSwapPossible = false
                    this.isSwapped = 0
                    this.currentBlockModel = null
                    this.nextBlockModel = null
                    document.addEventListener("mousemove", this.cursorMove)
                    document.addEventListener("click", this.leftClick)
                    document.addEventListener("contextmenu", this.rightClick)
                    for (let i = 9; i > 0; i--)
                        this.BRBoard = this.LineCheck.checkHoriz(this.BRBoard, i)
                    // console.log(this.currentBlockModel.position);
                    // console.log(this.nextBlockModel.position);
                    console.log("After swap")
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
                        for (let i = 3; i < Specs.sizeYxX; i++)
                            this.scene.children[i].children[0].material = Specs.matCDark
                    else if (this.isBlockClicked)
                        for (let i = 3; i < Specs.sizeYxX; i++)
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
                    this.currentBlockClicked = new THREE.Vector3(this.currentBlockPosition.x, this.currentBlockPosition.y, this.currentBlockPosition.z)
                    this.nextBlockClicked = new THREE.Vector3(this.nextBlockPosition.x, this.nextBlockPosition.y, this.nextBlockPosition.z)
                    this.currentDirectionVect = this.nextBlockClicked.clone().sub(this.currentBlockClicked).normalize()
                    this.nextDirectionVect = this.currentBlockClicked.clone().sub(this.nextBlockClicked).normalize()
                    if (this.nextBlockModel.position.clone().distanceTo(this.currentBlockClicked) < 105) {
                        console.log(this.BRBoard[9 - this.currentBlockPosition.y / (Specs.scale * 2)][this.currentBlockPosition.x / (Specs.scale * 2)]);
                        console.log(9 - this.currentBlockPosition.y / (Specs.scale * 2), this.currentBlockPosition.x / (Specs.scale * 2));
                        console.log(this.BRBoard[9 - this.nextBlockPosition.y / (Specs.scale * 2)][this.nextBlockPosition.x / (Specs.scale * 2)]);
                        console.log(9 - this.nextBlockPosition.y / (Specs.scale * 2), this.nextBlockPosition.x / (Specs.scale * 2));
                        console.log(this.currentBlockModel.position);
                        console.log(this.nextBlockModel.position);
                        var swap = this.BRBoard[9 - this.currentBlockPosition.y / (Specs.scale * 2)][this.currentBlockPosition.x / (Specs.scale * 2)]
                        this.BRBoard[9 - this.currentBlockPosition.y / (Specs.scale * 2)][this.currentBlockPosition.x / (Specs.scale * 2)] = this.BRBoard[9 - this.nextBlockPosition.y / (Specs.scale * 2)][this.nextBlockPosition.x / (Specs.scale * 2)]
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
}