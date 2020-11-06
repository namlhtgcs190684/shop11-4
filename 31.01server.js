http = require("http");

const hostname = '0.0.0.0';
const port =  process.env.PORT || 8080;
server = http.createServer(
    (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('chua co gi !');
        res.end();
    }
);
.listen( process.env.PORT || 8080; 
  console.log('Server running at http://0.0.0.0:8080/');
