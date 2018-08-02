const assert = require('assert');

// it's required to export several methods, because it is a node module,
// the first method is insertDocument, that takes 4 parameters:
// db - the MongoDB database connection within Node application,
// document - document, which has to be inserted,
// collection - where the document has to be inserted,
// callback - function, that is called when the operation is completed
exports.insertDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  coll.insert(document, (err, result) => {
    assert.equal(err, null);
    // result parameter has result property (result.result)
    // and result property contains property n (result.n), 
    // that shows how many documents have been inserted
    console.log('Inserted ' + result.result.n + ' documents into the collection ' + collection);
    callback(result);
  });
};

// findDocuments method is used to search in collection and find all document
exports.findDocuments = (db, collection, callback) => {
  const coll = db.collection(collection);
  coll.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    callback(docs);
  });
};

exports.removeDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  coll.deleteOne(document, (err,result) => {
    assert.equal(err, null);
    console.log('Removed the document ', document);
    callback(result);
  });
};

exports.updateDocument = (db, document, update, collection, callback) => {
  const coll = db.collection(collection);
  // 1st parameter - document, that needs to be updated,
  // 2nd parameter - fields of the document, that need to be updateds
  coll.updateOne(document, { $set: update }, null, (err, result) => {
    assert.equal(err, null);
    console.log('Updated the document with ', update);
    callback(result);
  });
};
