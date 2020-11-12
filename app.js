const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'localhost:27017';

// Database Name
const dbName = 'staging-1db';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
  
    const db = client.db(dbName);
  
    insertDocuments(db, function() {
        
          client.close();
        });
      });
  
const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('visits');
  }

  