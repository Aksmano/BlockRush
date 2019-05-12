class Tetrinimos {
    constructor(file) {
        if (file == undefined) {
            this.path = "../../models/cosmic_brick.gltf"
            this.fileName = "cosmic_brick"
        }
        else {
            this.path = "../../models/" + file + ".gltf"
            this.fileName = file
        }
        console.log("Tetrinimos class created")
    }

    randIndex() {
        return Math.ceil(Math.random() * Specs.matW.length) - 1
    }

    loadModelI() {
        var object = new THREE.Object3D()
        var index = this.randIndex()

        for (let i = 0; i < 2; i++) {
            var model = new Brick(index)
            model.loadBrick(this.path, (modeldata) => {
                console.log("model has been loaded", modeldata)
                modeldata.position.set(0, -Specs.brickDist[this.fileName] * Specs.scale * i - Specs.brickDist[this.fileName] / 2 * Specs.scale, 0)
                object.add(modeldata)
            })
        }

        for (let i = 0; i < 2; i++) {
            var model = new Brick(index)
            model.loadBrick(this.path, (modeldata) => {
                console.log("model has been loaded", modeldata)
                modeldata.position.set(0, Specs.brickDist[this.fileName] * Specs.scale * i + Specs.brickDist[this.fileName] / 2 * Specs.scale, 0)
                object.add(modeldata)
            })
        }
        object.name = "ModelI"
        console.log("Model-I created: ", object);

        return object
    }

    loadModelT() {
        var object = new THREE.Object3D()
        var index = this.randIndex()

        var model = new Brick(index)
        model.loadBrick(this.path, (modeldata) => {
            console.log("model has been loaded", modeldata)
            modeldata.position.set(0, -Specs.brickDist[this.fileName] / 2 * Specs.scale, 0)
            object.add(modeldata)
        })

        for (let i = -1; i < 2; i++) {
            var model = new Brick(index)
            model.loadBrick(this.path, (modeldata) => {
                console.log("model has been loaded", modeldata)
                modeldata.position.set(Specs.brickDist[this.fileName] * Specs.scale * i, Specs.brickDist[this.fileName] / 2 * Specs.scale, 0)
                object.add(modeldata)
            })
        }
        object.name = "ModelT"
        console.log("Model-T created: ", object);

        return object
    }

    loadModelO() {
        var object = new THREE.Object3D()
        var index = this.randIndex()

        for (let i = -1; i < 2; i += 2)
            for (let j = -1; j < 2; j += 2) {
                var model = new Brick(index)
                model.loadBrick(this.path, (modeldata) => {
                    console.log("model has been loaded", modeldata)
                    modeldata.position.set(Specs.brickDist[this.fileName] / 2 * Specs.scale * j, Specs.brickDist[this.fileName] / 2 * Specs.scale * i, 0)
                    object.add(modeldata)
                })
            }

        object.name = "ModelO"
        console.log("Model-O created: ", object);

        return object
    }

    loadModelL() {
        var object = new THREE.Object3D()
        var index = this.randIndex()

        for (let i = -1; i < 2; i++) {
            var model = new Brick(index)
            model.loadBrick(this.path, (modeldata) => {
                console.log("model has been loaded", modeldata)
                modeldata.position.set(0, Specs.brickDist[this.fileName] * Specs.scale * i, 0)
                object.add(modeldata)
            })
        }

        var model = new Brick(index)
        model.loadBrick(this.path, (modeldata) => {
            console.log("model has been loaded", modeldata)
            modeldata.position.set(Specs.brickDist[this.fileName] * Specs.scale, -Specs.brickDist[this.fileName] * Specs.scale, 0)
            object.add(modeldata)
        })

        object.name = "ModelL"
        console.log("Model-L created: ", object);

        return object
    }

    loadModelJ() {
        var object = new THREE.Object3D()
        var index = this.randIndex()

        for (let i = -1; i < 2; i++) {
            var model = new Brick(index)
            model.loadBrick(this.path, (modeldata) => {
                console.log("model has been loaded", modeldata)
                modeldata.position.set(0, Specs.brickDist[this.fileName] * Specs.scale * i, 0)
                object.add(modeldata)
            })
        }

        var model = new Brick(index)
        model.loadBrick(this.path, (modeldata) => {
            console.log("model has been loaded", modeldata)
            modeldata.position.set(-Specs.brickDist[this.fileName] * Specs.scale, -Specs.brickDist[this.fileName] * Specs.scale, 0)
            object.add(modeldata)
        })

        object.name = "ModelJ"
        console.log("Model-J created: ", object);

        return object
    }

    loadModelS() {
        var object = new THREE.Object3D()
        var index = this.randIndex()

        for (let i = -1; i < 1; i++) {
            var model = new Brick(index)
            model.loadBrick(this.path, (modeldata) => {
                console.log("model has been loaded", modeldata)
                modeldata.position.set(Specs.brickDist[this.fileName] * Specs.scale * i, -Specs.brickDist[this.fileName] / 2 * Specs.scale, 0)
                object.add(modeldata)
            })
        }
        for (let i = 0; i < 2; i++) {
            var model = new Brick(index)
            model.loadBrick(this.path, (modeldata) => {
                console.log("model has been loaded", modeldata)
                modeldata.position.set(Specs.brickDist[this.fileName] * Specs.scale * i, Specs.brickDist[this.fileName] / 2 * Specs.scale, 0)
                object.add(modeldata)
            })
        }

        object.name = "ModelS"
        console.log("Model-S created: ", object);

        return object
    }

    loadModelZ() {
        var object = new THREE.Object3D()
        var index = this.randIndex()

        for (let i = -1; i < 1; i++) {
            var model = new Brick(index)
            model.loadBrick(this.path, (modeldata) => {
                console.log("model has been loaded", modeldata)
                modeldata.position.set(Specs.brickDist[this.fileName] * Specs.scale * i, Specs.brickDist[this.fileName] / 2 * Specs.scale, 0)
                object.add(modeldata)
            })
        }
        for (let i = 0; i < 2; i++) {
            var model = new Brick(index)
            model.loadBrick(this.path, (modeldata) => {
                console.log("model has been loaded", modeldata)
                modeldata.position.set(Specs.brickDist[this.fileName] * Specs.scale * i, -Specs.brickDist[this.fileName] / 2 * Specs.scale, 0)
                object.add(modeldata)
            })
        }

        object.name = "ModelZ"
        console.log("Model-Z created: ", object);

        return object
    }
}