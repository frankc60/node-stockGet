var cheerio = require('cheerio');
var https = require('https');

var query = "NASDAQ%3AAAPL";
var url="https://www.google.co.uk/finance?q=" + query + "";


//start timing
console.time("webrequest");

var req = https.get(url, function(res){
	console.log("statusCodes:" + res.statusCode);
	console.log("headers:" + res.headers);

	var body = "";

	res.on('data', function (htmldata) {
		body += htmldata;
	});

	req.on('error', function(e) {
	  console.error(e);
	});

  	res.on('end', function() {
    	console.log('No more data in response.');
  		
  		//end timing
  		console.timeEnd("webrequest");

  		//manipulate DOM
		domFind(body);  	
	});
});



function domFind(html){
	//var html = '<div><ul><li>1</li><li id="mynum">2sadf</li><li>3</li></ul></div>';
	var $ = cheerio.load(html);
	// get my number
	//var mynum = $('#price-panel').html();
	//console.log(html);

	var name 				= $("meta[itemprop=name]").attr("content");
	var tickerSymbol		= $("meta[itemprop=tickerSymbol]").attr("content");
	var exchange 			= $("meta[itemprop=exchange]").attr("content");
	var exchangeTimezone	= $("meta[itemprop=exchangeTimezone]").attr("content");
	var price 				= $("meta[itemprop=price]").attr("content");
	var priceChange 		= $("meta[itemprop=priceChange]").attr("content");
	var priceChangePercent	= $("meta[itemprop=priceChangePercent]").attr("content");
	var quoteTime			= $("meta[itemprop=quoteTime]").attr("content");

	console.log("url:" + url);
	
	console.log("name:\t\t\t\"" + name + "\"");
	console.log("tickerSymbol:\t\t"+tickerSymbol);
	console.log("exchange:\t\t"+exchange);
	console.log("exchangeTimezone:\t"+exchangeTimezone);
	console.log("price:\t\t\t"+price);
	console.log("priceChange:\t\t"+priceChange);
	console.log("priceChangePercent:\t"+priceChangePercent);
	console.log("quoteTime:\t\t"+quoteTime);
}