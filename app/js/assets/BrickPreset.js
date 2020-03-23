class BrickModel {
    constructor() {
        this.model = new THREE.Object3D()
        console.log("creating class");

        this.loadBrickModel = (path, callback) => {
            var loader = new THREE.GLTFLoader();

            console.log("loader assign");

            loader.load(path, (gltf) => {
                console.log(gltf);

                gltf.scene.traverse((child) => {
                    // console.log(child);

                    if (child.isMesh) {
                        // console.log(child);

                        // this.model.add(child)
                        // child.geometry.center(); // center here
                    }

                });

                var rand = Math.ceil(Math.random() * 6) - 1
                if (gltf.scene.children.length == 1)
                    gltf.scene.children[0].material = Specs.matW[rand]
                else {
                    gltf.scene.children[0].material = Specs.matC[rand]
                    // gltf.scene.children[0].material = Specs.matWRed
                    gltf.scene.children[1].material = Specs.matW[rand]
                }
                while (gltf.scene.children.length != 0) {
                    console.log(gltf.scene.children[0]);
                    this.model.add(gltf.scene.children[0])


                }
                // for (let i = 0; i < gltf.scene.children.length; i++)
                //     this.model.add(gltf.scene.children[i])
                var light = new Light3D()
                light.scale.set(1 / Specs.scale, 1 / Specs.scale, 1 / Specs.scale)
                light.position.set(150 / Specs.scale, 170 / Specs.scale, 150 / Specs.scale)
                this.model.add(light)
                this.model.scale.set(Specs.scale, Specs.scale, Specs.scale) // scale here



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