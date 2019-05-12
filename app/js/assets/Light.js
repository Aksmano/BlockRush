class Light3D extends THREE.Object3D {
    constructor() {
        super()
        this.init()
        console.log("Light3D class created")        
    }

    init() {
        this.light = new THREE.PointLight(0xffffff, 3, 800)
        this.light.castShadow = true;
        this.light.shadow.mapSize.width = 1024;  // default
        this.light.shadow.mapSize.height = 1024; // default
        this.light.shadow.camera.near = 0.5;       // default
        this.light.shadow.camera.far = 500
        this.light.penumbra = 0.5
        // this.light.shadow.camera.fov = 5000
        this.name = "Light3D"
        // // var helper = new THREE.CameraHelper(this.light.shadow.camera);
        // this.light.add(helper)
        this.add(this.light)

        this.octahedron = new THREE.Mesh(Specs.octaGeo, Specs.octaMat)
        this.add(this.octahedron)
        
    }
}