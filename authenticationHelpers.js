// File to do the heavy-lifting authentication

async function establish_session(req) {
    var userSession;
    username = req.body.username
    userSession = req.session
    userSession.username = username
    console.log(userSession)
    req.session.save(err => {
        if (err) {
            console.log("Error saving session in /auth/initsession endpoint")
        } else {
            console.log(`Saved session info for user ${username}`)
        }
    })
}

exports.establish_session = establish_session;