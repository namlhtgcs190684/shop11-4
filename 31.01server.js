http = require("http");

const hostname = '0.0.0.0';
const port =  process.env.PORT || 8080;
server.listen( port, hostname, 
    () => { console.log(' Server running: ',hostname, port ); }
);
