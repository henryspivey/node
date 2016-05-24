var fs = require('fs');

var file = fs.readFileSync(process.argv[2]).toString(); // convert buffer object to string

var newLines = file.split('\n');  // make an array of newlines by splitting the string with new line delimiter
console.log(newLines.length-1);  
