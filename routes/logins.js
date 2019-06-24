var bodyParser = require('body-parser');
var express = require('express');
var router  = express.Router();

 
// create application/json parser
var jsonParser = bodyParser.json();
fs = require('fs');
	var obj = {"users": 
	[]
};
var json = JSON.stringify(obj);
fs.readFile('userjsonfile.json','utf8',function readFileCallback(err,data) {
               if(err) throw err;
               obj = JSON.parse(data);
             });
function search_user(username)
{ 
   var i;
   for(i in obj.users)
   {
   	  if(obj.users[i].name == username)
      return 1;
   }
   return 0;
}
function search_login(username,password)
{
	var i;
   for(i in obj.users)
   {
   	if(obj.users[i].name == username)
      if(obj.users[i].password == password)
      	return 1;
   }
   return 0;
}
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
    
router.post('/',urlencodedParser,function (req,res,next) {
	// body...
	if (!req.body) return res.sendStatus(400);
	
   
	if(req.body.login) 

	{        
                  
         if(!search_login(req.body.user,req.body.password))   res.render('logins',{title:'Login',error:'Fail Information!'});      
			
	
		console.log("login");
	}
	if(req.body.creat) 

	{
		if(search_user(req.body.user))
		res.render('logins',{title:'Login',error:'username exists!'});

        var user = {"name" :""+req.body.user+ "","password":""+req.body.password+""};
	    obj.users.push(user);
	       json = JSON.stringify(obj); 
           fs.writeFile('userjsonfile.json', json, 'utf8',function (err) {
           if(err) throw err;
             // body...
           }); 
		console.log("creat");
	
	}
    res.render('chatbox',{name:req.body.user});
		
});
router.get('/',function(req,res) {
	res.render('logins',{title:'Login',error:''});
});
        
		
module.exports = router;

