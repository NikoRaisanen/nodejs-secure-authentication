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
            // Check if the logged in user is requesting their own page, or another person's page
            // They should have more permissions on their profile than an other user's profile
            console.log("SESSION USER:" + req.session.username)
            // Initialize as false for safe default
            var isCurrentUser = false
            if (req.session.username === resp[0].username) {
                console.log(`Session cookie and requested page line up for user ${req.session.username}`)
                isCurrentUser = true
            } else {
                console.log("NO MATCH")
                isCurrentUser = false
            }


            res.render("users/userpage", { username: resp[0].username, isCurrentUser: isCurrentUser })
            console.log(`len of db query: ${resp.length}`)
        }
    })
})
module.exports = router