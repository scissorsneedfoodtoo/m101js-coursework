var MongoClient = require('mongodb').MongoClient,
    Twitter = require('twitter'),
    assert = require('assert');


require('dotenv').load();
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


MongoClient.connect('mongodb://localhost:27017/social', function(err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    var screenNames = ["Marvel", "DCComics", "TheRealStanLee"];
    var done = 0;

    screenNames.forEach(function(name) {

        var cursor = db.collection("statuses").find({"user.screen_name": name}); // find against existing statuses collection
        cursor.sort({ "id": -1 }); // sort in decending order...
        cursor.limit(1); // ... and limit to 1 to find the status id of the very last pulled tweet for each screen name

        cursor.toArray(function(err, docs) { // will have 1 document if run before, or 0 if run for the first time
            assert.equal(err, null);

            var params;
            if (docs.length == 1) { // program was run before
                params = { "screen_name": name, "since_id": docs[0].id, "count": 10 };
            } else { // program was never run and doesn't need since_id param
                params = { "screen_name": name, "count": 10 };
            }

            client.get('statuses/user_timeline', params, function(err, statuses, response) {

                assert.equal(err, null);

                db.collection("statuses").insertMany(statuses, function(err, res) {

                    console.log(res);

                    done += 1;
                    if (done == screenNames.length) { // check that all screen names have been processed before closing db
                        db.close();
                    }

                });
            });
        })
    });
});
