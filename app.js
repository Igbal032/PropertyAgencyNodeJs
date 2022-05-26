const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const errorController = require("./controllers/ErrorController");
const homeRouter = require("./routes/home");
const adminRouter = require("./routes/admin");
const { randomInt } = require("crypto");
const csrf = require('csurf');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();
const csrfProtection = csrf();


const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/property",
  collection: 'sessions'
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => { 
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null,file.filename + randomInt(2000)+'-'+ randomInt(2000)+new Date().toDateString()+file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/images",express.static(path.join(__dirname, "images")));


app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(csrfProtection);


app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/ad1000", adminRouter);
app.use(homeRouter);

app.use(errorController.error404);

mongoose
  .connect("mongodb://localhost:27017/property")
  .then((result) => {
    app.listen(3005);
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });
