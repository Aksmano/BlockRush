class MouseEvents {
    constructor() {

    }

    leftClick(e) {
        Specs.mouseVector.x = (e.clientX / $(window).width()) * 2 - 1;
        Specs.mouseVector.y = -(e.clientY / $(window).height()) * 2 + 1;
        Specs.raycaster.setFromCamera(Specs.mouseVector, Specs.orthoCamera);
        var intersects = Specs.raycaster.intersectObjects(Specs.scene.children, true);

        console.log(intersects.length)
        if (intersects.length > 0) {
            if (!Specs.isBlockClicked) {
                // console.log(intersects[0].object.parent.children[0].material)                    
                console.log(intersects[0].object)
                Specs.currentBlockModel = intersects[0].object.parent
                Specs.currentBlockPosition = intersects[0].object.parent.position
                Specs.isBlockClicked = true
                intersects[0].object.parent.children[0].material = Specs.matCWhite
                document.body.style.cursor = "default"
            }
            else if (Specs.isBlockClicked && Specs.currentBlockModel != intersects[0].object) {
                // console.log("you clicked that block", Specs.currentBlockModel)
                Specs.nextBlockModel = intersects[0].object.parent
                Specs.nextBlockPosition = intersects[0].object.parent.position
                Specs.currentBlockClicked = new THREE.Vector3(Specs.currentBlockPosition.x, Specs.currentBlockPosition.y, 0)
                Specs.nextBlockClicked = new THREE.Vector3(Specs.nextBlockPosition.x, Specs.nextBlockPosition.y, 0)
                Specs.currentDirectionVect = Specs.nextBlockClicked.clone().sub(Specs.currentBlockClicked).normalize()
                Specs.nextDirectionVect = Specs.currentBlockClicked.clone().sub(Specs.nextBlockClicked).normalize()
                if (Specs.nextBlockModel.position.clone().distanceTo(Specs.currentBlockClicked) < 105) {

                    console.log(Specs.BRBoard[9 - Specs.currentBlockPosition.y / (Specs.scale * 2)][Specs.currentBlockPosition.x / (Specs.scale * 2)]);
                    console.log(9 - Specs.currentBlockPosition.y / (Specs.scale * 2), Specs.currentBlockPosition.x / (Specs.scale * 2));
                    console.log(Specs.BRBoard[9 - Specs.nextBlockPosition.y / (Specs.scale * 2)][Specs.nextBlockPosition.x / (Specs.scale * 2)]);
                    console.log(9 - Specs.nextBlockPosition.y / (Specs.scale * 2), Specs.nextBlockPosition.x / (Specs.scale * 2));
                    console.log(Specs.currentBlockModel.position);
                    console.log(Specs.nextBlockModel.position);

                    var swap = Specs.getBRBoardPosition(Specs.currentBlockPosition)
                    Specs.BRBoard[9 - Specs.currentBlockPosition.y / (Specs.scale * 2)][Specs.currentBlockPosition.x / (Specs.scale * 2)] = Specs.getBRBoardPosition(Specs.nextBlockPosition)
                    Specs.BRBoard[9 - Specs.nextBlockPosition.y / (Specs.scale * 2)][Specs.nextBlockPosition.x / (Specs.scale * 2)] = swap
                    Specs.isBlockClicked = false
                    Specs.isSwapPossible = true
                    Specs.currentBlockModel.children[0].material = Specs.matCDark
                    Specs.nextBlockModel.children[0].material = Specs.matCDark

                    document.body.style.cursor = "default"
                    document.removeEventListener("click", this.leftClick)
                    document.removeEventListener("mousemove", this.cursorMove)
                    document.removeEventListener("contextmenu", this.rightClick)
                    console.log(Specs.nextBlockModel.position.clone().distanceTo(Specs.currentBlockClicked))
                    console.log(Specs.currentBlockModel.position.clone().distanceTo(Specs.nextBlockClicked))

                }

            }
        }
    }

    rightClick(e) {
        e.preventDefault()
        try { Specs.currentBlockModel.parent.children[0].material = Specs.matCDark }
        catch{ console.log("currentBlockModel == null"); }

        try { Specs.pointedBlockModel.material = Specs.matCDark }
        catch{ console.log("pointedBlockModel == null"); }


        Specs.isBlockClicked = false
    }

    cursorMove(e) {
        Specs.mouseVector.x = (e.clientX / $(window).width()) * 2 - 1;
        Specs.mouseVector.y = -(e.clientY / $(window).height()) * 2 + 1;
        Specs.raycaster.setFromCamera(Specs.mouseVector, Specs.orthoCamera);
        var intersects = Specs.raycaster.intersectObjects(Specs.scene.children, true);

        if ((intersects.length <= 0 && !Specs.isBlockClicked)
            || (intersects.length <= 0 && Specs.isBlockClicked && Specs.pointedBlockModel.parent.children[0].material.color.r != 1)) {
            if (Specs.pointedBlockModel != null)
                if (!Specs.isBlockClicked)
                    for (let i = 2; i < Specs.scene.children.length; i++)
                        Specs.scene.children[i].children[0].material = Specs.matCDark
                else if (Specs.isBlockClicked)
                    for (let i = 2; i < Specs.scene.children.length; i++)
                        if (Specs.scene.children[i] != Specs.currentBlockModel)
                            Specs.scene.children[i].children[0].material = Specs.matCDark
            document.body.style.cursor = "default"
        }
        else if (!Specs.isBlockClicked) {
            Specs.pointedBlockModel = intersects[0].object.parent.children[0]
            Specs.pointedBlockModel.material = Specs.matCGray
            document.body.style.cursor = "pointer"
        }
        else if (Specs.isBlockClicked && intersects.length > 0 && Specs.currentBlockModel != intersects[0].object.parent) {
            Specs.pointedBlockModel = intersects[0].object.parent.children[0]
            Specs.pointedBlockModel.material = Specs.matCLightBlue
            document.body.style.cursor = "pointer"
        }
    }
}