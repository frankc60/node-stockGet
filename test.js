//test.js
//shows an example of using the stockGet module
//
//by Frank Clausen <frankc60@gmail.com> (coffeeboat.co.uk)
//
//
"use strict";
var stockGet = require("./stockGet");

var queryA = "NASDAQ%3AAAPL";
var queryB = "NYSE%3AF";
var queryC = "NxxAF";


//**************************************************************************
//**************************************************************************
let appl1 = stockGet.query(queryA,"all",function(err,data){
	console.log("test.js: callback("+queryA+"---------------------------------------");
	if(err)
	{
		console.log("test.js: callback("+queryA+") error: " + err);
	}
	else
	{
		Object.keys(data).forEach(function(element, key, _array) {
			console.log("" + element + "=" + data[element]);
		});
	}
console.log("\ntest.js: callback("+queryA+")---------------------------------------");
});
//**************************************************************************
//**************************************************************************
let appl2 = stockGet.query(queryB,"all",function(err,data){
	console.log("test.js: callback("+queryB+"---------------------------------------");
	if(err)
	{
		console.log("test.js: callback("+queryB+") error: " + err);
	}
	else
	{
		Object.keys(data).forEach(function(element, key, _array) {
			console.log("" + element + "=" + data[element]);
		});
	}
console.log("\ntest.js: callback("+queryB+")---------------------------------------");
});
//**************************************************************************
//**************************************************************************
let appl3 = stockGet.query(queryC,"all",function(err,data){
	console.log("test.js: callback("+queryC+"---------------------------------------");
	if(err)
	{
		console.log("test.js: callback("+queryC+") error: " + err);
	}
	else
	{
		Object.keys(data).forEach(function(element, key, _array) {
			console.log("" + element + "=" + data[element]);
		});
	}
console.log("\ntest.js: callback("+queryC+")---------------------------------------");
});
//**************************************************************************
//**************************************************************************
console.log("test.js: the finish test.js file");
