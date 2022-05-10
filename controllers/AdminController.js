const mongoose = require("mongoose");
const company = require("../models/company");
const Company = require("../models/company");

exports.home = (req, res, next) => {
  Company.findOne().then((company) => {
      res.render("ad1000/home", {
        pageTitle: "Admin Panel",
        company: company
      });
  })
  .catch(err=>{
      console.log(err)
  });
};

exports.service = (req, res, next) => {
  res.render("ad1000/adding-service", {
    pageTitle: "Xidmətlər",
  });
};

exports.news = (req, res, next) => {
  res.render("ad1000/adding-news", {
    pageTitle: "Xəbərlər",
  });
};

exports.carousel = (req, res, next) => {
  res.render("ad1000/adding-carousel", {
    pageTitle: "Karusel",
  });
};

exports.addCompany = (req, res, next) => {
  const name = req.body.cName;
  const email = req.body.cEmail;
  const phone = req.body.cPhone;
  const logo = req.body.cLogo;
  const address = req.body.cAddress;

  const company = new Company({
    name: name,
    email: email,
    phone: phone,
    logo: "logo",
    address: address,
  });

  company
    .save()
    .then((result) => {
      res.render("ad1000/home", {
        pageTitle: "Admin Panel",
        company: company
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editCompany = (req, res, next) => {
    const cId = req.body.cId;
    console.log(cId + " -- Id")
    const name = req.body.cName;
    console.log(name + " -- Name")

    Company.findById(cId).then(company=>{

        if(company){
            const email = req.body.cEmail;
            const phone = req.body.cPhone;
            const logo = req.body.cLogo;
            const address = req.body.cAddress;
            company.name= name;
            company.email= email;
            company.phone= phone;
            company.logo= "logo";
            company.address= address;
            company
            .save()
            .then((comp) => {
              res.render("ad1000/home", {
                pageTitle: "Admin Panel",
                company: comp
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addService = (req, res, next) => {
  res.render("ad1000/adding-carousel", {
    pageTitle: "Karusel",
  });
};

exports.addNews = (req, res, next) => {
  res.render("ad1000/adding-carousel", {
    pageTitle: "Karusel",
  });
};
exports.addCarousel = (req, res, next) => {
  res.render("ad1000/adding-carousel", {
    pageTitle: "Karusel",
  });
};
