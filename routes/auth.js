const express = require('express');
const session = require('express-session');
const mongoHelpers = require('../mongoHelpers');
const authHelpers = require('../authenticationHelpers');
const router = express.Router();


router.get('/login', (req, res) => {
    if (req.session.username) {
        res.send(`Hey ${req.session.username}, you're already logged in`)
    } else {
    res.render('auth/login')
    }
})

router.post('/login', (req, res) => {
    username = req.body.username
    password = req.body.password
    // check if username + password match
    // if match, then create session for the user
    console.log(`${username}:${password}`)
    mongoHelpers.user_login(username, password, (err, resp) => {
        if (err) {
            console.log(`Error in auth/login for user ${username}`)
        }
        
        if (resp.length === 1) {
            authHelpers.establish_session(req)
            res.redirect(`/users/${username}`)
        } else {
            res.render('auth/login', { invalid: true})
        }
    })
})

// router.get('/initsession', (req, res) => {
//     var session;
//     username = req.query.username
//     session = req.session
//     session.username = username
//     console.log(session)
//     req.session.save(err => {
//         if (err) {
//             console.log("Error saving session in /auth/initsession endpoint")
//         } else {
//             res.send(req.session.username)
//             console.log(`Saved session info for user ${username}`)
//         }
//     })
// })

router.get('/check', (req, res) => {
    console.log(req.session)
})

router.get('/logout', (req, res) => {
    const user = req.session.username
    req.session.destroy((err) => {
        if (err) {
            res.send(`Could not logout user ${user}`)
        } else {
            res.send(`Successfully logged out user ${user}`)
        }
    });
})

router.get('/signup', (req, res) => {
    res.render('auth/signup')
})

/* 
Things we need to check for user registration:

1. Username is not already in use
2. password matches password2
3. password is not empty (look up password recommendations)
4. Username does not contain special characters (sanitize)
*/
router.post('/signup', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const confirmPassword = req.body.password2
    var errorMsg = []
    
    var pswMatch = true
    if ( confirmPassword !== password ) {
        pswMatch = false
        errorMsg.push("The entered passwords do not match")
    }

    checkUser = mongoHelpers.get_user(username, (err, resp) => {
        if (err) {
            console.log("error checking to see if user already exists before registering")
        }
        // if block solely for generating error message
        if (resp.length !== 0) {
            errorMsg.push(`The username ${username} already exists`)
        }

        // if username is available and passwords match, create account
        if (resp.length === 0 && pswMatch === true) {
            console.log("We would create the user here")
            // add user to db here
            mongoHelpers.add_user(username, password, (err, resp) => {
                if (err) {
                    console.log("Error adding user to db after successful register")
                }

                res.send("Successfully created your account! You can now log in")
            })
        } else {
            // go back to signup page and show error
            console.log(JSON.stringify(errorMsg))
            res.render('auth/signup', {errorMsg: errorMsg})
        }
    })
    console.log(username, password, confirmPassword)
})

// router.get('initsession', (req, res) => {
//     var session;
//     session = req.session
//     session.username = "Niko"
//     console.log(session)
//     console.log("Made POST request to /auth/login endpoint")
//     req.session.save(err => {
//         if (err) {
//             console.log("Error saving session in /auth/login endpoint")
//         } else {
//             res.send(req.session.username)
//         }
//     })
// })
// TODO encrypted passwords

/* 
ROUTES THAT WE NEED IN THIS FILE (both new and existing users):

Existing users **
- enter credentials on login page
- query db to see if creds match
- give some kind of session token that maintains the user account
- redirect to user homepage

New users **
- enter user data into signup form
- write info to db
- redirect to login page
- enter credentials on login page
- query db to see if creds match
- give some kind of session token that maintains the user account
- redirect to user homepage





*/



module.exports = router;