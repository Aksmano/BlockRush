class BRUI {
    constructor() {
        console.log(document.body);
        
        document.getElementById("pff").addEventListener("click", this.playForFun())
        document.getElementById("pfw").addEventListener("click", this.playForWin(document.getElementById("pTime").value, document.getElementById("pPoints").value))
    }

    playForFun(){
        console.log("pff")      
        Specs.timeToEnd = 0
        Specs.pointsToWin = 0 
        document.getElementById("configuration").style.display = "none"
        Specs.isReadyToStart = true
    }

    playForWin(time, points){
        console.log("pfw");
        Specs.timeToEnd = time
        Specs.pointsToWin = points
        document.getElementById("configuration").style.display = "none"
        Specs.isReadyToStart = true
    }
}