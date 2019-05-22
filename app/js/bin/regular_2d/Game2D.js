class Tetris2D {

    constructor(brickType = "normic_brick") {

        this.counter = 0
        this.board = Specs.tetris2D
        this.brickType = brickType
        this.scene = new THREE.Scene()
        this.Models = new Tetrinimos2D(this.brickType)
        this.camera = Specs.orthoCamera
        this.heightControl = 0
        this.blocksPosition = []
        this.isOk = 0

        this.rotI = 0

        this.Tetri_I = new Tetri_I()

        this.model = null
        // this.model.position.y = Specs.brickDist[this.brickType] * Specs.scale * 20
        // this.scene.add(this.model)

        // dodanie listenerow strzalek
        document.addEventListener("keydown", (e) => {

            // lewa
            if (e.keyCode == 37) {
                var flag = true
                for (let i = 1; i < 21; i++)
                    if (this.board[i][1] == 1)
                        flag = false
                if (this.heightControl == 1)
                    if (this.rotI == 1) {
                        var arr = this.Tetri_I.moveToSideHoriz(this.board, -1)
                        this.board = arr[0]
                        flag = arr[1]
                    }
                    else if (this.rotI == 0) {
                        var arr = this.Tetri_I.moveToSideVert(this.board, -1)
                        this.board = arr[0]
                        flag = arr[1]
                    }
                if (flag)
                    this.model.position.x -= Specs.brickDist[this.brickType] * Specs.scale
            }

            // prawa
            else if (e.keyCode == 39) {
                var flag = true
                for (let i = 1; i < 21; i++)
                    if (this.board[i][10] == 1)
                        flag = false
                if (this.heightControl == 1)
                    if (this.rotI == 1) {
                        var arr = this.Tetri_I.moveToSideHoriz(this.board, 1)
                        this.board = arr[0]
                        flag = arr[1]
                    }
                    else if (this.rotI == 0) {
                        var arr = this.Tetri_I.moveToSideVert(this.board, 1)
                        this.board = arr[0]
                        flag = arr[1]
                    }
                if (flag)
                    this.model.position.x += Specs.brickDist[this.brickType] * Specs.scale
            }


            // dół
            else if (e.keyCode == 40) {
                if ([2, 4, 5, 6, 7].includes(this.heightControl))
                    this.model.position.y = Specs.brickDist[this.brickType] * Specs.scale * 1.5

                else if (this.heightControl == 1) {
                    if (this.rotI == 0) {
                        for (let i = this.board.length - 2; i > 0; i--) {
                            if (this.model != null)
                                this.model.position.y -= Specs.brickDist[this.brickType] * Specs.scale
                            var arr = this.Tetri_I.positionVert(this.board, this.model)
                            this.board = arr[0]
                            this.model = arr[1]
                            if (this.model == null) {
                                break
                            }
                        }
                        for (let i = 1; i < 21; i++)
                            if (this.board[i].includes(1)) {
                                cont = false
                            }
                    }
                    else if (this.rotI == 1) {
                        for (let i = this.board.length - 2; i > 0; i--) {
                            if (this.model != null)
                                this.model.position.y -= Specs.brickDist[this.brickType] * Specs.scale
                            var arr = this.Tetri_I.positionHoriz(this.board, this.model)
                            this.board = arr[0]
                            this.model = arr[1]
                            if (this.model == null) {
                                this.rotI = 0
                                break
                            }
                        }


                        // for (let j = 1; i < this.board[i].length - 1; j++) {
                        //     if (this.board[i][j] == 1) {
                        //         if (this.board[i + 1][j] == 9 || this.board[i + 1][j] == 2) {
                        //             flag = true
                        //         }
                        //     }
                        // }
                        // if (flag)
                        //     break

                    }
                }
                else if (this.heightControl == 3)
                    this.model.position.y = Specs.brickDist[this.brickType] * Specs.scale


            }

            // rotacja obiektu pod "r"
            else if (e.keyCode == 82) {
                this.model.rotation.z += Math.PI / 2

                // rotacja do poziomu
                if (this.heightControl = 1)
                    if (this.rotI == 0) {
                        this.rotI = 1
                        this.model.position.y += Specs.brickDist[this.brickType] * Specs.scale * 0.5
                        this.model.position.x += Specs.brickDist[this.brickType] * Specs.scale * 0.5
                        var arr = this.Tetri_I.rotateToHoriz(this.board)
                        this.board = arr[0]
                        var flag = arr[1]

                        // sprawdzanie kolizjii w srodku
                        if (!flag) {
                            this.model.rotation.z -= Math.PI / 2
                            this.model.position.y -= Specs.brickDist[this.brickType] * Specs.scale * 0.5
                            this.model.position.x -= Specs.brickDist[this.brickType] * Specs.scale * 0.5
                            this.rotI = 0
                        }
                        for (let i = 0; i < 21; i++) {
                            if (this.board[i][1] == 1)
                                this.model.position.x += Specs.brickDist[this.brickType] * Specs.scale
                            if (this.board[i][10] == 1)
                                this.model.position.x = Specs.brickDist[this.brickType] * Specs.scale * 3
                        }
                        console.log(JSON.stringify(this.board, "/n", ""))
                    }

                    // rotacja do pionu
                    else if (this.rotI == 1) {
                        this.rotI = 0
                        this.model.position.y -= Specs.brickDist[this.brickType] * Specs.scale * 0.5
                        this.model.position.x -= Specs.brickDist[this.brickType] * Specs.scale * 0.5
                        this.board = this.Tetri_I.rotateToVert(this.board)
                        // for (let i = 0; i < 21; i++) {
                        //     if (this.board[i][10] == 1)
                        //         this.model.position.x = Specs.brickDist[this.brickType] * Specs.scale * 0.5
                        // }
                        if (this.model.position.y < Specs.brickDist[this.brickType] * Specs.scale * 2)
                            this.model.position.y = Specs.brickDist[this.brickType] * Specs.scale * 2
                        console.log(JSON.stringify(this.board, "/n", ""))
                    }
            }
        })

        // for(let i = 0; i < 4; i++)
        //     this.scene.add(this.model[0])


        var axes = new THREE.AxesHelper(100)
        this.scene.add(axes)

        var grid = Specs.gridHelper
        this.scene.add(grid)

        this.renderer = new THREE.WebGLRenderer
        // var orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement)

        // orbitControl.addEventListener('change', () => {
        //     this.renderer.render(this.scene, this.camera)
        // });

        // this.light = Specs.ambientLight
        this.light = Specs.hemiLight
        this.light.position.set(0, 2 * Specs.scale, 0)
        this.scene.add(this.light)

        this.renderer.setClearColor(0x000000) // zamiast # jest 0x
        // renderer.setClearColor(0xffffff) // zamiast # jest 0x
        this.renderer.setSize(window.innerWidth, window.innerHeight) //ustawienie wymiarów renderu okna
        this.renderer.antialias = true
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        $("#root").append(this.renderer.domElement)  // dodanie renderera do diva
        this.camera.position.set(0, 0, 6000) // ustawienie pozycji kamery, mozna tez camera.position.oś = wartość
        this.camera.lookAt(this.scene.position) // nakierowanie kamery na punkt (0,0,0)
        this.camera.position.y = 425
        this.camera.fov = 34 // ustalenie domyślnego FOVa
        this.camera.updateProjectionMatrix()

        // var model3DAnims = model3D.getModelAnimations()
        const render = () => {
            requestAnimationFrame(render)
            this.counter++
            if (this.counter == Specs.gameSpeed) {

                // opuszczanie obiektu
                if (this.model != undefined || this.model != null) {
                    this.model.position.y -= Specs.brickDist[this.brickType] * Specs.scale
                    if (this.model.position.y < Specs.brickDist[this.brickType] * Specs.scale * 2 && this.rotI == 0)
                        this.model.position.y = Specs.brickDist[this.brickType] * Specs.scale * 2
                }
                this.isOk = 0
                // zmiana numerkow w tablicy
                if (this.model != undefined || this.model != null) {
                    switch (this.model.name[5]) {
                            case "I":
                                if (this.rotI == 0) {
                                    var arr = this.Tetri_I.positionVert(this.board, this.model)
                                    this.board = arr[0]
                                    this.model = arr[1]
                                    if (this.model == null)
                                        this.rotI = 0
                                    console.log(JSON.stringify(this.board, "/n", ""))
                                }
                                else if (this.rotI == 1) {
                                    var arr = this.Tetri_I.positionHoriz(this.board, this.model)
                                    this.board = arr[0]
                                    this.model = arr[1]
                                    if (this.model == null)
                                        this.rotI = 0
                                    console.log(JSON.stringify(this.board, "/n", ""))
                                }
                                break
                        }
                }

                // wybór modelu na podstawie randa
                if (this.model == null) {
                    // || this.model.position.y <= Specs.brickDist[this.brickType] * Specs.scale * 1.5 && [2, 4, 5, 6, 7].includes(this.heightControl)
                    // || this.model.position.y <= Specs.brickDist[this.brickType] * Specs.scale * 2 && this.heightControl == 1
                    // || this.model.position.y <= Specs.brickDist[this.brickType] * Specs.scale && this.heightControl == 3) {

                    // var rand = Math.ceil(Math.random() * 7)
                    var rand = 1
                    if (this.model != undefined || this.model != null)
                        this.model.position.y += Specs.brickDist[this.brickType] * Specs.scale
                    switch (rand) {
                        case 1:
                            this.model = this.Models.loadModelI()
                            this.setBlockPosition(19, rand)
                            console.log(this.model);

                            for (let i = 1; i <= 4; i++)
                                this.board[i][6] = 1;

                            console.log(JSON.stringify(this.board, "/n", ""))
                            break
                        case 2:
                            this.model = this.Models.loadModelT()
                            this.setBlockPosition(20.5, rand)
                            break
                        case 3:
                            this.model = this.Models.loadModelO()
                            this.setBlockPosition(20, rand)
                            break
                        case 4:
                            this.model = this.Models.loadModelL()
                            this.setBlockPosition(19.5, rand)
                            break
                        case 5:
                            this.model = this.Models.loadModelJ()
                            this.setBlockPosition(19.5, rand)
                            break
                        case 6:
                            this.model = this.Models.loadModelS()
                            this.setBlockPosition(20.5, rand)
                            break
                        case 7:
                            this.model = this.Models.loadModelZ()
                            this.setBlockPosition(20.5, rand)
                            break
                    }
                }


                this.counter = 0
            }
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.render(this.scene, this.camera);

        }
        render()

        console.log("Game class created")

    }

    setBlockPosition(posit, id) {
        this.model.position.y = Specs.brickDist[this.brickType] * Specs.scale * posit
        if (id == 3) this.model.position.x = Specs.brickDist[this.brickType] * Specs.scale
        else this.model.position.x = Specs.brickDist[this.brickType] * Specs.scale * 0.5
        this.scene.add(this.model)
        this.heightControl = id
    }

    logBoard() {

        for (let i = 0; i < this.board.length; i++) {

        }
    }

}