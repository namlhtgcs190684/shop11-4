var express = require('express');
var router = express.Router();
var configHeader = require("../configs/config_Header");
var mongoose = require('mongoose');
var Product = require('../models/product');
var session = require('express-session');
var multer = require('multer');
const { query } = require('express');
var storage = multer.diskStorage({
    destination: function (req, file, xcallback) {
        xcallback(null, 'public/images');
    },
    filename: function (req, file, xcallback) {
        xcallback(null, file.originalname);
    }
});
var uploadStore = multer({ storage: storage });

const dbname = 'toyshop';
const uri = mongodb+srv://toyshop1106:<password>@toyshopcluster.d0kt8.mongodb.net/<dbname>?retryWrites=true&w=majority;

/// --- Code CONTROLLERs
router.use(function timeLog (req, res, next) {
    console.log('\n\t Product controller - Time: ', Date.now());
    next();
})

router.get('/', payment);
function payment(req,res){
    var price = req.query.price;
    res.render("pages/payment", {title: "ATN-Shop Payment USER page", Notify: "",prices:price, configHeader: configHeader , currpage: "Payment" });
}
module.exports = router;
