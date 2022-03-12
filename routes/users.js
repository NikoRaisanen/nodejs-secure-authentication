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
    res.render("users/new", { firstName: "Test" })
})

router.post('/new', (req, res) => {
    console.log("Made post request to /new endpoint")
    mongoHelpers.add_user(req.body.name)
})

router.route("/:id").get((req, res) => {
    console.log(req.user)
    res.send(`Get User With ID ${req.params.id}`)
}).put((req, res) => {
    res.send(`Update user with id ${req.params.id}`)
}).delete((req, res) => {
    res.send(`Delete user with id ${req.params.id}`)
})

const users = [{ name: "Kyle"}, { name: "Sally "}]
router.param("id", (req, res, next, id) => {
    req.user = users[id]
    console.log(id)
    next()
})
module.exports = router