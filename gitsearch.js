#!/usr/bin/env node


var program = require('commander');
var request = require('request');
var chalk = require('chalk');

program
    .version('0.0.1')
    .usage('[options] <keywords>')
    .option('-o, --owner [name]', 'Filter by the repositories owner')
    .option('-l, --language [language]', 'Filter by the repositories language')
    .parse(process.argv);

if(!program.args.length) {
    program.help();
} else {
    var keywords = program.args;
    var url = 'https://api.github.com/search/repositories?sort=stars&order=desc&q='+keywords;   
    if (program.owner) {
    	url += '+user:' + program.owner;
    }
    if (program.language) {
    	url += '+language:' + program.language;
    }

}

request({
	method: 'GET',
	headers: {
		'User-Agent':'spivotron'
	},
	url:url
}, function(error, response, body){
	if (!error && response.statusCode == 200) {
		var body = JSON.parse(body);
		if (body.items.length == 0) {
			console.log(chalk.red.bold("No items found"));
		};
		if (program.full) {
			console.log(body)
		} else {	
			for (var i = 0; i < body.items.length; i++) {
				console.log(chalk.cyan.bold.underline('Name: ' + body.items[i].name));
				console.log(chalk.green.bold('Owner: ' + body.items[i].owner.login));
				console.log(chalk.magenta('Desc: ' + body.items[i].description));
				console.log(chalk.blue('Language: ' + body.items[i].language));
				console.log(chalk.yellow('Clone url: ' + body.items[i].clone_url + '\n'));
			}
		}

		process.exit(0);
	} else if (error) {
		console.log(chalk.red.bold('Error: ' + error));
		process.exit(1);
	};
});

