///----------------------------------------------------
/// npm  install express --save

const express = require("express")
const app = express();
const PORT = 8080;

///----------------------------------------------------
app.get( '/', indexPage );
function indexPage(req, res) {
    res.send("Home Page !");
}

///----------------------------------------------------
app.get( '/quit',  quitPage );
function quitPage(req, res) {
    res.send("shutdown SERVER ! Good Bye !");
    console.log("EXIT - Good Bye !");
    process.exit(0);
}

///----------------------------------------------------
app.listen( PORT, 
    () => { console.log('Server RUNNING - %d', PORT); }
    );
