/**
 * Retrieve stock market figures from google finance.
 *
 * @module stockGet
 *
 * @param  {String} stocksymbol
 * @return {object}
 

	name
	tickerSymbol
	exchange
	exchangeTimezone
	price
	priceChange
	priceChangePercent
	quoteTime		
*/

//required modules
var cheerio = require('cheerio');
var https = require('https');


var baseurl="https://www.google.co.uk/finance?q=";

var timeoutProtect;

var stockGet = function() {};

//***********************************************************************
stockGet.prototype.url = function (query,callback) {
	callback(null,baseurl+query);
	return;
};
//***********************************************************************


//***********************************************************************
stockGet.prototype.query = function(symbol,attri,callback) {

	
	var req = https.request((baseurl+symbol), function(res){
		
		var body = "";

		//***********************************************
		res.setTimeout(4500, function(e){
			console.log("timed out");
			callback(new Error(e),null);
			return;
		});
		//***********************************************
		res.on('data', function (htmldata) {
			body += htmldata;
		
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
	  	res.on('end', function() {
			//need statusCode of 200 otherwise we have an issue
			 //clearTimeout( timeout );
			if(res.statusCode !=200)
			{
				req.end();
	  			callback(new Error("error statusCode: " + res.statusCode + ""), null);
			}

// Proceed only if the timeout handler has not yet fired.
			if (timeoutProtect) {

			    // Clear the scheduled timeout handler
			    clearTimeout(timeoutProtect);
			}

	  		req.end();
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
	else //just return the one dom value
	{

//this below if seems to get called with all issues ? need more testing

		if($("meta[itemprop="+attri+"]").attr("content") === undefined)
		{
			//console.log("Error: missing parameters, attribute is " +attri+".");
			//dlog("error ´"+attri+"´ not found - callbacking with error");
			if(callback){
				callback(new Error("Missing Attribute ´"+attri + "´ for Symbol ´" + symbol +"´."),null);
			}
			else
			{
				console.log("Missing Attribute ´"+attri + "´ for Symbol ´" + symbol +"´.");
				return;
			}
			
		}
		else
		{
			var stockSymbol= {};
			stockSymbol[attri] = $("meta[itemprop="+attri+"]").attr("content");

			//success - pass back data to callback.
			callback(null,stockSymbol);
			return;
		}
	}	
} //end function
//*****************************************************





	req.on('error', function(e) {
	  	//console.error(e);
	  	console.log("error req on");
	  	req.abort();
	  	req.destroy();
		req.end();
	  
	  	callback(new Error("ss " + e),null);
	  	return;
	});


	req.on('timeout', function () {
	  // Timeout happend. Server received request, but not handled it
	  // (i.e. doesn't send any response or it took to long).
	  // You don't know what happend.
	  // It will emit 'error' message as well (with ECONNRESET code).

	  console.log("timeout req on");
	  
	  console.log('timeout');
	  req.abort();
	  req.destroy();
	  req.end();
	  //req.finish();
	});

	req.on("socket", function (socket) {
	//  socket.emit("agentRemove");
	 // socket.emit("close");
console.log("sockets req on");

// Setup the timeout handler
timeoutProtect = setTimeout(function() {
  	// Clear the local timer variable, indicating the timeout has been triggered.
  	timeoutProtect = null;
 	

  // Execute the callback with an error argument.

    throw new Error("socket timeoutzz");
}, 1500);

	});


	req.end();


} //close function


module.exports = new stockGet();
