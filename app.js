var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginsRouter = require('./routes/logins');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('socketio',io);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginsRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


 
 var obj = {
   table: []
           };
 var json = JSON.stringify(obj);

    io.on('connection', function(socket){
     
           fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
            if (err){
            console.log(err);
           } else {
            obj = JSON.parse(data); 
            socket.emit('send-pastletter',obj.table);
             json = JSON.stringify(obj); //convert it back to json
             fs.writeFile('myjsonfile.json', json, 'utf8',function (err) {
               // body...
               if(err) throw err;
             }); 
           
           }});    
            

           socket.on('send-user',function (data) {
           var x=data;
           socket.on('hello',function (data) {
           var mess= x+":" +data;
           console.log(mess);  
           obj.table.push(mess);
           json = JSON.stringify(obj); 
           fs.writeFile('myjsonfile.json', json, 'utf8',function (err) {
           if(err) throw err;
             // body...
           }); 
           io.sockets.emit('res',mess);    
             });
        //console.log(x);
      });
      });    

module.exports = {app:app, server:server};
