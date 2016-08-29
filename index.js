exports.createToken = (urlObj,userObj,callback)=>{
	var request = require("request"),
		querystring = require('querystring'),
		url = {
			protocol: (urlObj.hasOwnProperty('protocol'))? urlObj.protocol: 'http',
			hostname: (urlObj.hasOwnProperty('hostname'))? urlObj.hostname: 'localhost',
			pathname: (urlObj.hasOwnProperty('pathname'))? urlObj.pathname: '',
			port: (urlObj.hasOwnProperty('port'))? ':'+urlObj.port: ''
		};
			
	// Send an http request to the Logi application	
	request({url: url.protocol+'://'+url.hostname+url.port+url.pathname+'/rdTemplate/rdGetSecureKey.aspx?'+querystring.stringify(userObj), json: true}, (error, response, body)=>{
		if(!error && response.statusCode === 200){
			callback(null,body);
		}else{
			callback(error);
		}
	});
}