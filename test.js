//test.js

var fin = require("./finQuery");

var appl = fin.query("NASDAQ%3AAAPL","all",function(err,data){
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

