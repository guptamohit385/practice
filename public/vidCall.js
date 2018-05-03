
var video = document.getElementById('strVid');
var canvas = document.getElementById('pview');
var venderURL = window.URL || window.webkitURL;

navigator.getMedia =  navigator.getUserMedia ||
                      navigator.webkitGetUserMedia || 
                      navigator.mozGetUserMedia || 
                      navigator.msGetUserMedia;

window.requestAnimFrame = (function(callback){
      return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback){
        window.setTimeout(callback, 1000 / 100);
      };
    })();

var context = canvas.getContext('2d');

context.width = canvas.width = 300;
context.height = canvas.height = 200;

function videoCall(){
  navigator.getMedia({video: true, audio: false}, loadCam, loadFail);
}

function loadCam(stream){
  video.src = venderURL.createObjectURL(stream);
}

function loadFail(){
  alert("cam load fail");
}

setInterval(function(){
  viewVideo(video, context);
}, 50);


