const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations');

const url = 'mongodb://localhost:27017/conFusion';
const dbname = 'conFusion';

// second parameter is a callback function with 2 parameters: err and 
// client, which gives an access to a database
MongoClient.connect(url, (err, client) => {
  const db = client.db(dbname);
  // assert function checks if err is equal to null
  // if the err is not null, then show err on a screen
  assert.equal(err, null);

  // if there is no err, then it means that connection to a server is done
  console.log('Connected correctly to the server');

  // 1st parameter - client, that came from MongoClient.connect,
  // it's used to let operations node module know where to access the database from;
  // 2nd parameter is the document to be inserted;
  // 3rd parameter - collection name;
  // 4th parameter - callback function
  dboper.insertDocument(db, { name: "Pasta", description: "Test description" }, 'dishes', (result) => {
    // ops is the number of insert operations
    console.log('Insert document: \n', result.ops);

    // find document in the collection
    dboper.findDocuments(db, 'dishes', (docs) => {
      console.log('Found documents:\n', docs);

      // update document
      dboper.updateDocument(db, { name: "Pasta" }, { description: "Updated text" }, 'dishes', (result) => {
        // updated document is passed to result.result
        console.log('Updated document:\n', result.result);

        //find document again
        dboper.findDocuments(db, 'dishes', (docs) => {
          console.log('Found updated documents:\n', docs);

          // delete collection
          db.dropCollection('dishes', (result) => {
            console.log('Dropped collection', result);

            // close the connection to the database at this point
            client.close();
          });
        });
      });
    });
  });
});
