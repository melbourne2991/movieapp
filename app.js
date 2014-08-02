var express		= require('express')
var app 		= express();
var httpProxy   = require('http-proxy')

// Set up proxy
var proxy = httpProxy.createProxyServer();

// API Key
var api_key = '066d7fd4b6d825e016e918c8826cfc53';

app.get('/api/*', function(req, res) {
	req.url = req.url.replace('/api', '');
	req.url = req.url.replace('iamthewalrus', api_key);

	proxy.web(req, res, {
    	target: 'https://api.themoviedb.org'
  	});
});

app.use(express.static(__dirname + '/public'));

if(app.listen(3000)) console.log('App Listening on ' + '3000');
