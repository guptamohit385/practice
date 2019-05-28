"use strict";

var pos = require('pos');
let dataBank = require('../data');

if(!process.argv[2]){
	console.log("please enter statement - node nlp/testPos.js 'what is my name?'");
	process.exit(0);
}
var words = new pos.Lexer().lex(process.argv[2]);
var quesArr = ["WDT","WP$", "WP", "WRB"];
var taggedWords = new pos.Tagger().tag(words);

var ansBank = dataBank

var formCode = {
	who: "",
	what: "",
	where: "",
	when: "",
	to: "",
	from: "",
	relation:{
		a2b: ""
	}
};

// dictionary check (did you mean)
// word count logic
// name logic (ROBOT, JARVIS)
// ques logic (what is name of president of india)
// task logic (play xyz song) (understand api, scrap engine)
// --multi sentance
// auto talk (planning)

//console.log(taggedWords.length);

if(taggedWords.length > 0 && taggedWords.length < 2){
	//- hi, hello, bye, yes, no, ok, sorry, thanks
	console.log(taggedWords.length);
}

var ans;
for (var i in taggedWords) {
    var taggedWord = taggedWords[i];
    var word = taggedWord[0];
    var tag = taggedWord[1];
    console.log(word + " /" + tag);
    if(quesArr.includes(tag)){
    	if(tag == "WDT"){

    	} else if(tag =="WP$"){

    	} else if(tag == "WP"){

    	} else if(tag == "WRB"){
    	
    	}
    }

    if((tag == "PRP$" || tag == "PRP") && (word == "your" || word == "yours" || word == "you")){
    	formCode.who = "COMP";
    }

    if((tag == "PRP$"|| tag == "PRP") && (word == "my" || word == "I" || word == "mine")){
    	formCode.who = "USER";
    }

    if(tag == "NN"){
    	formCode.relation = {a2b: word}
    }
   
    ans = ansBank.filter(function (item) {
   	if(item.who == formCode.who && item.relation.a2b == formCode.relation.a2b){
   		return true;
   	}
   });
}

console.log(formCode);

if(ans.length){
	console.log(ans[0].ans);	
}
else{
	console.log("I am not able to get you");
}
