var name = localStorage.getItem("name");
var socket = io.connect('/chatRoom');

var IMG_MIMETYPE = 'images/jpeg'; // Update to image/webp
var IMG_QUALITY = 80; // [0-100]

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

socket.on('stream', function (frames) {
  var imag = document.getElementById("play");
  imag.src = frames;
});

socket.on('image', function (imgBase) {
    var newImage = document.getElementById('loadImg');
    newImage.src = imgBase.baseData;
});

function viewVideo(video, context){
  context.drawImage(video, 0, 0, context.width, context.height);
  //canvas.toDataURL(). 'image/webp'
  socket.emit('stream', canvas.toDataURL('image/webp'));
}

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
};

function sendImg(){
  var btnFile = document.getElementById("imgUpload");
  btnFile.click();
}

function sendVid(){
  var btnFile = document.getElementById("vidUpload");
  btnFile.click();
}

function encodeImageFileAsURL(elmt) {
    var filesSelected = document.getElementById(elmt).files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];

      var fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result; // <--- data: base64
        socket.emit('image', { baseData: srcData });
      }
      fileReader.readAsDataURL(fileToLoad);
    }
}

function captureAndSendTab() {
  var opts = {format: IMG_MIMETYPE, quality: 80};
  chrome.tabs.captureVisibleTab(null, opts, function(dataUrl) {
    // captureVisibleTab returns a dataURL. Decode it -> convert to blob -> send.
    socket.emit('screenShare', {screen : convertDataURIToBlob(dataUrl, IMG_MIMETYPE)});
  });
}

setInterval(function() {
    captureAndSendTab();
}, 250);