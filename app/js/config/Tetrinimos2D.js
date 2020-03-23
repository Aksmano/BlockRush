class Tetrinimos2D {
    constructor(file = "cosmic_brick") {
        this.path = "../../models/" + file + ".gltf"
        this.fileName = file
        console.log("Tetrinimos class created")
    }

    randIndex() {
        return Math.ceil(Math.random() * Specs.matW.length) - 1
    }

    loadModelI() {
        var object = new THREE.Object3D()
        var index = this.randIndex()
        var array = []

        for (let i = -1; i <= 2; i++) {
            var model = new Brick(index)
            model.loadBrick(this.path, (modeldata) => {
                console.log("model has been loaded", modeldata)
                modeldata.position.set(0, Specs.brickDist[this.fileName] * Specs.scale * i - Specs.brickDist[this.fileName] / 2 * Specs.scale, 0)
                object.add(modeldata)
                array.push(modeldata)
            })

        }
        console.log(array);

        object.name = "ModelI"
        console.log("Model-I created: ", object);

        return object
        // return array
    }

    loadModelT() {
        var object = new THREE.Object3D()
        var index = this.randIndex()
        var array = []

        var model = new Brick(index)
        model.loadBrick(this.path, (modeldata) => {
            console.log("model has been loaded", modeldata)
            modeldata.position.set(0, -Specs.brickDist[this.fileName] * Specs.scale, 0)
            object.add(modeldata)
            array.push(modeldata)
        })

        for (let i = -1; i < 2; i++) {
            var model = new Brick(index)
            model.loadBrick(this.path, (modeldata) => {
                console.log("model has been loaded", modeldata)
                modeldata.position.set(Specs.brickDist[this.fileName] * Specs.scale * i, 0, 0)//Specs.brickDist[this.fileName] / 2 * Specs.scale, 0)
                object.add(modeldata)
                array.push(modeldata)
            })
        }
        console.log(array);
        object.name = "ModelT"
        console.log("Model-T created: ", object);

        return object
        // return array
    }

    loadModelO() {
        var object = new THREE.Object3D()
        var index = this.randIndex()
        var array = []

        for (let i = -1; i < 2; i += 2)
            for (let j = -1; j < 2; j += 2) {
                var model = new Brick(index)
                model.loadBrick(this.path, (modeldata) => {
                    console.log("model has been loaded", modeldata)
                    modeldata.position.set(Specs.brickDist[this.fileName] / 2 * Specs.scale * j, Specs.brickDist[this.fileName] / 2 * Specs.scale * i, 0)
                    object.add(modeldata)
                    array.push(modeldata)
                })
            }
        console.log(array);

        object.name = "ModelO"
        console.log("Model-O created: ", object);

        return object
        // return array
    }

    loadModelL() {
        var object = new THREE.Object3D()
        var index = this.randIndex()
        var array = []

        for (let i = -1; i < 2; i++) {
            var model = new Brick(index)
            model.loadBrick(this.path, (modeldata) => {
                console.log("model has been loaded", modeldata)
                modeldata.position.set(0, Specs.brickDist[this.fileName] * Specs.scale * i, 0)
                object.add(modeldata)
                array.push(modeldata)
            })
        }

        var model = new Brick(index)
        model.loadBrick(this.path, (modeldata) => {
            console.log("model has been loaded", modeldata)
            modeldata.position.set(Specs.brickDist[this.fileName] * Specs.scale, -Specs.brickDist[this.fileName] * Specs.scale, 0)
            object.add(modeldata)
            array.push(modeldata)
        })

        console.log(array);
        object.name = "ModelL"
        console.log("Model-L created: ", object);

        return object
        // return array
    }

    loadModelJ() {
        var object = new THREE.Object3D()
        var index = this.randIndex()
        var array = []

        for (let i = -1; i < 2; i++) {
            var model = new Brick(index)
            model.loadBrick(this.path, (modeldata) => {
                console.log("model has been loaded", modeldata)
                modeldata.position.set(0, Specs.brickDist[this.fileName] * Specs.scale * i, 0)
                object.add(modeldata)
                array.push(modeldata)
            })
        }

        var model = new Brick(index)
        model.loadBrick(this.path, (modeldata) => {
            console.log("model has been loaded", modeldata)
            modeldata.position.set(-Specs.brickDist[this.fileName] * Specs.scale, -Specs.brickDist[this.fileName] * Specs.scale, 0)
            object.add(modeldata)
            array.push(modeldata)
        })

        console.log(array);
        object.name = "ModelJ"
        console.log("Model-J created: ", object);

        return object
        // return array
    }

    loadModelS() {
        var object = new THREE.Object3D()
        var index = this.randIndex()
        var array = []

        for (let i = -1; i < 1; i++) {
            var model = new Brick(index)
            model.loadBrick(this.path, (modeldata) => {
                console.log("model has been loaded", modeldata)
                modeldata.position.set(Specs.brickDist[this.fileName] * Specs.scale * i, -Specs.brickDist[this.fileName] * Specs.scale, 0)//-Specs.brickDist[this.fileName] / 2 * Specs.scale, 0)
                object.add(modeldata)
                array.push(modeldata)
            })
        }
        for (let i = 0; i < 2; i++) {
            var model = new Brick(index)
            model.loadBrick(this.path, (modeldata) => {
                console.log("model has been loaded", modeldata)
                modeldata.position.set(Specs.brickDist[this.fileName] * Specs.scale * i, 0, 0)//Specs.brickDist[this.fileName] * Specs.scale, 0)
                object.add(modeldata)
                array.push(modeldata)
            })
        }

        console.log(array);
        object.name = "ModelS"
        console.log("Model-S created: ", object);

        return object
        // return array
    }

    loadModelZ() {
        var object = new THREE.Object3D()
        var index = this.randIndex()
        var array = []

        for (let i = -1; i < 1; i++) {
            var model = new Brick(index)
            model.loadBrick(this.path, (modeldata) => {
                console.log("model has been loaded", modeldata)
                modeldata.position.set(Specs.brickDist[this.fileName] * Specs.scale * i, 0, 0)//Specs.brickDist[this.fileName] / 2 * Specs.scale, 0)
                object.add(modeldata)
                array.push(modeldata)
            })
        }
        for (let i = 0; i < 2; i++) {
            var model = new Brick(index)
            model.loadBrick(this.path, (modeldata) => {
                console.log("model has been loaded", modeldata)
                modeldata.position.set(Specs.brickDist[this.fileName] * Specs.scale * i, -Specs.brickDist[this.fileName] * Specs.scale, 0)
                object.add(modeldata)
                array.push(modeldata)
            })
        }

        console.log(array);
        object.name = "ModelZ"
        console.log("Model-Z created: ", object);

        return object
        // return array
    }
}