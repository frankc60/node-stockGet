/**
 * Retrieve stock market figures from google finance.
 *
 * @module stockGet
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

var debugMode=0;
var baseurl="https://www.google.co.uk/finance?q=";

//var query = "NASDAQ%3AAAPL";

//debug logging to console
function dlog(data){
	if(debugMode==1)
	{
		console.log(data);
	}
	return;
}


var Fin = function() {};

//***********************************************************************
Fin.prototype.url = function (query,callback) {
	dlog('url to query is '+ baseurl + query);
	callback(baseurl+query);
	return;
};
//***********************************************************************


//***********************************************************************
Fin.prototype.query = function(symbol,attri,callback) {

	dlog("\n-----\nsymbol:"+symbol+"\nattri:"+attri+"\n-----\n");

	var req = https.request((baseurl+symbol), function(res){
		
		var body = "";

		dlog(res.sockets);
	//***********************************************
		res.setTimeout(4500, function(e){
			console.log("timed out");
			callback("error");
			return;
		});
	//***********************************************
		res.on('data', function (htmldata) {
			body += htmldata;
			dlog("data..");

		});
	//***********************************************
		res.on('error', function() {	
			console.log("sdfasfaf");
			req.abort();
			req.destroy();

			req.end();
			callback(new Error(e),null);

		});
	//***********************************************
//		res.on("socket", function (socket) {
//		  socket.emit("agentRemove");
//		  socket.emit("end");
		  
//		});
	//***********************************************
	  	res.on('end', function() {
			//need statusCode of 200 otherwise we have an issue
			 //clearTimeout( timeout );
			if(res.statusCode !=200)
			{
				dlog("error statusCode: " + res.statusCode);
				callback(new Error("error statusCode: " + res.statusCode + ""), null);
				return;
			}


	    	dlog('No more data in response.');
	  		
	  		
	  		//manipulate DOM
			manDom(body);
		});
	});

function manDom(htmlbody)
{
	var $ = cheerio.load(htmlbody);
	var stockSymbol= {};
	if(attri=="all"){
		var k="";
		$(htmlbody).find('meta[itemprop]').each (function(){
		 	attrib = ($(this).attr('itemprop'));
		 	valuu = ($(this).attr('content'));
		 	stockSymbol[attrib] = valuu;
		 });
		callback(null,stockSymbol);
		return;
	}
	else
	{

		if($("meta[itemprop="+attri+"]").attr("content") === undefined)
		{
			console.log("Error: missing parameters, attribute is " +attri+".");
			dlog("error ´"+attri+"´ not found - callbacking with error");
			if(callback){
				callback(new Error("´"+attri + "´ not found."),null);
			}
			else
			{
				return;
			}
			
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
				//success - pass back data to callback.
				callback(null,stockSymbol);
				return;
			}
		}
		
	//	var string = JSON.stringify(stockSymbol);
	//	dlog("\n\nString:"+string);

	//	dlog("\n\n");

	//	callback(null,stockSymbol);
	//	return;
	}
		
} //end function
//*****************************************************

	req.on('error', function(e) {
	  //console.error(e);
	  req.abort();
	  req.destroy();

	  req.end();
	  callback(new Error(e),null);
	  
	});


	req.on('timeout', function () {
	  // Timeout happend. Server received request, but not handled it
	  // (i.e. doesn't send any response or it took to long).
	  // You don't know what happend.
	  // It will emit 'error' message as well (with ECONNRESET code).
	  
	  console.log('timeout');
	  req.abort();
	  req.destroy();
	  req.end();
	  //req.finish();
	});

	req.on("socket", function (socket) {
	  dlog("socket start");
	//  socket.emit("agentRemove");
	 // socket.emit("close");

	  
	});





//	req.setTimeout(1000, function(e){
//	console.log("timeout: " + e);

//});

req.end();


} //close function



module.exports = new Fin();
