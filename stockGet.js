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
};
//***********************************************************************


//***********************************************************************
stockGet.prototype.query = function(symbol,attri,callback) {
	console.time("queryTime");
	var req = https.request((baseurl+symbol), function(res){
		
		var body = "";
		//***********************************************
		res.on('data', function (htmldata) {
			body += htmldata;
		
		});
		//***********************************************
		res.on('error', function() {	
			console.log("res.on('error', ");
			clearTimeout(timeoutProtect);
			req.end();
			callback(new Error(e),null);

		});
		//***********************************************
	  	res.on('end', function() {

			// Clear the scheduled timeout handler
			    clearTimeout(timeoutProtect);
			    console.log("clear timeout");
			    console.log("----------------------");


			//need statusCode of 200 otherwise we have an issue
			if(res.statusCode !=200)
			{
				req.end();
	  			callback(new Error("error statusCode: " + res.statusCode + ""), null);
			}

			
			//end request
	  		req.end();
	  		//manipulate DOM
			manDom(body);
		});
		console.timeEnd("queryTime");
	});

//**********************************************************************
//**********************************************************************
//**********************************************************************

	req.on('error', function(e) {
	  	console.log("req.on('error' " + symbol);
	  	req.end();
		
		clearTimeout(timeoutProtect);
		
	  	callback(new Error("ERROR " + e),null);
	});


	req.on('timeout', function () {
	  // Timeout happend. Server received request, but not handled it
	  // (i.e. doesn't send any response or it took to long).
	  // You don't know what happend.
	  // It will emit 'error' message as well (with ECONNRESET code).

	  console.log("req.on('timeout'");
	  req.emit('error', "TIMEOUT");

	});



	req.on("socket", function (socket) {
		console.log("req.on('socket'");
	
		if(timeoutProtect){
		    clearTimeout(timeoutProtect);
		//    timeoutProtect = null;
		}

		// Setup the timeout handler
		timeoutProtect = setTimeout(function() {
			// Clear the local timer variable, indicating the timeout has been triggered.
			//timeoutProtect = null;
			req.emit('timeout');
		}, 500);

	});

	req.end();


//*****************************************************
//*****************************************************
function manDom(htmlbody)
{

console.time("queryTime2");

	var $ = cheerio.load(htmlbody);
	var stockSymbol= {};
	if(attri=="all"){
		var k="";
		$(htmlbody).find('meta[itemprop]').each (function(){
		 	attrib = ($(this).attr('itemprop'));
		 	valuu = ($(this).attr('content'));
		 	stockSymbol[attrib] = valuu;
		 });
	console.timeEnd("queryTime2");
	
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
	 //timeoutProtect = null;

			clearTimeout(timeoutProtect);
   
   		
			callback(new Error("Missing Attribute ´"+attri + "´ for Symbol ´" + symbol +"´."),null);
			
			
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
} //close function



module.exports = new stockGet();