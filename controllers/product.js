var express = require('express');
var router = express.Router();
var session = require('express-session');
var configHeader = require("../configs/config_Header");
var mongoose = require('mongoose');
var Product = require('../models/product');

const dbname = 'toyshop';
const uri = 'mongodb://localhost:27017/' + dbname;

/// --- Code CONTROLLERs
router.use(function timeLog (req, res, next) {
    console.log('\n\t Product controller - Time: ', Date.now());
    next();
})

/// ..................................................
router.post('/', productPage);
    function productPage(req, res) {
        if (session.user) 
            {
                MongoClient.connect(urldb, { useUnifiedTopology: true }, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("toyshop");
                    dbo.collection("product").find({}).toArray(function(err, productlist) {
                      if (err) throw err;
                      
                        res.render("pages/product-list",  {
                            title: "ATN-Shop PRODUCT page", 
                            username: session.user.username,
                            products : productlist 
                            , configHeader: configHeader , currpage: "Product"
                            });
                        console.log('Found:', productlist);
        
                      db.close();
                    });
                  });
                            
            } else {
                res.redirect('/login');
            }    
            console.log("\n\t ... connect PRODUCT from ", req.connection.remoteAddress, req.headers.host);
        } 

/// ..................................................
router.get('/list', listProductPage);
function listProductPage(req, res) {
    res.send('PRODUCT: list PRODUCT page');
}

/// ..................................................
router.get('/create', createProductPage);
function createProductPage(req, res) {
    xproduct = {
        id: "",
        name: "",
        price: 0,
        information: "",
        img: ""
    };
    if (req.query.id) {
        xproduct.id = req.query.id;
    }
    if (req.query.name) {
        xproduct.name = req.query.name;
    }
    if (req.query.price) {
        xproduct.price = req.query.price;
    }
    if (req.query.information) {
        xproduct.information = req.query.information;
    }
    if (req.query.img) {
        xproduct.img = req.query.img;
    }

    console.log(xproduct);

    if (xproduct.id != "") {
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true },
            function(err, dbconnection) {
                if (err) throw handleError(err);
                ///
                console.log('\n\t insert Product: Successfully connected');
        
                ///
                const newproduct = new Product( {
                    _id : new mongoose.Types.ObjectId, 
                    id : xproduct.id,
                    name: xproduct.name,
                    price: xproduct.price,
                    information: xproduct.information,
                    img: xproduct.img
                });
                newproduct.save( function(err) {
                    if (err) throw err;
                    ///
                    console.log('\n\t insert - Product model - Successfully insert');
                } );  
        });
    }

    res.render("pages/product_create", {title: "ATN-Shop create PRODUCT page", Notify: "", configHeader: router.params.configHeader , currpage: "create Product" });
}


/// --- EXports
module.exports = router;