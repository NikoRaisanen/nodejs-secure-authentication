// Command to start local mongodb instance:
// mongod --dbpath="C:\Program Files\MongoDB\Server\5.0\bin" --bind_ip 127.0.0.1
const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')
const cookieParser = require('cookie-parser');
var uid = require('uid-safe');
const port = 8080;
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(logger)
const oneDay = 1000 * 60 * 60 * 24
// TODO exposing this for testing purposes, change later
// initialize session middleware
app.use(session({
    secret: "firstSecret",
    name: "testCookie",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
    store: MongoStore.create( { mongoUrl: 'mongodb://localhost:27017/app' } )
}));
app.use(cookieParser())
app.use('/users', userRouter)
app.use('/auth', authRouter)

// app.get('/', function(req, res) {
//     res.render('index', {text: 'World'});
//     console.log('Get request to main path')
// })



function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

app.get("/", (req, res) => {
    res.render("main/index", { name: "name" })
    console.log("rendering index.ejs")
})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});


// TODO:
// Let users sign in and learn how session management works in nodejs
// How to get the name of currently logged in user?