var natural = require('natural');
var classifier = new natural.BayesClassifier();


classifier.addDocument('play atif songs', 'play');
classifier.addDocument('play rafeek songs', 'play');

classifier.addDocument('see me', 'see');
classifier.addDocument('see her', 'see');
classifier.addDocument('see the wall', 'see');
 
classifier.train();


console.log(classifier.classify('what are you doing?'));