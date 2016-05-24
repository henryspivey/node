var fs = require('fs');
var newLines = undefined;
function getNewLines(callback) {
    fs.readFile(process.argv[2],'utf-8', function(err,data){
    newLines = data.split('\n');  // make an array of newlines by splitting the string with new line delimiter
//    console.log(newLines.length-1);
    callback();
  })
}

function showNewLines() {
  console.log(newLines.length-1);
}

getNewLines(showNewLines);

/* More efficient solution
 var fs = require('fs')  
     var file = process.argv[2]  
       
     fs.readFile(file, function (err, contents) {  
       // fs.readFile(file, 'utf8', callback) can also be used  
       var lines = contents.toString().split('\n').length - 1  
       console.log(lines)  
     })  
*/
