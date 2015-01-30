console.log(process.env.CONFIG_DB);

var MongoClient = require('mongodb').MongoClient
, format = require('util').format;

MongoClient.connect(process.env.CONFIG_DB, function(err, db) {
	if(err) throw err;

	var collection = db.collection('foo');


/*
	// Locate all the entries using find
	collection.findAndModify({foo:'bar'},{},{},{remove:true},function(){
		db.close();
	});
	*/

	collection.find().toArray(function(err, results) {
		console.dir(results);
		// Let's close the db
		db.close();
	});
	

/*
	// Locate all the entries using find
	collection.find({foo:'bar'}).toArray(function(err, results) {
		console.dir(results);
		// Let's close the db
		db.close();
	});
	*/

/*
	// Locate all the entries using find
	collection.find({name:'key1'}).toArray(function(err, results) {
		console.dir(results);
		// Let's close the db
		db.close();
	});
	*/


/*
	collection.insert({name:'key1',value:1}, function(err, docs) {

//		collection.count(function(err, count) {
//			console.log(format("count = %s", count));
//		});

		// Locate all the entries using find
		collection.find().toArray(function(err, results) {
			console.dir(results);
			// Let's close the db
			db.close();
		});
	});
*/
	
});