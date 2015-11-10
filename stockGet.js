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
var cheerio = require('cheerio');
var https = require('https');


var baseurl="https://www.google.co.uk/finance?q=";

var timeoutProtect;
var res;
var req;

var stockGet = function() {};

//***********************************************************************
stockGet.prototype.url = function (query,callback) {
	callback(null,baseurl+query);
};
//***********************************************************************
//***********************************************************************
stockGet.prototype.query = function(symbol,attri,callback) {
	//console.log("query(" + symbol + ")");
	console.time("queryTime");
	var req = https.request((baseurl+symbol), function(res){
		let body="";
		//***********************************************
		res.on('data', function (htmldata) {
			body += htmldata;
		});
		//***********************************************
		res.on('end', function() {
			console.log(symbol + ": res.on(´end´)");

			
			var d = console.timeEnd("queryTime");
			console.log(symbol + ": " + d);
		    console.log("----------------------");

			//end request
	  		req.end();
	
			//need statusCode of 200 otherwise we have an issue
			if(res.statusCode !=200)
			{
	  			callback(new Error("error statusCode: " + res.statusCode + ""), null);
			}
			
	  		//manipulate DOM
			manDom(body);
		});
	});

//**********************************************************************
//**********************************************************************
	req.on('error', function(e) {
	  	console.log(symbol + ": req.on('error')");
	  	req.abort();
	  	req.end();
			
	  	callback(new Error(e.message),null);
	});

	req.on("socket", function (socket) {
		console.log(symbol + ": req.on('socket'");
	
	 	socket.setTimeout(2285);  
		    socket.on('timeout', function() {
		        console.log(symbol + ": socket timeout abort");
		        req.abort();
		        req.end();
		    }); 
	});
	req.end();

//*****************************************************
//*****************************************************
	function manDom(htmlbody)
	{
		let $ = cheerio.load(htmlbody);
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

			//	clearTimeout(timeoutProtect);
	   
	   		
				callback(new Error("Missing Attribute ´"+attri + "´ for Symbol ´" + symbol +"´."),null);
				
				
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