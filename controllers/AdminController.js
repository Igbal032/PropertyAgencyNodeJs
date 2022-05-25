const mongoose = require("mongoose");
const company = require("../models/company");
const Company = require("../models/company");
const Service = require("../models/service");
const Carousel = require("../models/carousel");
const News = require("../models/news");

exports.home = (req, res, next) => {
  Company.findOne()
    .then((company) => {
      res.render("ad1000/home", {
        pageTitle: "Admin Panel",
        company: company,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.service = (req, res, next) => {
  Service.find().then(ser=>{
    if(ser){
      res.render("ad1000/adding-service", {
        pageTitle: "Xidmətlər",
        services: ser
      });
    }
    else{
      res.render("ad1000/adding-service", {
        pageTitle: "Xidmətlər",
        services: null
      });
    }
  }).catch((err) => {
    console.log(err);
  });
};

exports.getService = (req, res, next) => {
  const serviceId = req.params.serviceId;
  Service.findById(serviceId).then(ser=>{
    if(ser){
      res.render("ad1000/single-service", {
        pageTitle: "Edit Service",
        service: ser
      });
    }
    else{
      res.render("ad1000/single-service", {
        pageTitle: "Edit Service",
        services: null
      });
    }
  }).catch((err) => {
    console.log(err);
  });
};

exports.deleteService = (req, res, next) => {
  const serviceId = req.params.serviceId;
  console.log(serviceId)
  Service.findOneAndDelete(serviceId).then(()=>{
    res.redirect("/ad1000/service")
  }).catch((err) => {
    console.log(err);
  });
};

exports.news = (req, res, next) => {
  News.find().then(ser=>{
    if(ser){
      res.render("ad1000/adding-news", {
        pageTitle: "Xəbərlər",
        news: ser
      });
    }
    else{
      res.render("ad1000/adding-news", {
        pageTitle: "Xəbərlər",
        news: null
      });
    }
  }).catch((err) => {
    console.log(err);
  });
};

exports.deteleNews = (req, res, next) => {
  const newsId = req.params.serviceId;
  console.log(newsId)
  News.findOneAndDelete(newsId).then(()=>{
    res.redirect("/ad1000/news")
  }).catch((err) => {
    console.log(err);
  });
};

exports.carousel = (req, res, next) => {
  Carousel.find().then(crs=>{
    if(crs){
      res.render("ad1000/adding-carousel", {
        pageTitle: "Karusel",
        carousels:crs
      });
    }
    else{
      res.render("ad1000/adding-carousel", {
        pageTitle: "Karusel",
        carousels:null
      });
    }
  })
  .catch(err=>{
    console.log(er)
  })
};


exports.deteleCarousel = (req, res, next) => {
  const carouselId = req.params.serviceId;
  console.log(carouselId)
  Carousel.findOneAndDelete(carouselId).then(()=>{
    res.redirect("/ad1000/carousel")
  }).catch((err) => {
    console.log(err);
  });
};


exports.addCompany = (req, res, next) => {
  const name = req.body.cName;
  const email = req.body.cEmail;
  const phone = req.body.cPhone;
  const logo = req.file;
  const address = req.body.cAddress;

  const company = new Company({
    name: name,
    email: email,
    phone: phone,
    logo: logo.path,
    address: address,
  });

  company
    .save()
    .then((result) => {
      res.render("ad1000/home", {
        pageTitle: "Admin Panel",
        company: company,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editCompany = (req, res, next) => {
  const cId = req.body.cId;
  const name = req.body.cName;

  Company.findById(cId)
    .then((company) => {
      if (company) {
        const email = req.body.cEmail;
        const phone = req.body.cPhone;
        const logo = req.file;
        const address = req.body.cAddress;
        company.name = name;
        company.email = email;
        company.phone = phone;
        console.log(logo)
        company.logo = logo.path;
        company.address = address;
        company
          .save()
          .then((comp) => {
            res.render("ad1000/home", {
              pageTitle: "Admin Panel",
              company: comp,
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
  const name = req.body.sName;
  const title = req.body.sTitle;
  const cImg = req.file;
  const sDescription = req.body.sDescription;

  const service = new Service({
    name: name,
    title: title,
    imgPath: cImg.path,
    description: sDescription,
  });
  service
    .save()
    .then((result) => {
      console.log(result + " RESULT")
      res.redirect("/ad1000/service")
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editService = (req, res, next) => {
  const cImg = req.file;
  console.log(cImg)
  let oldImage = req.body.oldImage;
  const sId = req.body.sId;
  const name = req.body.sName;
  const title = req.body.sTitle;
  const description = req.body.sDescription;
  if(cImg!=undefined){
    oldImage = cImg.path;
  }
  Service.findById(sId).then(ser=>{
    if(ser){
        ser.name = name;
        ser.title = title;
        ser.description = description;
        ser.imgPath = oldImage;
        ser.save().then(ss=>{
          res.redirect("/ad1000/service")
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else{
      res.redirect("/ad1000/service")
    }
  })
  .catch((err) => {
    console.log(err);
  });
};


exports.addNews = (req, res, next) => {
  const name = req.body.nName;
  const title = req.body.nTitle;
  const nImg = req.file;
  const sDescription = req.body.nDescription;

  const newNews = new News({
    name: name,
    title: title,
    imgPath: nImg.path,
    description: sDescription,
  });
  newNews
    .save()
    .then((result) => {
      res.redirect("/ad1000/news")
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addCarousel = (req, res, next) => {
  const title = req.body.title;
  const topic = req.body.topic;
  const description = req.body.description;
  const imgPath = req.file;

  const newCarousel = new Carousel({
    title:title,
    topic:topic,
    description:description,
    imgPath:imgPath.path,
  });
  newCarousel
  .save()
  .then(car=>{
    res.redirect("/ad1000/carousel")
  })
  .catch(err=>{
    console.log(err)
  })
};
