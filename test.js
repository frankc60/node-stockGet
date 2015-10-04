//test.js

var fin = require("./finQuery");

var appl = fin.query("NASDAQ%3AAAPL","",function(err,data){
	if(err)
	{
		console.log("cb error " + err);
	}
	else
	{

		console.log("vvvv "+err);

		console.log("callback from test.js file");
		console.log("data:"+data);
		console.log("data.price: "+data.exchange);

		Object.keys(data).forEach(function(element, key, _array) {

			console.log("\n" + element + "=" + data[element]);
		});
		var propss = Object.keys(data);
		console.log("propss: " + propss);
	}
	
	
});


/*
fin.url("EEP",function(data){
	console.log("callback output with data:"+data);

});
*/