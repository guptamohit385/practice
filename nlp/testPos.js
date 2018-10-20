"use strict";

var pos = require('pos');

if(!process.argv[2]){
	console.log("please enter statement - node testPos.js 'what is my name?'");
	process.exit(0);
}
var words = new pos.Lexer().lex(process.argv[2]);
var quesArr = ["WDT","WP$", "WP", "WRB"];
var taggedWords = new pos.Tagger().tag(words);

var ansBank = [
	{
		who: "USER",
		what: "",
		where: "",
		when: "",
		to: "COMP",
		from: "USER",
		relation:{},
		expression: "bye",
		count: 0,
		fact: [],
		relativeSeq: "0",
		ans: "ok, nice talking to you"
	},
	{
		who: "USER",
		what: "",
		where: "",
		when: "",
		to: "COMP",
		from: "USER",
		relation:{},
		expression: "hi",
		count: 0,
		fact: [],
		relativeSeq: "0",
		ans: "hello, My name is ROBOT how r u?"
	},
	{
		who: "USER",
		what: "BEST",
		where: "",
		when: "",
		to: "COMP",
		from: "USER",
		relation:{},
		expression: "",
		count: 0,
		fact: [],
		relativeSeq: "0",
		ans: "mohit is best"
	},
	{
		who: "USER",
		what: "MOHIT",
		where: "",
		when: "",
		to: "USER",
		from: "COMP",
		count: 0,
		relation:{
			a2b: "name"
		},
		fact: [],
		relativeSeq: "0",
		expression: "",
		ans: "your name is mohit"
	},
	{
		who: "COMP",
		what: "ROBOT",
		where: "",
		when: "",
		to: "COMP",
		from: "USER",
		relation:{
			a2b: "name"
		},
		fact: [],
		expression: "",
		count: 0,
		relativeSeq: "0",
		ans: "my name is ROBOT"
	},
	{
		who: "COMP",
		what: "ROBOT",
		where: "banglore",
		when: "2 pm",
		to: "COMP",
		from: "USER",
		relation:{},
		fact: [{
			temprature: "22 degree"
		},{
			location: "banglore"
		}, {
			time: "2:00 PM"
		}],
		expression: "",
		count: 0,
		relativeSeq: "A1",
		ans: "today's temprature is"
	},
	{
		who: "COMP",
		what: "",
		where: "",
		when: "",
		to: "COMP",
		from: "USER",
		relation:{
		},
		fact: [],
		expression: "",
		count: 0,
		relativeSeq: "A2",
		ans: "what is today's plan then?"
	}
];

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
// ques logic (what is name of president of india)
// task logic (play xyz song) (understand api, scrap engine)
// name logic (ROBOT, JARVIS)
// --multi sentance
// auto talk (planning)

console.log(taggedWords.length);

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

   //console.log(formCode);
   
    ans = ansBank.filter(function (item) {
   	if(item.who == formCode.who && item.relation.a2b == formCode.relation.a2b){
   		return true;
   	}
   });
}

if(ans.length){
	console.log(ans[0].ans);	
}
else{
	console.log("I am not able to get you");
}
