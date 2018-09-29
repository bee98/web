var socket = io('http://localhost:3000');


$(document).ready(function(){
   socket.on('send-pastletter',function (data) {
  // body...
   $("#box").html("");
   data.forEach(function (i) {
     // body...

     $("#box").append("<div class='mess'>"+i+"</div>");
   }); 

  });
    $('button').click(function(){
       socket.emit('hello',$('#mess').val());
       $('#mess').val("");

       	 
            
    });


     socket.on('res',function (data) {
       	
       	
       	$("#box").append("<div class='mess'>"+data+"</div>");
       });
      socket.emit('send-user',$('title').text());

});

