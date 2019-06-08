class GameTet {
    constructor(brickType = "normic_brick") {

        this.scene = new THREE.Scene()
        this.camera = Specs.camera
        this.brickType = brickType
        this.Models = new Tetrinimos2D(this.brickType)
        this.Box = new Box()

        

        console.log("Game class created")
    }
}