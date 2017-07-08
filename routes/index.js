var express = require('express');
var router = express.Router();
var app=express();
var cont =require('../controllers/customercontroller');
var bodyParser = require('body-parser');
// Get Homepage
router.get('/', function(req, res){
	res.render('index');
});
router.post('/reg',function(req,res){
	cont.reguser(req,res);
});
module.exports = router;