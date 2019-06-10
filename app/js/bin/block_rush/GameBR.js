class GameBR {
    constructor(brickType = "normic_brick") {
        Specs.brickType = brickType

        Specs.BRBoard = JSON.parse(JSON.stringify(Specs.BRTable, null, 4))

        // var axes = new THREE.AxesHelper(100)
        // Specs.scene.add(axes)

        // var grid = Specs.gridHelper
        // Specs.scene.add(grid)

        // this.light = Specs.hemiLight
        this.light = Specs.ambientLight
        // this.light.position.set(0, 2 * Specs.scale, 0)
        Specs.scene.add(this.light)

        Specs.BrickC = new Brick()
        Specs.BrickC.loadBrick("../../models/normic_brick.gltf", (modeldata) => {
            console.log("model has been loaded", modeldata)
            modeldata.position.set(Specs.blockRushBrickDist[Specs.brickType] * Specs.scale * 1000, Specs.blockRushBrickDist[Specs.brickType] * Specs.scale * 1000, Specs.blockRushBrickDist[Specs.brickType] * Specs.scale * 1000)
            Specs.Brick = modeldata
            Specs.scene.add(modeldata)
            for (let i = 1; i < 10; i++)
                for (let j = 1; j < 10; j++) {
                    var model = Specs.Brick.clone()
                    var rand = Math.ceil(Math.random() * 6) - 1
                    Specs.BRBoard[10 - j][i - 1] = rand
                    model.children[1].material = Specs.matW[rand]
                    model.name = "Brick" + rand.toString()
                    model.position.set(Specs.scale * 2 * (i - 1), Specs.scale * 2 * (j - 1), 0)
                    Specs.scene.add(model)
                }
            console.log(JSON.stringify(Specs.BRBoard, null, ""));
            setTimeout()
            Specs.BlockPositionChange.changeHorizontal()
        })

        this.renderer = new THREE.WebGLRenderer
        // var orbitControl = new THREE.OrbitControls(Specs.orthoCamera, this.renderer.domElement)

        // orbitControl.addEventListener('change', () => {
        //     this.renderer.render(Specs.scene, Specs.orthoCamera)
        // });

        Specs.raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
        Specs.mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany
        this.renderer.setClearColor(0x444444) // zamiast # jest 0x
        this.renderer.setSize(window.innerWidth, window.innerHeight) //ustawienie wymiarów renderu okna
        this.renderer.antialias = true
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        $("#root").append(this.renderer.domElement)  // dodanie renderera do diva
        Specs.orthoCamera.position.set(0, 0, 6000) // ustawienie pozycji kamery, mozna tez camera.position.oś = wartość
        Specs.orthoCamera.lookAt(Specs.scene.position) // nakierowanie kamery na punkt (0,0,0)
        Specs.orthoCamera.position.set(400, 400, 0)
        Specs.orthoCamera.fov = 34 // ustalenie domyślnego FOVa
        Specs.orthoCamera.updateProjectionMatrix()
        console.log(Specs.scene);
        // $(window).on('resize', function () {
        //     // notify the renderer of the size change
        //     this.renderer.setSize(window.innerWidth, window.innerHeight);
        //     // update the camera
        //     Specs.orthoCamera.left = -window.innerWidth / 2;
        //     Specs.orthoCamera.right = window.innerWidth / 2;
        //     Specs.orthoCamera.top = window.innerHeight / 2;
        //     Specs.orthoCamera.bottom = -window.innerHeight / 2;
        //     Specs.orthoCamera.updateProjectionMatrix();
        // });
        const render = () => {
            requestAnimationFrame(render)
            // Specs.orthoCamera.aspect = window.innerWidth / window.innerHeight;
            // this.renderer.setSize(window.innerWidth, window.innerHeight);
            // Specs.orthoCamera.left = window.innerWidth / - 2
            // Specs.orthoCamera.right = window.innerWidth / 2
            // Specs.orthoCamera.top = window.innerHeight / 2
            // Specs.orthoCamera.bottom = window.innerHeight / - 2
            // Specs.orthoCamera.updateProjectionMatrix();
            var aspect = window.innerWidth / window.innerHeight;
            console.log(aspect);
            
            Specs.orthoCamera.left = -window.innerWidth / aspect;
            Specs.orthoCamera.right = window.innerWidth / aspect;
            Specs.orthoCamera.top = window.innerHeight / aspect;
            Specs.orthoCamera.bottom = -window.innerHeight / aspect;
            Specs.orthoCamera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            // this.renderer.render(Specs.scene, Specs.orthoCamera);
            this.renderer.render(Specs.scene, Specs.orthoCamera);

            if (Specs.isSwapPossible) {
                // console.log(Specs.currentBlockClicked);
                // console.log(Specs.nextBlockClicked);
                if (Specs.isSwapped < 2) {
                    Specs.BlockPositionChange.swapBlocks()
                }

                if (Specs.isSwapped == 2) {

                    // Specs.BlockPositionChange.changeVertical()
                    Specs.BlockPositionChange.changeHorizontal()

                    if (Specs.isLineMatchChecked) {
                        Specs.BlockPositionChange.swapBlocksBack()
                    }

                    // console.log(Specs.currentBlockModel.position);
                    // console.log(Specs.nextBlockModel.position);
                }

            }
        }
        render()

        this.cursorMove = (e) => {
            Specs.MouseEvent.cursorMove(e)
        }

        this.leftClick = (e) => {
            Specs.MouseEvent.leftClick(e)
        }

        this.rightClick = (e) => {
            Specs.MouseEvent.rightClick(e)
        }

        document.addEventListener("mousemove", Specs.MouseEvent.cursorMove)
        document.addEventListener("click", Specs.MouseEvent.leftClick)
        document.addEventListener("contextmenu", Specs.MouseEvent.rightClick)
    }

}