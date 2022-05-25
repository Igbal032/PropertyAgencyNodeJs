const Company = require("../models/company");
const News = require("../models/news");
const Services = require("../models/service");
const Carousel = require("../models/carousel");
const company = require("../models/company");



exports.homePage = (req, res, next) => {
    let carousel;
    let servicesRES;
    let newsRes;
    News.find()
    .then((allNews) => {
      if (allNews) {
        newsRes = allNews
      } else {
        newsRes = null
      }
    })
    Services.find().then(ser=>{
      if(ser){
        servicesRES = ser
      }
      else{
        servicesRES = null
      }
    })
  Company.findOne()
    .then((company) => {
      if (company) {
        Carousel.find().then(carous=>{
            carousel = carous;
            return res.status(200).render("index", {
                pageTitle: "Home",
                company: company,
                carousels:carousel,
                services:servicesRES,
                allNews2:newsRes
              });
        })
        .catch(err=>{
            console.log(err)
        })
      } else {
        return res.status(200).render("index", {
          pageTitle: "Home",
          company: null,
          carousels:carousel,
          services:servicesRES
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.contact = (req, res, next) => {
  Company.findOne()
    .then((company) => {
      if (company) {
        return res.status(200).render("contact", {
          pageTitle: "Contact",
          company: company,
        });
      } else {
        return res.status(200).render("contact", {
          pageTitle: "Contact",
          company: null,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.about = (req, res, next) => {
  Company.findOne()
    .then((company) => {
      if (company) {
        return res.status(200).render("about", {
            pageTitle: "About",
          company: company,
        });
      } else {
        return res.status(200).render("about", {
            pageTitle: "About",
          company: null,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.news = (req, res, next) => {
    let company; 
    Company.findOne()
    .then((company2) => {
      if (company2) {
        console.log(company2.email+" salam")
        company = company2;
      }
    News.find()
    .then((ser) => {
      if (ser) {
        res.status(200).render("news", {
          pageTitle: "News",
          company: company,
          allNews:ser
        });
      } else {
        res.status(200).render("news", {
          pageTitle: "News",
          allNews:null,
          company: company
        });
      }
    })
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.services = (req, res, next) => {
    let company; 
    Company.findOne()
    .then((company2) => {
      if (company2) {
        console.log(company2.email+" salam")
        company = company2;
      }
      Services.find().then(ser=>{
        if(ser){
            res.status(200).render("services", {
                pageTitle: "Services",
                company: company,
                allServices:ser
              });
        }
        else{
            res.status(200).render("services", {
                pageTitle: "Services",
                company: company,
                allServices:null
              });
        }
      })
      .catch(err=>{
          console.log(err)
      })
    })
    .catch((err) => {
      console.log(err);
    });
  
};

exports.singleService = (req, res, next) => {
  res.status(200).render("single-pages/single-service", {
    pageTitle: "Service",
    company: null,
  });
};

exports.singleNews = (req, res, next) => {
  const newsId = req.params.newsId;
  Company.findOne().then(company=>{
    News.findById(newsId).then(news=>{
      if(news){
        res.status(200).render("single-pages/single-news", {
          pageTitle: "Xəbərlər",
          company: company,
          news:news
        });
      }
      else{
        res.status(200).render("single-pages/single-news", {
          pageTitle: "Xəbərlər",
          company: null,
          news:null
        });
      }
    })
    .catch(err=>{
      console.log(err)
    })
  })
  .catch(err=>{
    console.log(err)
  })
  
};

exports.projects = (req, res, next) => {
  res.status(200).render("projects", {
    pageTitle: "Projects",
    company: null,
  });
};
