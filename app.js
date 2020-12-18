

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';


const dbName = 'fruitsDB';

const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    insertDocuments(db, function(){
        client.close();
    });
});


const insertDocuments = function(db, callback){
    //get the document collection
    const collection = db.collection('fruits');
    //Insert some documents
    collection.insertMany([
        {
            name: "Apple",
            score:8,
            review: "Great Fruit"
        }, 
        {
            name: "Orange",
            score: 9,
            review: "Kinda Sour"
        }, 
        {
            name: "Banana",
            score: 19,
            review: "Bon Appetit"
        }
    ], function(err, result){
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the Collection");
        callback(result);
    })
}