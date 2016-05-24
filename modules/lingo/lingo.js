#!/usr/bin/env node

var program = require('commander');
var request = require('request');
var chalk = require('chalk');

program
    .version('0.0.1')
    .usage('[options] <keywords>')
    .option('-s, --source [source]', 'Specify the source language')
    .option('-t, --target [target]', 'Specify the target language')
    .parse(process.argv);

if(!program.args.length) {
    program.help();
} else {
    var keywords = program.args;
    console.log(keywords.join(" "));
    if (keywords.length >1) {
    	var url = 'https://www.googleapis.com/language/translate/v2?key=AIzaSyBPmtcq2mhYuTmR1pQ1xNPVAYbssRJKlec&source='+program.source+'&target='+program.target+'&q='+keywords.join(" ");
    } else {
    	var url = 'https://www.googleapis.com/language/translate/v2?key=AIzaSyBPmtcq2mhYuTmR1pQ1xNPVAYbssRJKlec&source='+program.source+'&target='+program.target+'&q='+keywords;
    }

}


request({
    method: 'GET',
    url: url
}, function(error, response, body) {

    if (!error && response.statusCode == 200) {
        var body = JSON.parse(body);
        
        for(var i = 0; i<body.data.translations.length; i++) {
        	console.log(chalk.magenta(body.data.translations[i].translatedText));
        }
        
    } else if (error) {
        console.log('Error: ' + error);
    }
});