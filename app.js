const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/ErrorController');
const homeRouter = require('./routes/home');
const adminRouter = require('./routes/admin');

const app = express()

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/ad1000', adminRouter);
app.use(homeRouter)

app.use(errorController.error404);

// app.use((req, res, next) => {
//     res.status(200).render('errors/404')
// });


mongoose.connect('mongodb://localhost:27017/property')
.then(result => {
    app.listen(3003);
    console.log("Connected")
  })
  .catch(err => {
    console.log(err);
  });