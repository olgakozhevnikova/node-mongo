const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/conFusion';
const dbname = 'conFusion';

// second parameter is a callback function with 2 parameters: err and 
// client, which gives an access to a database
MongoClient.connect(url, (err, client) => {
  // assert function checks if err is equal to null
  // if the err is not null, then show err on a screen
  assert.equal(err, null);

  // if there is no err, then it means that connection to a server is done
  console.log('Connected correctly to the server');

  const db = client.db(dbname);
  // db provides various methods, e.g. collection() to access a collection
  const collection = db.collection("dishes");
  // insert one document to the collection "dishes" 
  // and run callback function
  collection.insertOne({"name": "Uthappizza", "description": "test"},
  (err,result) => {
    assert.equal(err, null);

    console.log("After Insert:\n");
    // to the result we provide ops property, which says how many operations
    // have been carried out successfully
    console.log(result.ops);

    // empty object - {} - means that we search for everything what is inside the collection
    // and convert it to an array of JSON objects
    collection.find({}).toArray((err, docs) => {
      assert.equal(err, null);

      // if there is no error, print everything, what has been found in the collection
      console.log("Found:\n");
      console.log(docs);

      // to remove "dishes" collection from the database
      db.dropCollection("dishes", (err, result) => {
        assert.equal(err, null);

        // close the connection to the database at this point
        client.close();
      });
    });
  });
});
