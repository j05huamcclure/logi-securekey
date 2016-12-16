var http = require("http"),
	querystring = require('querystring')
		
exports.createToken = (arr,callback)=>{
	try{		
		var URLS = [],
			results = [];

		arr.forEach((url,i)=>{
			var validUrlObj = (arr[i].url && typeof arr[i].url !== 'undefined' && typeof arr[i].url === 'object')? true: false,
				url = {
					protocol: (validUrlObj && arr[i].url.hasOwnProperty('protocol'))? arr[i].url.protocol: 'http',
					hostname: (validUrlObj && arr[i].url.hasOwnProperty('hostname'))? arr[i].url.hostname: 'localhost',
					pathname: (validUrlObj && arr[i].url.hasOwnProperty('pathname'))? arr[i].url.pathname: '',
					port: (validUrlObj && arr[i].url.hasOwnProperty('port'))? ':'+arr[i].url.port: ''
				};

			// Add a forward slash to the begining of the pathname property and remove any trailing slashes.
			if(url.pathname && url.pathname.charAt(0) !== '/') url.pathname = '/'+url.pathname;
			if(url.pathname && url.pathname.substr(-1) === '/') url.pathname = url.pathname.substr(0, url.pathname.length - 1);
					
			var userObj = querystring.stringify(arr[i].user),
				paramsObj = (typeof arr[i].params === 'object')? '&'+querystring.stringify(arr[i].params): '';

			URLS.push(url.protocol+'://'+url.hostname+url.port+url.pathname+'/rdTemplate/rdGetSecureKey.aspx?'+userObj+paramsObj)
		})
		
		synchAPICalls(URLS);
		
		// code borrowed from http://mikelam.azurewebsites.net/how-to-make-synchronous-http-requests-in-node-js/
		function synchAPICalls(urls){
			var url = urls.pop();
			http.get(url,function(res){
				var chunks = '';
				res.on('data',function(d){
					chunks += d;
				});
				res.on('end',function(){
					results.push(chunks);
					if(urls.length){
						synchAPICalls(urls);
					}else{
						callback(null,results);
					}
				})
			})
		}	
	}
	catch(err){
		callback(err);
	}

}