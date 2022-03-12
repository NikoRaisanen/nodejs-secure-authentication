// File for various mongo operations
const mongo = require('mongodb');

client = mongo.MongoClient

const url = "mongodb://localhost:27017"
const dbName = "app"

function add_user(name) {
    client.connect(url, async function (err, client) {
        if (err) {
            console.log("Error occured")
        }
        const db = client.db(dbName);
        await db.collection("users").insertOne({ name: name })
        console.log(`Succesfully added user ${name} to the db`)
        client.close()
    })
}

function list_all_users(callback) {
    client.connect(url, async function (err, client) {
        if (err) {
            console.log("Error occured")
            return callback(new Error("Error in connect call in list_all_users"))
        }
        const db = client.db(dbName);
        allUsers = await db.collection("users").find().toArray()
        // console.log(cursor)
        client.close()
        callback(null, allUsers)
    })
}


function delete_user(name) {
    client.connect(url, async function (err, client) {
        if (err) {
            console.log("Error occured")
        }
        const db = client.db(dbName);
        await db.collection("users").deleteOne( { name: name } )
        console.log(`Successfully deleted user ${name}`)
        client.close()
    })
}


exports.list_all_users = list_all_users;
exports.add_user = add_user;
exports.delete_user = delete_user;
// delete_user("Niko")