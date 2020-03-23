class Preset {

    constructor() {

        var iRot = 1
        var tRot = 1
        var oRot = 1
        var lRot = 1
        var jRot = 1
        var sRot = 1
        var zRot = 1
        this.scene = new THREE.Scene()

        this.Models3D = new Tetrinimos3D("normic_brick")
        this.Models2D = new Tetrinimos2D("normic_brick")

        this.model = this.Models3D.loadModelZ()
        this.prevItemSign = "Z"

        this.scene.add(this.model)

        this.camera = Specs.camera

        var axes = new THREE.AxesHelper(100)
        this.scene.add(axes)

        var grid = Specs.gridHelper
        this.scene.add(grid)

        this.renderer = new THREE.WebGLRenderer
        var orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement)

        orbitControl.addEventListener('change', () => {
            this.renderer.render(this.scene, this.camera)
        });

        // this.light = Specs.ambientLight
        this.light = Specs.hemiLight
        this.light.position.set(0, 2 * Specs.scale, 0)
        this.scene.add(this.light)

        document.addEventListener("keydown", (e) => {
            if (e.keyCode == 82) {

                this.model.rotation.z += Math.PI / 2
            }
        })

        this.renderer.setClearColor(0x000000) // zamiast # jest 0x
        // renderer.setClearColor(0xffffff) // zamiast # jest 0x
        this.renderer.setSize(window.innerWidth, window.innerHeight) //ustawienie wymiarów renderu okna
        this.renderer.antialias = true
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        $("#root").append(this.renderer.domElement)  // dodanie renderera do diva
        this.camera.position.set(0, 0, 6000) // ustawienie pozycji kamery, mozna tez camera.position.oś = wartość
        this.camera.lookAt(this.scene.position) // nakierowanie kamery na punkt (0,0,0)
        this.camera.fov = 34 // ustalenie domyślnego FOVa
        this.camera.updateProjectionMatrix()
        console.log(this.scene);

        // var model3DAnims = model3D.getModelAnimations()
        const render = () => {
            requestAnimationFrame(render)

            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.render(this.scene, this.camera);

        }
        render()

        console.log("Game class created")

    }

    changeBlock2D(item) {
        this.scene.remove(this.scene.getObjectByName("Model" + this.prevItemSign))
        this.prevItemSign = item
        switch (item) {
            case "I":
                this.model = this.Models2D.loadModelI()
                this.scene.add(this.model)
                break
            case "T":
                this.model = this.Models2D.loadModelT()
                this.scene.add(this.model)
                break
            case "O":
                this.model = this.Models2D.loadModelO()
                this.scene.add(this.model)
                break
            case "L":
                this.model = this.Models2D.loadModelL()
                this.scene.add(this.model)
                break
            case "J":
                this.model = this.Models2D.loadModelJ()
                this.scene.add(this.model)
                break
            case "S":
                this.model = this.Models2D.loadModelS()
                this.scene.add(this.model)
                break
            case "Z":
                this.model = this.Models2D.loadModelZ()
                this.scene.add(this.model)
                break
        }

    }

    changeBlock3D(item) {
        this.scene.remove(this.scene.getObjectByName("Model" + this.prevItemSign))
        this.prevItemSign = item
        switch (item) {
            case "I":
                this.model = this.Models3D.loadModelI()
                this.scene.add(this.model)
                break
            case "T":
                this.model = this.Models3D.loadModelT()
                this.scene.add(this.model)
                break
            case "O":
                this.model = this.Models3D.loadModelO()
                this.scene.add(this.model)
                break
            case "L":
                this.model = this.Models3D.loadModelL()
                this.scene.add(this.model)
                break
            case "J":
                this.model = this.Models3D.loadModelJ()
                this.scene.add(this.model)
                break
            case "S":
                this.model = this.Models3D.loadModelS()
                this.scene.add(this.model)
                break
            case "Z":
                this.model = this.Models3D.loadModelZ()
                this.scene.add(this.model)
                break
        }
    }

}