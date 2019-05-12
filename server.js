var fs = require("fs")
var qs = require("querystring")
var http = require("http")
var SrvFuncs = require("./app/js/config/SrvFuncs.js")
var Srv = new SrvFuncs()
const PORT = 3000

const getReqRes = (req, res) => {
    if (req.url == "/")
        Srv.getHTMLFile(res, fs, "index")
    else if (req.url == "/cubes")
        Srv.getHTMLFile(res, fs, "cubes")
    else if (req.url == "/game")
        Srv.getHTMLFile(res, fs, "game")
    else
        Srv.getRest(req, res, fs)
}

const postReqRes = (req, res) => {
    var allData = ""

    req.on("data", (data) => {
        allData += data
    })

    req.on("end", () => {
        var parsed = qs.parse(allData)
        switch (parsed.action) {

        }
    })
}

var server = http.createServer((req, res) => {
    switch (req.method) {
        case "GET":
            getReqRes(req, res)
        case "POST":
            postReqRes(req, res)
    }
})

server.listen(PORT, () => {
    console.log("Starting server on port " + PORT)
})