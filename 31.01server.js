http = require("http");

const hostname = '0.0.0.0';
const port =  8080;

server = http.createServer(
    (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('chua co gi !');
        res.end();
    }
);

server.listen( port, hostname, 
    () => { console.log(' Server running: ',hostname, port ); }
);
