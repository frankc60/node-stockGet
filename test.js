//test.js
//shows an example of using the stockGet module
//
//by Frank Clausen <frankc60@gmail.com> (coffeeboat.co.uk)
//
//
var stockGet = require("./stockGet");

//NASDAQ%3AAAPL
console.log("call 1st stockGet");
var appl = stockGet.query("NASDAQ%3AAAPL","all" ,function(err,data){
	if(err)
	{
		console.log("test.js 1st callback error: " + err);
	}
	else
	{
		console.log("\n---------------------------------------\n1st callback in TEST.JS")
			
		Object.keys(data).forEach(function(element, key, _array) {
			console.log("" + element + "=" + data[element]);
		});
	}

});
console.log("call 2nd stockGet");
var appl = stockGet.query("NYSE%3AF","zzzz" ,function(err,data){
	if(err)
	{
		console.log("test.js 2nd callback error: " + err);
	}
	else
	{
		console.log("\n---------------------------------------\n2nd callback in TEST.JS")
			
		Object.keys(data).forEach(function(element, key, _array) {
			console.log("" + element + "=" + data[element]);
		});
	}

});

console.log("call 3rd stockGet");
var appl = stockGet.query("NxxAF","price" ,function(err,data){
	if(err)
	{
		console.log("test.js 3rd callback error: " + err);
	}
	else
	{
		console.log("\n---------------------------------------\n3rd callback in TEST.JS")
			
		Object.keys(data).forEach(function(element, key, _array) {
			console.log("" + element + "=" + data[element]);
		});
	}

});


console.log("the finish test.js file");
