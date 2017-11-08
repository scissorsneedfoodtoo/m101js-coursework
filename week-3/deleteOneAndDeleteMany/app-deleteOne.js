var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


MongoClient.connect('mongodb://localhost:27017/crunchbase', function(err, db) {

    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");

    var query = {"permalink": {"$exists": true, "$ne": null}};
    var projection = {"permalink": 1, "updated_at": 1}; // didn't get rid of _id

    var cursor = db.collection('companies').find(query);
    cursor.project(projection);
    cursor.sort({"permalink": 1})

    var numToRemove = 0;

    var previous = { "permalink": "", "updated_at": "" };
    cursor.forEach(
        function(doc) {

            if ( (doc.permalink == previous.permalink) && (doc.updated_at == previous.updated_at) ) {
                console.log(doc.permalink);

                numToRemove = numToRemove + 1;

                var filter = {"_id": doc._id}; // using _id here to delete the second of the two documents found that have the same permalink and updated_at values

                db.collection('companies').deleteOne(filter, function(err, res) {

                    assert.equal(err, null);
                    console.log(res.result);

                });

            }

            previous = doc;

        },
        function(err) {

            assert.equal(err, null);

        }
    );

});
