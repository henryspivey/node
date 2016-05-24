// function sum(arr) {
//   var result = 0, n = arr.length || 0;
//   while (n--) {
//     // count down from end of array
//     result += Number(arr[n]);
//   }
//   return result;
// }


// function getCommandLineNumbers() {
//   return process.argv.slice(2,process.argv.length);
// }

// console.log(sum(getCommandLineNumbers()));
var total = 0;

process.argv.forEach(function(item) {
  //we need to exclude first and second items
  //so we could just filter them as NAN
  total += +item ? +item : 0;
});

console.log(total);