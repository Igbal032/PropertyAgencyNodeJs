const mongoose = require("mongoose");
const Company = require("../models/company");
const Service = require("../models/service");
const Carousel = require("../models/carousel");
const News = require("../models/news");
const { validationResult } = require('express-validator/check');


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
  Service.find()
    .then((ser) => {
      if (ser) {
        res.render("ad1000/adding-service", {
          pageTitle: "Xidmətlər",
          services: ser,
          hasError: false,
          errorMessage: null,
          validationErrors: [],
          singleService : null
        });
      } else {
        res.render("ad1000/adding-service", {
          pageTitle: "Xidmətlər",
          services: null,
          hasError: false,
          errorMessage: null,
          validationErrors: [],
          singleService : null
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getService = (req, res, next) => {
  const serviceId = req.params.serviceId;
  Service.findById(serviceId)
    .then((ser) => {
      if (ser) {
        res.render("ad1000/single-service", {
          pageTitle: "Edit Service",
          service: ser,
        });
      } else {
        res.render("ad1000/single-service", {
          pageTitle: "Edit Service",
          services: null,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteService = (req, res, next) => {
  const serviceId = req.params.serviceId;
  console.log(serviceId);
  Service.deleteOne({id:serviceId})
    .then(() => {
      res.redirect("/ad1000/service");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.news = (req, res, next) => {
  News.find()
    .then((ser) => {
      if (ser) {
        res.render("ad1000/adding-news", {
          pageTitle: "Xəbərlər",
          news: ser,
        });
      } else {
        res.render("ad1000/adding-news", {
          pageTitle: "Xəbərlər",
          news: null,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deteleNews = (req, res, next) => {
  const newsId = req.params.serviceId;
  console.log(newsId);
  News.deleteOne({id:newsId})
    .then(() => {
      res.redirect("/ad1000/news");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.carousel = (req, res, next) => {
  Carousel.find()
    .then((crs) => {
      if (crs) {
        res.render("ad1000/adding-carousel", {
          pageTitle: "Karusel",
          carousels: crs,
        });
      } else {
        res.render("ad1000/adding-carousel", {
          pageTitle: "Karusel",
          carousels: null,
        });
      }
    })
    .catch((err) => {
      console.log(er);
    });
};

exports.deteleCarousel = (req, res, next) => {
  const carouselId = req.params.serviceId;
  console.log(carouselId);
  Carousel.findOneAndDelete(carouselId)
    .then(() => {
      res.redirect("/ad1000/carousel");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addCompany = (req, res, next) => {
  const name = req.body.cName;
  const email = req.body.cEmail;
  const phone = req.body.cPhone;
  const logo = req.file;
  const address = req.body.cAddress;
  const about = req.body.cAbout;

  const company = new Company({
    name: name,
    email: email,
    phone: phone,
    logo: logo.path,
    address: address,
    about: about,
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
        const address = req.body.cAddress;
        const about = req.body.cAbout;
        let logo = req.file;
        if (logo == undefined) {
          logo = " ";
        } else {
          logo = logo.path;
        }
        company.name = name;
        company.email = email;
        company.phone = phone;
        company.logo = logo;
        company.address = address;
        company.about = about;
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
  const sDescription = req.body.sDescription;
  let logo = req.file;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    Service.find()
    .then((ser) => {
      if (ser) {
        return res.render("ad1000/adding-service", {
          pageTitle: "Xidmətlər",
          services: ser,
          singleService:{
            name: name,
            title: title,
            imgPath: "logo",
            description: sDescription,
          },
          hasError: true,
          errorMessage: errors.array()[0].msg,
          validationErrors: errors.array()
        });
      } else {
        return res.render("ad1000/adding-service", {
          pageTitle: "Xidmətlər",
          services: null,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  if (logo == undefined) {
    logo = "NONE";
  } else {
    logo = logo.path;
  }
  const service = new Service({
    name: name,
    title: title,
    imgPath: logo,
    description: sDescription,
  });
  service
    .save()
    .then((result) => {
      console.log(result + " RESULT");
      res.redirect("/ad1000/service");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editService = (req, res, next) => {
  let oldImage = req.body.oldImage;
  const sId = req.body.sId;
  const name = req.body.sName;
  const title = req.body.sTitle;
  const description = req.body.sDescription;
  let cImg = req.file;
  if (cImg != undefined) {
    oldImage = cImg.path;
  } else {
    if (oldImage == undefined) {
      oldImage = "NONE";
    } 
    else {
      oldImage = oldImage;
    }
  }
  Service.findById(sId)
    .then((ser) => {
      if (ser) {
        ser.name = name;
        ser.title = title;
        ser.description = description;
        ser.imgPath = oldImage;
        ser
          .save()
          .then((ss) => {
            res.redirect("/ad1000/service");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.redirect("/ad1000/service");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addNews = (req, res, next) => {
  const name = req.body.nName;
  const title = req.body.nTitle;
  let nImg = req.file;
  const sDescription = req.body.nDescription;
  if (nImg == undefined) {
    nImg = "NONE";
  } else {
    nImg = nImg.path;
  }
  const newNews = new News({
    name: name,
    title: title,
    imgPath: nImg,
    description: sDescription,
  });
  newNews
    .save()
    .then((result) => {
      res.redirect("/ad1000/news");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addCarousel = (req, res, next) => {
  const title = req.body.title;
  const topic = req.body.topic;
  const description = req.body.description;
  let imgPath = req.file;
  if (imgPath == undefined) {
    imgPath = "NONE";
  } else {
    imgPath = imgPath.path;
  }
  const newCarousel = new Carousel({
    title: title,
    topic: topic,
    description: description,
    imgPath: imgPath,
  });
  newCarousel
    .save()
    .then((car) => {
      res.redirect("/ad1000/carousel");
    })
    .catch((err) => {
      console.log(err);
    });
};
