var bodyParser = require('body-parser');
var express = require('express');
var router  = express.Router();
// create application/json parser
var jsonParser = bodyParser.json();
fs = require('fs');
var obj = {table: []};
 var json = JSON.stringify(obj);

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
    
router.post('/',urlencodedParser,function (req,res,next) {
	// body...
	if (!req.body) return res.sendStatus(400);

	if(req.body.login) console.log("login");
	
	if(req.body.creat) console.log("creat");
	
	/*if( req.body.user !== 'admin' && req.body.password !== 'admin' ) 
	{
		res.render('logins',{title:'Login',error:'False information'});
		
		
	} else */
	{
		
		res.render('chatbox',{name:req.body.user});
		
	}
});
router.get('/',function(req,res) {
	res.render('logins',{title:'Login',error:''});
});
        
		
module.exports = router;

