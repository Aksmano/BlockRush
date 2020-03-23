var fs = require("fs");
var qs = require("querystring");
var http = require("http");
var SrvFuncs = require("./app/js/config/SrvFuncs.js");
var Srv = new SrvFuncs();
const PORT = 3010;
var ip = null;
require("dns").lookup(require("os").hostname(), function(err, add, fam) {
  ip = add;
});

var sessions = [];

// #region tetris w 3d konstrukcja tablicy
// [
// index y => [
// index z  =>  [x, x, x],
//              [x, x, x],
//              [x, x, x],
//            ],
//            [...],
//            [...]
// ]
// #endregion

const getReqRes = (req, res) => {
  // ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  if (req.url == "/") Srv.getHTMLFile(res, fs, "block_rush");
  else if (req.url == "/cubes") Srv.getHTMLFile(res, fs, "cubes");
  else if (req.url == "/game") Srv.getHTMLFile(res, fs, "game");
  else if (req.url == "/tetris2d") Srv.getHTMLFile(res, fs, "tetris2d");
  else if (req.url == "/preset") Srv.getHTMLFile(res, fs, "preset");
  else if (req.url == "/game1") Srv.getHTMLFile(res, fs, "game1");
  else if (req.url == "/br") Srv.getHTMLFile(res, fs, "block_rush");
  else Srv.getRest(req, res, fs);
};

const postReqRes = (req, res) => {
  var allData = "";

  req.on("data", data => {
    allData += data;
  });

  req.on("end", () => {
    var parsed = qs.parse(allData);
    switch (parsed.action) {
    }
  });
};

var server = http.createServer((req, res) => {
  switch (req.method) {
    case "GET":
      getReqRes(req, res);
    case "POST":
      postReqRes(req, res);
  }
});

// server.listen(PORT, ip, () => {
//     console.log("Starting server on port " + PORT)
// })

server.listen(PORT, () => {
  console.log("Starting server on port " + PORT);
});
