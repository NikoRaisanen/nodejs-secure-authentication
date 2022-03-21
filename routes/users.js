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
            users.push(user.username)
        });
        console.log(users)
        res.render("users/all", {users: users})
    })
})

router.post('/delete', function(req, res) {
    currentUser = req.session.username
    mongoHelpers.delete_user(currentUser, (err, resp) => {
        if (err) {
            res.send(`Unable to delete user account for ${currentUser}`)
        } else {
            req.session.destroy()
            res.send("Successfully deleted your account!")
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