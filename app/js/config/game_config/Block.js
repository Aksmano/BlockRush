class Block extends THREE.Mesh {
    constructor() {
        super()
        this.geometry = new THREE.BoxGeometry(10, 10, 10);
        this.geometry.translate(0, 0, 15)
        this.MeshBasicMaterialmaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide })
        // this.position.y = 
        // this = new THREE.Mesh(geometry, material)
    }
}