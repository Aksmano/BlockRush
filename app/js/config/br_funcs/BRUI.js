class BRUI {
    constructor() {
        console.log(document.body);

        document.getElementById("pff").addEventListener("click", () => { this.playForFun() })
        document.getElementById("pfw").addEventListener("click", () => { this.playForWin(document.getElementById("pTime").value, document.getElementById("pPoints").value) })
    }

    playForFun() {
        console.log("pff")
        Specs.timeToEnd = 0
        Specs.pointsToWin = 0
        document.getElementById("configuration").style.display = "none"
        document.getElementById("timeNumber").innerText = "<3"
        document.getElementById("winpointsNumber").innerText = "<3"
        Specs.isReadyToStart = true
        Specs.isReadyToClick = true
    }

    playForWin(time, points) {
        console.log("pfw");
        Specs.timeToEnd = time
        Specs.pointsToWin = points
        document.getElementById("configuration").style.display = "none"
        document.getElementById("timeNumber").innerText = time
        document.getElementById("winpointsNumber").innerText = points
        Specs.isReadyToStart = true
        Specs.isReadyToClick = true
        Specs.isForWin = true
    }
}