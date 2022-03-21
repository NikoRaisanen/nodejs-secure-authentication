// File for various mongo operations
const mongo = require('mongodb');

client = mongo.MongoClient

const url = "mongodb://localhost:27017"
const dbName = "app"

function add_user(username, password, callback) {
    client.connect(url, async function (err, client) {
        if (err) {
            console.log("Error occured")
        }
        const db = client.db(dbName);
        await db.collection("login").insertOne({ username: username, password: password})
        console.log(`Succesfully added user ${username} to the db`)
        client.close()
        callback(null, "Success")
    })
}

function get_user(name, callback) {
    client.connect(url, async function (err, client) {
        if (err) {
            console.log("Error occured")
        }
        const db = client.db(dbName);
        user = await db.collection("login").find({ username: name }).toArray()

        if (user.length > 0) {
            console.log(`Succesfully found user ${name} in the db`)
        } else { 
            console.log(`Could NOT find ${name} in the db`)
        }
        client.close()
        callback(null, user)
    })
}

function list_all_users(callback) {
    client.connect(url, async function (err, client) {
        if (err) {
            console.log("Error occured")
            return callback(new Error("Error in connect call in list_all_users"))
        }
        const db = client.db(dbName);
        allUsers = await db.collection("login").find().toArray()
        // console.log(cursor)
        client.close()
        callback(null, allUsers)
    })
}


function delete_user(name, callback) {
    client.connect(url, async function (err, client) {
        if (err) {
            console.log("Error occured")
        }
        const db = client.db(dbName);
        await db.collection("login").deleteOne( { username: name } )
        console.log(`Successfully deleted user ${name}`)
        client.close()
        callback(null, "Success")
    })
}

function user_login(username, password, callback) {
    client.connect(url, async function (err, client) {
        if (err) {
            console.log("Error logging in")
        }
        const db = client.db(dbName)
        result = await db.collection("login").find( { username: username, password: password } ).toArray()
        client.close()
        callback(null, result)
    })
}



exports.list_all_users = list_all_users;
exports.add_user = add_user;
exports.delete_user = delete_user;
exports.get_user = get_user;
exports.user_login = user_login;
// delete_user("Niko")