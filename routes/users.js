// Put static routes above dynamic routes
const express = require('express');
const mongoHelpers = require('../mongoHelpers')
const router = express.Router()

router.get('/', function(req, res) {
    const name = req.query.name || "Niko"
    res.send(`Hello ${name}`)
})

router.get('/all', function(req, res) {
    mongoHelpers.list_all_users((err, resp) => {
        if (err) {
            console.log("Error occured 123")
        }
        console.log(resp)
        var users = []
        resp.forEach(user => {
            users.push(user.name)
        });
        console.log(users)
        res.render("users/all", {users: users})
    })
})

router.get('/new', function(req, res) {
    res.render("users/new", { name: "Test" })
})

// TODO
// Add check to see if name already exists in db
router.post('/new', (req, res) => {
    console.log("Made post request to users/new endpoint")
    mongoHelpers.get_user(req.body.name, (err, resp) => {
        if ( err ) {
            console.log(err)
        } else if ( resp.length !== 0 ) {
            console.log(`The user ${req.body.name} already exists`)
            res.render("users/new", { existingUser: req.body.name })
        } else {
            mongoHelpers.add_user(req.body.name)
        }
    })
})

router.route("/:name").get((req, res) => {
    user = mongoHelpers.get_user(req.params.name, (err, resp) => {
        if ( err ) {
            console.log("Error when calling get_user from users.js route")
            res.render("users/new", { attemptedUser: req.params.name })
        } else if ( resp.length != 1 ) {
            console.log(`Unexpected len of db query: ${resp.length}`)
            res.render("users/new", { attemptedUser: req.params.name })
        } else {
            res.render("users/userpage", { name: resp[0].name })
            console.log(`len of db query: ${resp.length}`)
        }
    })
})
module.exports = router