const mongo = require('mongodb');

const client = mongo.MongoClient

const url = "mongodb://localhost:27017"
const dbName = "app"
client.connect(url, function (err, client) {
    if (err) {
        console.log("Error occured")
    }
    
    const db = client.db(dbName)
    db.collection("users").insertMany([
        { name: "Joe" },
        { name: "Bob" },
        { name: "Niko" }
    ])
    // db.collection("users", (err, collection) => {
    //     if (err) {
    //         console.log("Error occured when calling db.collection")
    //     }
    //     collection.insert( {name: "Joe"} );
    //     collection.insert( {name: "Bob"} );
    //     collection.insert( {name: "Niko"} );
    // });

    console.log("Printing here")
    client.close()
})