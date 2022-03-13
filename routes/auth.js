const express = require('express');
const mongoHelpers = require('../mongoHelpers')
const router = express.Router()

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