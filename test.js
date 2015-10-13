//test.js

var fin = require("./finQuery");
//NASDAQ%3AAAPL
console.log("call 1st fin");
var appl = fin.query("NASDAQ%3AAAPL","all" ,function(err,data){
	if(err)
	{
		console.log("test.js callback error: " + err);
	}
	else
	{
		console.log("\n---------------------------------------\ncallback in TEST.JS")
			
		Object.keys(data).forEach(function(element, key, _array) {
			console.log("" + element + "=" + data[element]);
		});
	}

});
console.log("call 2nd fin");
var appl = fin.query("NYSE%3AF","price" ,function(err,data){
	if(err)
	{
		console.log("test.js callback error: " + err);
	}
	else
	{
		console.log("\n---------------------------------------\ncallback in TEST.JS")
			
		Object.keys(data).forEach(function(element, key, _array) {
			console.log("" + element + "=" + data[element]);
		});
	}

});

console.log("call 3rd fin");
var appl = fin.query("NxxAF","price" ,function(err,data){
	if(err)
	{
		console.log("test.js callback error: " + err);
	}
	else
	{
		console.log("\n---------------------------------------\ncallback in TEST.JS")
			
		Object.keys(data).forEach(function(element, key, _array) {
			console.log("" + element + "=" + data[element]);
		});
	}

});


console.log("the finish test.js file");
