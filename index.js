const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations');

const url = 'mongodb://localhost:27017/conFusion';
const dbname = 'conFusion';

// second parameter is a callback function with 2 parameters: err and 
// client, which gives an access to a database
MongoClient.connect(url).then((client) => {
  console.log('Connected correctly to the server');
  const db = client.db(dbname);

  // 1st parameter - db, that came from MongoClient.connect,
  // it's used to let operations node module know where to access the database from;
  // 2nd parameter is the document to be inserted;
  // 3rd parameter - collection name;
  // 4th parameter - callback function
  dboper.insertDocument(db, { name: "Pasta", description: "Test description" }, 'dishes')
  .then((result) => {
    // ops is the number of insert operations
    console.log('Insert document: \n', result.ops);
    // find document in the collection
    return dboper.findDocuments(db, 'dishes');
  })
  .then((docs) => {
    console.log('Found documents:\n', docs);
    // update document
    return dboper.updateDocument(db, { name: "Pasta" }, { description: "Updated text" }, 'dishes')
  })
  .then((result) => {
    // updated document is passed to result.result
    console.log('Updated document:\n', result.result);
    //find document again
    return dboper.findDocuments(db, 'dishes')
  })
  .then((docs) => {
    console.log('Found updated documents:\n', docs);
    // delete collection
    return db.dropCollection('dishes')
  })
  .then((result) => {
    console.log('Dropped collection', result);
    // close the connection to the database at this point
    return client.close();
  })
  .catch((err) => console.log(err))
})
.catch((err) => console.log(err));
