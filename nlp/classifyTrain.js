var natural = require('natural');
var classifier = new natural.BayesClassifier();


classifier.addDocument('play atif songs', 'play');
classifier.addDocument('play rafeek songs', 'play');
 
classifier.train();


console.log(classifier.classify('i am short silver'));