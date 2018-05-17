var pos = require('pos');
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
		ans: "ok, nice talking to you?"
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
		ans: "hello, My name is ROBOT how are you?"
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
		ans: "mohit is best"
	},
	{
		who: "USER",
		what: "MOHIT",
		where: "",
		when: "",
		to: "USER",
		from: "COMP",
		relation:{
			a2b: "name"
		},
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
		expression: "",
		ans: "my name is ROBOT"
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
var ans;
for (i in taggedWords) {
    var taggedWord = taggedWords[i];
    var word = taggedWord[0];
    var tag = taggedWord[1];
    //console.log(word + " /" + tag);
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

    if(tag == "PRP$" && (word == "my" || word == "I")){
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
