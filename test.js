//test.js

var fin = require("./finQuery");
//NASDAQ%3AAAPL
var appl = fin.query("","all",function(err,data){
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

