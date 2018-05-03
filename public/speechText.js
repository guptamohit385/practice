 try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
  }
  catch(e) {
    console.error(e);
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