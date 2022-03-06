const express = require('express');
const app = express();
const port = 8080;
const userRouter = require('./routes/users')

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(logger)
app.use('/users', userRouter)

// app.get('/', function(req, res) {
//     res.render('index', {text: 'World'});
//     console.log('Get request to main path')
// })



function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}


app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});