var name = localStorage.getItem("name");
var socket = io.connect('/chatRoom');

 try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
  }
  catch(e) {
    console.error(e);
  }

var canvas = document.getElementById('priview');
var context = canvas.getContext('2d');
var vedio = document.getElementById('strVid');
var venderURL = window.URL || window.webkitURL;

navigator.getUserMedia = (navigator.getUserMedia ||
 navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

if(navigator.getUserMedia){
  navigator.getUserMedia({video: true, audio: false}, loadCam, loadFail);
}

recognition.onstart = function() { 
  
  console.log('Voice recognition activated. Try speaking into the microphone.');
}

recognition.onspeechend = function() {

  console.log('You were quiet for a while so voice recognition turned itself off.');
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    console.log('No speech was detected. Try again.');  
  };
}

var noteContent = "";
recognition.onresult = function(event) {
  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;

  // Add the current transcript to the contents of our Note.
  noteContent += transcript;
  var inputData = document.getElementById("btn-input").value;
  inputData += noteContent;
  document.getElementById("btn-input").value = inputData;
  noteContent="";
}

socket.emit('handshake', { user: name });

socket.on('userAct', function (data) {

	document.getElementById("logStatus").innerHTML = data.data + " and online users : " + data.counter;
});

socket.on('msg', function (data) {

	$("#chatPool").append(recievedByMe(data.username, data.msg));
	document.getElementById("btn-input").value = "";
		var objDiv = document.getElementById("panel-body");
		objDiv.scrollTop = objDiv.scrollHeight;
});

function sendMsg(){

	var message = document.getElementById("btn-input").value;
	if(!message){
		alert("enter msg !!");
	}else{
		$("#chatPool").append(sentToMe(message))
		var objDiv = document.getElementById("panel-body");
		objDiv.scrollTop = objDiv.scrollHeight;
		document.getElementById("btn-input").value = "";
		socket.emit('message', { name: name, msg: message});
	}
};

function sentToMe(msg){
	return '<li class="right clearfix"><span class="chat-img pull-right">' +
               '<img src="/text_me.png" alt="User Avatar" class="img-circle" />' +
                  '</span>'+
                    '<div class="chat-body clearfix">'+
                      '<div class="header">'+
                         '<small class=" text-muted">few mins ago</small>'+
                            '<strong class="pull-right primary-font">Me</strong>'+
                       '</div>'+
                          '<p>' + msg + '</p>'+
                     '</div>'+
             '</li>';
}

function recievedByMe(user, msg){
	return '<li class="left clearfix"><span class="chat-img pull-left">'+
                 '<img src="/text_u.png" alt="User Avatar" class="img-circle" />'+
                      '</span>'+
                       '<div class="chat-body clearfix">'+
                          '<div class="header">'+
                            '<strong class="primary-font">'+ user + '</strong> <small class="pull-right text-muted">'+
                               'few mins ago</small>'+
                           '</div>'+
                                '<p>' + msg + '</p>'+
                        '</div>'+
            '</li>';
}

function audioToText(){
  recognition.start();

  setTimeout(function(){
    recognition.stop();
  }, 30000)
}

context.width = canvas.width = 800;
context.height = canvas.height = 600;

function vedioCall(){
  viewVideo(vedio, context);
}

function loadCam(stream){
  vedio.src = venderURL.createObjectURL(stream);
  vedio.play();
  alert("cam loaded");
}

function loadFail(){
  alert("cam load fail");
}

function viewVideo(vedio, context){
  context.drawImage(vedio, 0, 0, context.width, context.height);
  socket.emit('stream', canvas.toDataURL('image/webp'));
}

