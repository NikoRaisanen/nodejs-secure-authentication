// File for various mongo operations
const mongo = require('mongodb');

client = mongo.MongoClient

const url = "mongodb://localhost:27017"
const dbName = "app"

function add_user(name) {
    client.connect(url, function (err, client) {
        if (err) {
            console.log("Error occured")
        }
        const db = client.db(dbName);
        db.collection("users").insertOne({ name: name })
        console.log(`Succesfully added user ${name} to the db`)
    })
    client.close()
}

function list_all_users(callback) {
    client.connect(url, async function (err, client) {
        if (err) {
            console.log("Error occured")
            return callback(new Error("Error in connect call in list_all_users"))
        }
        console.log("no err")
        const db = client.db(dbName);
        allUsers = await db.collection("users").find().toArray()
        // console.log(cursor)
        client.close()
        callback(null, allUsers)
    })
    console.log("final print")
}

var text = list_all_users( function(err, resp) {
    if (err) {
        console.log("ERROR")
    }
    console.log(resp)
    // console.log(`RESPONSE\n${response}`)
})
// console.log(text)