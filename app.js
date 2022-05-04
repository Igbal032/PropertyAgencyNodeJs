const path = require('path');
const mongoose = require('mongoose')

const express = require('express')
const bodyParser = require('body-parser')

const homeRouter = require('./routes/HomeRoute')
const adminRouter = require('./routes/AdminRoute')

const app = express()

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(adminRouter)
app.use(homeRouter)

app.use((req, res, next) => {
    res.status(200).render('errors/404')
});


mongoose.connect('mongodb://localhost:27017/property')
.then(result => {
    app.listen(3000);
    console.log("Connected")
  })
  .catch(err => {
    console.log(err);
  });