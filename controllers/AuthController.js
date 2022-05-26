const bcrypt = require("bcryptjs");
const Account = require("../models/account");
const { validationResult } = require("express-validator/check");

exports.getRegAd1000 = (req, res, next) => {
  return res.render("ad1000/register", {
    pageTitle: "Register",
    errorMessage: null,
    oldInput: null,
    hasError: false,
    validationErrors: [],
  });
};

exports.getLogAd1000 = (req, res, next) => {
  return res.status(422).render("ad1000/login", {
    pageTitle: "Login",
    errorMessage: null,
    oldInput: null,
    hasError: false,
    validationErrors: [],
  });
};

exports.logAd1000 = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("ad1000/register", {
      pageTitle: "Login",
      errorMessage: errors.array()[0].msg,
      hasError: true,
      oldInput: {
        email: email,
        password: password,
      },
      validationErrors: errors.array(),
    });
  }
  Account.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(422).render("ad1000/login", {
          pageTitle: "Login",
          errorMessage: "Invalid email or password.",
          hasError: false,
          oldInput: {
            email: email,
            password: password,
          },
          validationErrors: [],
        });
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/ad1000/index");
            });
          }
          return res.status(422).render("ad1000/login", {
            pageTitle: "Login",
            errorMessage: "Invalid email or password.",
            hasError: true,
            oldInput: {
              email: email,
              password: password,
            },
            validationErrors: [],
          });
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/ad1000/logAd1000");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.regAd1000 = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password.trim();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("ad1000/register", {
      pageTitle: "Register",
      errorMessage: errors.array()[0].msg,
      hasError: true,
      oldInput: {
        email: email,
        password: password,
      },
      validationErrors: errors.array(),
    });
  }
  Account.findOne({ email: email })
    .then((account) => {
      if (account) {
        return res.status(422).render("ad1000/register", {
          pageTitle: "Register",
          errorMessage: "Bu istifadəçi artıq mövcuddur..",
          hasError: false,
          oldInput: {
            email: email,
            password: password,
          },
          validationErrors: [],
        });
      } else {
        bcrypt
          .hash(password, 12)
          .then((hashedPassword) => {
            const user = new Account({
              email: email,
              password: hashedPassword,
            });
            return user.save();
          })
          .then((result) => {
            res.redirect("/ad1000/logAd1000");
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/ad1000/logAd1000");
  });
};
