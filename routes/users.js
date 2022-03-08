// Put static routes above dynamic routes
const express = require('express');
const router = express.Router()

router.get('/', function(req, res) {
    const name = req.query.name || "Niko"
    res.send(`Hello ${name}`)
})

router.get('/all', function(req, res) {
    users.forEach((user) => {
        console.log(user)
    })
    res.render("users/all", { user1: users[0].name, user2: JSON.stringify(users[1].name)})
})

router.get('/new', function(req, res) {
    res.render("users/new", { firstName: "Test" })
})

router.post('/', (req, res) => {
    const isValid = true
    if (isValid) {
        users.push({ firstName: req.body.firstName })
        res.redirect(`/users/${users.length - 1}`)
    } else {
        console.log("Error")
        res.render('users/new', { firstName: req.body.firstName })
    }
    console.log(req.body.firstName)
    res.send("Hi")
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