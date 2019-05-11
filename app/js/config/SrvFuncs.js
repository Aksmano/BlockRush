class SrvFuncs {
    constructor() {

    }

    getIndex(response, fs){
        fs.readFile("app/pages/index.html", (error, data) => {
            if (!error) {
                response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                response.write(data);
                response.end();
            }
        })
    }

    getCubes(response, fs){
        fs.readFile("app/pages/cubes.html", (error, data) => {
            if (!error) {
                response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                response.write(data);
                response.end();
            }
        })
    }

    getRest(request, response, fs) {
        

        fs.readFile("app/" + decodeURI(request.url), (error, data) => {
            if (!error && decodeURI(request.url).includes(".html")) {
                response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                response.write(data);
                response.end();
            }

            else if (!error && decodeURI(request.url).includes(".css")) {
                response.writeHead(200, { 'Content-Type': 'text/css;charset=utf-8' })
                response.write(data)
                response.end()
            }
            else if (!error && decodeURI(request.url).includes(".js")) {
                response.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' })
                response.write(data)
                response.end()
            }
            else if (!error && decodeURI(request.url).includes(".jpg")) {
                response.writeHead(200, { 'Content-Type': 'image/jpeg;charset=utf-8' })
                response.write(data)
                response.end()
            }
            else if (!error && decodeURI(request.url).includes(".png")) {
                response.writeHead(200, { 'Content-Type': 'image/png;charset=utf-8' })
                response.write(data)
                response.end()
            }

            else if(!error && decodeURI(request.url).includes(".gltf") || decodeURI(request.url).includes(".glb")){
                response.writeHead(200, { 'Content-Type': 'model/gltf-binary;charset=utf-8' })
                response.write(data)
                response.end()
            }

        })
    }

}

if ('undefined' !== typeof module) {
    module.exports = SrvFuncs;
}