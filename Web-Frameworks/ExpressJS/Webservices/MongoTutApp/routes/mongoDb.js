let express = require('express');
let router = express.Router();
let MongoDbClient = require('mongodb').MongoClient; // Use mongoclient static class to manipulate databases
let url = "mongodb://localhost:27017/tutdb"; //Syntax= "mongodb://ip_address:port/databaseToConnectTo"


//Create database
MongoDbClient.connect(url, function(err,db){
console.log("Database created");
if(err) throw err;
db.close();
});

/* 
// Create a collection
MongoDbClient.connect(url,function(err,db){
    if (err) throw err;
    let dbInUse = db.db('tutdb');

    dbInUse.dropCollection('users'); //Delete pottential existing collection to avoid error
    console.log("db pottentially deleted");
    dbInUse.createCollection('users', function(err,result){
       if(err) throw err;
       console.log("Collection created succesfully");
    });
    db.close();
});
*/

// Insert into collection
MongoDbClient.connect(url,function(err,db){
    if (err) {
        throw err;
    }
    let currentDb = db.db("tutdb");
    let insertedObject = {
        name: "Fias",
        age: 25,
        birthdate: "2/1/1996",
        occupation: "Student",
        married: false
    }
    currentDb.collection("users").insertOne(insertedObject,function(err,result){
        if(err) throw er;
        console.log(result.result);
    });

    db.close();
});

//insertMAny

MongoDbClient.connect(url,function(err,db){
    if(err) throw err;
    let currentDb = db.db("tutdb");
    let documents = [
        { name: 'John', address: 'Highway 71'},
        { name: 'Peter', address: 'Lowstreet 4'},
        { name: 'Amy', address: 'Apple st 652'},
        { name: 'Hannah', address: 'Mountain 21'},
        { name: 'Michael', address: 'Valley 345'},
        { name: 'Sandy', address: 'Ocean blvd 2'},
        { name: 'Betty', address: 'Green Grass 1'},
        { name: 'Richard', address: 'Sky st 331'},
        { name: 'Susan', address: 'One way 98'},
        { name: 'Vicky', address: 'Yellow Garden 2'},
        { name: 'Ben', address: 'Park Lane 38'},
        { name: 'William', address: 'Central st 954'},
        { name: 'Chuck', address: 'Main Road 989'},
        { name: 'Viola', address: 'Sideway 1633'}
      ];

    currentDb.collection("users").insertMany(documents,function(err,result){
        if(err) throw err; 
        console.log(result);
        
    });
    db.close()
})



module.exports= router;