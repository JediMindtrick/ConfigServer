
/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var MongoClient = require('mongodb').MongoClient
var connected = false;

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.basicAuth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD));

var collection = null;

app.get('/',function(req,res) {
	res.send('OK');
});

app.get('/health',function(req,res) {
	res.send('connected: ' + connected);
});

app.get('/:name',function(req,res) {

	collection.find({name:req.param('name')}).toArray(function(err, results) {

		if(results[0]){
			console.log('results = ');
			console.log(JSON.stringify(results));
			res.send({
				key:(results[0].name || results[0].key),
				value:results[0].value
			});
		}
	});
});

MongoClient.connect(process.env.CONFIG_DB, function(err, db) {
	if(err) throw err;

	collection = db.collection('foo');

	connected = true;

});

http.createServer(app).listen(app.get('port'), function(){
 	console.log('Express server listening on port ' + app.get('port'));
});
