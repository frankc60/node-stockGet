/**
 * Retrieve stock market figures from google finance.
 *
 * @module finQuery
 *
 * @param  {String} html
 * @return {String}
 
	name
	tickerSymbol
	exchange
	exchangeTimezone
	price
	priceChange
	priceChangePercent
	quoteTime		
*/

var cheerio = require('cheerio');
var https = require('https');

var debugMode=1;
var baseurl="https://www.google.co.uk/finance?q=";

//var query = "NASDAQ%3AAAPL";


function dlog(data){
	if(debugMode==1)
	{
		dlog(data);
	}
}


var Fin = function() {};

Fin.prototype.url = function (query,callback) {
	dlog('url is '+ baseurl + query);
	callback(baseurl+query);
	return;
};



Fin.prototype.query = function(symbol,attri,callback) {
	//start timing
	console.time("webrequest");

	dlog("\n-----\nsymbol:"+symbol+"\nattri:"+attri+"\n-----\n");

	var req = https.get((baseurl+symbol), function(res){
		
		var body = "";

		res.on('data', function (htmldata) {
			body += htmldata;
		});

		req.on('error', function(e) {
		  console.error(e);
		  callback(e);
		  return;
		});

	  	res.on('end', function() {
			if(res.statusCode !=200)
			{
				dlog("error statusCode: " + res.statusCode);
				callback("error statusCode: " + res.statusCode + "", "");
			}

	    	dlog('No more data in response.');
	  		
	  		
	  		//end timing
	  		console.timeEnd("webrequest");

	  		//manipulate DOM
			
			{
			var $ = cheerio.load(body);

			if(attri=="all"){
				
				var name 				= $("meta[itemprop=name]").attr("content");
				var tickerSymbol		= $("meta[itemprop=tickerSymbol]").attr("content");
				var exchange 			= $("meta[itemprop=exchange]").attr("content");
				var exchangeTimezone	= $("meta[itemprop=exchangeTimezone]").attr("content");
				var price 				= $("meta[itemprop=price]").attr("content");
				var priceChange 		= $("meta[itemprop=priceChange]").attr("content");
				var priceChangePercent	= $("meta[itemprop=priceChangePercent]").attr("content");
				var quoteTime			= $("meta[itemprop=quoteTime]").attr("content");

				var stockSymbol = { 
				    "name": name, 
				    "tickerSymbol": tickerSymbol,
				    "exchange": exchange,
				    "exchangeTimezone": exchangeTimezone,
				    "price":price,
				    "priceChange": priceChange,
				    "priceChangePercent": priceChangePercent,
				    "quoteTime":quoteTime
				}
				callback(null,stockSymbol);
				return;
			}
			else
			{
				if($("meta[itemprop="+attri+"]").attr("content") === undefined)
				{
					dlog("error callbacking with error");
					callback(new Error("no attribute defined."),null);
					return;
				}
				else
				{
					var stockSymbol= {};
					stockSymbol[attri] = $("meta[itemprop="+attri+"]").attr("content");
					if(stockSymbol[attri] == ""){
						dlog("error - "+attri+" doesn´t seem to exist!");
						callback(new Error(attri + " doesn´t exist"),null);
						return;
					}
					else
					{

						dlog("\nx:"+attri+":\t\t\t\"" + $("meta[itemprop="+attri+"]").attr("content") + "\"");
						dlog("\nZZZZZZ:"+attri+":\t\t\t" + stockSymbol[attri]);
					}
				}
				
				var string = JSON.stringify(stockSymbol);
				dlog("\n\nString:"+string);

				dlog("\n\n");

				callback("",stockSymbol);
				return;
				}
			}
		});
	});


} //close function



module.exports = new Fin();
