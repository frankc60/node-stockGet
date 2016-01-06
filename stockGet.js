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
"use strict";

//required modules
var Cheerio = require('cheerio');
var Https = require('https');


var baseurl = "https://www.google.co.uk/finance?q=";

var timeoutProtect;
var res;
var req;
var globalError = false;

var stockGet = function() {};

//***********************************************************************
stockGet.prototype.url = function (query,callback) {
	callback(null,baseurl+query);
};
//***********************************************************************
//***********************************************************************
stockGet.prototype.query = function(symbol,attri,callback) {
	//console.log("query(" + symbol + ")");

	let mainURL = baseurl+symbol;

	console.time("queryTime");
	var req = Https.request(mainURL, function(res){
		let body="";
		//***********************************************
		res.on('data', function (htmldata) {
			body += htmldata;
			//console.log(".");
		});
		//***********************************************
		res.on('end', function() {
			if(!globalError)
			{
			console.log(symbol + ": res.on(´end´)");

			
			console.timeEnd("queryTime");
			
			//need statusCode of 200 otherwise we have an issue
			if(res.statusCode !=200)
			{
				globalError=true;
	  			callback(new Error("error statusCode: " + res.statusCode + ""), null);
			}
			 
	  		//manipulate DOM function
			manDom(body);
			}
			else
			{
				console.log("********res.end called, but error has happened.");

			}
		});
	});

//**********************************************************************
//**********************************************************************
	//req.once appears to cause errors somtimes.. so using just req.on("error",...) instead
	req.on('error', function(e) {
	  	console.log(symbol + ": req.on('error') - callback(error)");
	  	req.abort();
	  	req.end();
		//res.removeAllListeners("end");
		globalError = true;
		//make sure callback is not called again
		let newCallback = callback;
		//callback = null;
	  	callback("Error: " + e.message,null);
	});

	req.on("close", function () {
		console.log("server connection closed.");

	});

	req.on("socket", function (socket) {
		console.log(symbol + ": req.on('socket')");
	
	 	socket.setTimeout(111);  
	    socket.on('timeout', function() {
	    	socket.destroy();
	//    	req.abort();
	  //      req.end();
	       // console.log(symbol + ": socket timeout abort");
	        req.emit("error",new Error("Timeout for " + symbol));
	        	//"error timeout");
	        req.abort();
	        req.end();
	       
	       
	    }); 
	});


	
req.end();





















//*****************************************************
//*****************************************************
	function manDom(htmlbody)
	{
		console.log("manDom()");
		let $ = Cheerio.load(htmlbody);
		let stockSymbol= {};
		if(attri=="all"){
			let k="";
			let attrib=""; 
			let valuu="";
			$(htmlbody).find('meta[itemprop]').each (function(){
			 	attrib = ($(this).attr('itemprop'));
			 	valuu = ($(this).attr('content'));
			 	stockSymbol[attrib] = valuu;
			 });
			
		
			callback(null,stockSymbol);
			//return;
		}
		else //just return the one dom value
		{

	//this below if seems to get called with all issues ? need more testing

			if($("meta[itemprop="+attri+"]").attr("content") === undefined)
			{
				//console.log("Error: missing parameters, attribute is " +attri+".");
				//dlog("error ´"+attri+"´ not found - callbacking with error");
		 //timeoutProtect = null;

			//	clearTimeout(timeoutProtect);
	   
	   		req.emit("error",new Error("Missing Attribute ´"+attri + "´ for Symbol ´" + symbol +"´."));
				//callback(new Error("Missing Attribute ´"+attri + "´ for Symbol ´" + symbol +"´."),null);
				
				
			}
			else
			{
				
				stockSymbol[attri] = $("meta[itemprop="+attri+"]").attr("content");

				//success - pass back data to callback.
				callback(null,stockSymbol);
				//return;
			}
		}	
	} //end function
//*****************************************************
} //close main function



module.exports = new stockGet();