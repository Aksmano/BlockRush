class Box extends THREE.Object3D {
    constructor() {
        super()
        this.init()
    }
    init() {
        var geometry = new THREE.BoxGeometry(Specs.scale * 10, Specs.scale * 10, 1);
        // geometry.translate(0, 0, 15)
        var material = new THREE.MeshNormalMaterial({
            color: 0x8888ff,
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: true,
        })
        this.wall = new THREE.Mesh(geometry, material)
        var przesun = -Specs.scale * 5
        for (var i = 0; i < 4; i++) {
            var newWall = this.wall.clone()
            if (i % 2 == 0) {
                newWall.rotation.y = Math.PI / 2
                newWall.position.x = przesun
            }
            else if (i % 2 == 1) {

                newWall.position.z = przesun
            }
            if (i == 1) przesun = Specs.scale * 5
            this.add(newWall)
        }
        var grid = new THREE.GridHelper(1000, 20)
        grid.position.y = -Specs.scale * 5
        grid.rotation.x = Math.PI / 2
        this.wall.add(grid)
        this.wall.rotation.x = Math.PI / 2
        this.wall.position.y = -Specs.scale * 5

        this.add(this.wall)
        // var newWall = this.wall.clone()
        // newWall.rotation.z = Math.PI / 2
        // newWall.position.y = (-Specs.scale * 5) + 10
        // this.add(newWall)
        // this.geometry.translate(0, 0, 15)
    }
}