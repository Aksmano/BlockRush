class Brick {
    constructor(matIndex) {

        if (matIndex != undefined)
            matIndex = matIndex
        else
            matIndex = Math.ceil(Math.random() * 6) - 1
        this.model = new THREE.Object3D()

        this.loadBrick = (path, callback) => {
            var loader = new THREE.GLTFLoader();

            loader.load(path, (gltf) => {
                console.log(gltf);

                gltf.scene.traverse((child) => {
                    // console.log(child);

                    if (child.isMesh) {
                        // console.log(child);

                        // this.model.add(child)
                        child.geometry.center(); // center here
                    }

                });
                if (gltf.scene.children.length == 1)
                    gltf.scene.children[0].material = Specs.matW[matIndex]
                else {
                    gltf.scene.children[0].material = Specs.matC[matIndex]
                    gltf.scene.children[1].material = Specs.matW[matIndex]
                }

                while (gltf.scene.children.length != 0) {
                    // console.log(gltf.scene.children[0]);
                    this.model.add(gltf.scene.children[0])
                }

                const animate = () => {
                    requestAnimationFrame(animate)
                    this.model.rotation.y += 0.05
                }
                // animate()
                this.model.name = "Brick"
                this.model.scale.set(Specs.scale, Specs.scale, Specs.scale) // scale here

                callback(this.model)

            },
                (xhr) => xhr,
                (err) => console.error(err));
        }
        console.log("brick class created");

    }
}