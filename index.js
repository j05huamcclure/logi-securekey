var request = require("request"),
	querystring = require('querystring')
		
exports.createToken = (urlObj,userObj,paramsObj,callback)=>{
		var validUrlObj = (urlObj && typeof urlObj !== 'undefined' && typeof urlObj === 'object')? true: false,
			url = {
				protocol: (validUrlObj && urlObj.hasOwnProperty('protocol'))? urlObj.protocol: 'http',
				hostname: (validUrlObj && urlObj.hasOwnProperty('hostname'))? urlObj.hostname: 'localhost',
				pathname: (validUrlObj && urlObj.hasOwnProperty('pathname'))? urlObj.pathname: '',
				port: (validUrlObj && urlObj.hasOwnProperty('port'))? ':'+urlObj.port: ''
			};
		
	try{		
		// Add a forward slash to the begining of the pathname property and remove any trailing slashes.
		if(url.pathname && url.pathname.charAt(0) !== '/') url.pathname = '/'+url.pathname;
		if(url.pathname && url.pathname.substr(-1) === '/') url.pathname = url.pathname.substr(0, url.pathname.length - 1);
		
		if(Object.keys(userObj).length){
			userObj = querystring.stringify(userObj);
			paramsObj = (typeof paramsObj === 'object')? '&'+querystring.stringify(paramsObj): '';
			
			// Send an http request to the Logi application	
			request({url: url.protocol+'://'+url.hostname+url.port+url.pathname+'/rdTemplate/rdGetSecureKey.aspx?'+userObj+paramsObj, json: true}, (error, response, body)=>{
				if(!error && response.statusCode === 200){
					callback(null,body);
				}else{
					if(response && response.statusCode === 404){
						callback('Error 404: It seems that the URL to your Logi application is not correct. Please correct the URL and try again.');					
					}else{
						callback(error);
					}
				}
			});
		}else{
			callback('ERROR: Please provide a valid user object.');
		}
	}
	catch(err){
		callback(err);
	}
}