var MongoClient = require('mongodb').MongoClient, 
    assert = require('assert');

MongoClient.connect("mongodb://localhost:30001,localhost:30002,localhost:30003/course?replicaSet=replica_set", function(err, db) {
    if (err) throw err;

    var documentNumber = 0;
    function insertDocument() {

        db.collection("repl").insert({ 'documentNumber' : documentNumber++ }, function(err, doc) {
            if (err) throw err;
            console.log(doc);
        });

        console.log("Dispatched insert");
        setTimeout(insertDocument, 1000);
    }

    insertDocument();
});
