var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


MongoClient.connect('mongodb://localhost:27017/crunchbase', function(err, db) {

    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");

    var query = {"category_code": "biotech"};

    // with toArray method, callback not called until all documents are retreived
    // and doesn't take advantage of the way the driver and db system work together
    // to batch results (reduces memory overhead and execution time)

    // db.collection('companies').find(query).toArray(function(err, docs) {
    //
    //     assert.equal(err, null);
    //     assert.notEqual(docs.length, 0);
    //
    //     docs.forEach(function(doc) {
    //         console.log( doc.name + " is a " + doc.category_code + " company." );
    //     });
    //
    //     db.close();
    //
    // });

    // alternative method with cursor
    
    var cursor = db.collection('companies').find(query)

    cursor.forEach(
      function(doc) {
        console.log( doc.name + ' is a ' + doc.category_code + ' company.')
      },
      function(err) {
        assert.equal(err, null)
        return db.close()
      }
    )

});
