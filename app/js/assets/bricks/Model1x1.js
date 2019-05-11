class Model1x1 {
    constructor() {
        this.model = new THREE.Object3D()
        console.log("creating class");

        this.loadModel1x1 = (path, callback) => {
            var loader = new THREE.GLTFLoader();

            console.log("loader assign");

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
                    gltf.scene.children[0].material = Specs.matWYellow
                else {
                    gltf.scene.children[0].material = Specs.matCWhite
                    // gltf.scene.children[0].material = Specs.matAssetDarkRed
                    gltf.scene.children[1].material = Specs.matWYellow
                }

                while (gltf.scene.children.length != 0) {
                    console.log(gltf.scene.children[0]);

                    this.model.add(gltf.scene.children[0])
                }
                // for (let i = 0; i < gltf.scene.children.length; i++)
                //     this.model.add(gltf.scene.children[i])

                this.model.scale.set(100, 100, 100) // scale here

                // scene.add(gltf.scene);
                // this.model.add(this.mesh)

                callback(this.model)
                // callback(gltf.scene)

            },
                (xhr) => xhr,
                (err) => console.error(err));
        }

    }
}