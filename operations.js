const assert = require('assert');

// it's required to export several methods, because it is a node module,
// the first method is insertDocument, that takes 4 parameters:
// db - the MongoDB database connection within Node application,
// document - document, which has to be inserted,
// collection - where the document has to be inserted,
// callback - function, that is called when the operation is completed
exports.insertDocument = (db, document, collection) => {
  const coll = db.collection(collection);
  return coll.insert(document);
};

// findDocuments method is used to search in collection and find all document
exports.findDocuments = (db, collection) => {
  const coll = db.collection(collection);
  return coll.find({}).toArray();
};

exports.removeDocument = (db, document, collection) => {
  const coll = db.collection(collection);
  return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection) => {
  const coll = db.collection(collection);
  return coll.updateOne(document, { $set: update }, null);
};
