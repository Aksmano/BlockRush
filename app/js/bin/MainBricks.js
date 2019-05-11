document.addEventListener("DOMContentLoaded", () => {
    // $(document).ready(() => {
    var scene = new THREE.Scene()

    var camera = Specs.camera

    var axes = new THREE.AxesHelper(100)
    scene.add(axes)

    var grid = Specs.gridHelper
    scene.add(grid)

    var renderer = new THREE.WebGLRenderer
    var orbitControl = new THREE.OrbitControls(camera, renderer.domElement)

    orbitControl.addEventListener('change', function () {
        renderer.render(scene, camera)
    });


    var model1
    var model1x1 = new BrickModel()
    model1x1.loadBrickModel("../../models/cosmic_brick.gltf", (modeldata) => {
        console.log("model has been loaded", modeldata)
        model1 = modeldata
        modeldata.position.set(0, 100, 0)
        scene.add(modeldata) // data to obiekt kontenera zwrócony z Model.js
    })

    var model2
    var model1x2 = new BrickModel()
    model1x2.loadBrickModel("../../models/regular_brick.gltf", (modeldata) => {
        console.log("model has been loaded", modeldata)
        model2 = modeldata
        modeldata.position.set(-300, 100, 0)
        scene.add(modeldata) // data to obiekt kontenera zwrócony z Model.js
    })

    var model3
    var model1x3 = new BrickModel()
    model1x3.loadBrickModel("../../models/normic_brick.gltf", (modeldata) => {
        console.log("model has been loaded", modeldata)
        model3 = modeldata
        modeldata.position.set(300, 100, 0)
        scene.add(modeldata) // data to obiekt kontenera zwrócony z Model.js
    })

    var model4
    var model1x4 = new BrickModel()
    model1x4.loadBrickModel("../../models/cosmic_brick_empty.gltf", (modeldata) => {
        console.log("model has been loaded", modeldata)
        model4 = modeldata
        modeldata.position.set(-600, 100, 0)
        scene.add(modeldata) // data to obiekt kontenera zwrócony z Model.js
    })

    var model5
    var model1x5 = new BrickModel()
    model1x5.loadBrickModel("../../models/cosmic_brick_sharp.gltf", (modeldata) => {
        console.log("model has been loaded", modeldata)
        model5 = modeldata
        modeldata.position.set(600, 100, 0)
        scene.add(modeldata) // data to obiekt kontenera zwrócony z Model.js
    })

    var light = new Light3D()
    light.position.set(-720, 140, 120)
    scene.add(light)
    light = new Light3D()
    light.position.set(-420, 140, 120)
    scene.add(light)
    light = new Light3D()
    light.position.set(-120, 140, 120)
    scene.add(light)
    light = new Light3D()
    light.position.set(180, 140, 120)
    scene.add(light)
    light = new Light3D()
    light.position.set(480, 140, 120)
    scene.add(light)
    light = new Light3D()
    light.position.set(780, 140, 120)
    scene.add(light)

    renderer.setClearColor(0x000000) // zamiast # jest 0x
    // renderer.setClearColor(0xffffff) // zamiast # jest 0x
    renderer.setSize(window.innerWidth, window.innerHeight) //ustawienie wymiarów renderu okna
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    $("#root").append(renderer.domElement)  // dodanie renderera do diva
    camera.position.set(1000, 800, 00) // ustawienie pozycji kamery, mozna tez camera.position.oś = wartość
    camera.lookAt(scene.position) // nakierowanie kamery na punkt (0,0,0)
    camera.fov = 34 // ustalenie domyślnego FOVa
    camera.updateProjectionMatrix()

    // var model3DAnims = model3D.getModelAnimations()
    const render = () => {
        requestAnimationFrame(render)
        if (model1 != undefined)
            model1.rotation.y += 0.05
        if (model2 != undefined)
            model2.rotation.y += 0.05
        if (model3 != undefined)
            model3.rotation.y += 0.05
        if (model4 != undefined)
            model4.rotation.y += 0.05
        if (model5 != undefined)
            model5.rotation.y += 0.05

        Specs.camera.aspect = window.innerWidth / window.innerHeight;
        Specs.camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, Specs.camera);

        renderer.render(scene, camera);

    }
    render()
})