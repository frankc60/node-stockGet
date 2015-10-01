var cheerio = require('cheerio');
var http = require('http');

var req = http.get("http://www.kiwicrowd.co.nz", function(res){
	console.log(res.statusCode)

	res.on('data', function (htmldata) {
    	console.log('BODY: ' + htmldata);
  	});

  	res.on('end', function() {
    	console.log('No more data in response.');
  	});
});

req.end();


var html = '<div><ul><li>1</li><li id="mynum">2sadf</li><li>3</li></ul></div>';
var $ = cheerio.load(html);
// get my number
var mynum = $('#mynum').text();
console.log(mynum) // logs 2