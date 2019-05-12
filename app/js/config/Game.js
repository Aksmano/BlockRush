class Game {

    constructor() {

        this.scene = new THREE.Scene()

        var Models = new Tetrinimos()
        
        this.scene.add(Models.loadModelZ())

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

        this.light = Specs.hemiLight
        this.light.position.set(0, 2 * Specs.scale, 0)
        this.scene.add(this.light)

        this.renderer.setClearColor(0x000000) // zamiast # jest 0x
        // renderer.setClearColor(0xffffff) // zamiast # jest 0x
        this.renderer.setSize(window.innerWidth, window.innerHeight) //ustawienie wymiarów renderu okna
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        $("#root").append(this.renderer.domElement)  // dodanie renderera do diva
        this.camera.position.set(0, 0, 6000) // ustawienie pozycji kamery, mozna tez camera.position.oś = wartość
        this.camera.lookAt(this.scene.position) // nakierowanie kamery na punkt (0,0,0)
        this.camera.fov = 34 // ustalenie domyślnego FOVa
        this.camera.updateProjectionMatrix()

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

}