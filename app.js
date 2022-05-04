const path = require('path');

const express = require('express')
const bodyParser = require('body-parser')

const homeRouter = require('./routes/HomeRoute')

const app = express()

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(homeRouter)

app.listen(3001)  

app.use((req, res, next) => {
    res.status(200).render('errors/404')
});