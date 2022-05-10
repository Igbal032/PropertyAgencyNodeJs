const Company = require('../models/company');

exports.homePage = ((req, res, next)=>{
    Company.findOne().then((company) => {
        if(company){
          console.log(company.email + " email")
          return  res.status(200).render('index',{
              pageTitle: 'Home',
              company:company
          })
        }
        else{
            return  res.status(200).render('index',{
                pageTitle: 'Home',
                company:null
            })
        }
    })
    .catch(err=>{
        console.log(err)
    })
})

exports.contact = ((req, res, next)=>{
    res.status(200).render('contact',{
        pageTitle: 'Contact',
        company:null
    })
})

exports.about = ((req, res, next)=>{
    res.status(200).render('about',{
        pageTitle: 'About',
        company:null
    })
})

exports.news = ((req, res, next)=>{
    res.status(200).render('news',{
        pageTitle: 'News',
        company:null
    })
})

exports.services = ((req, res, next)=>{
    res.status(200).render('services',{
        pageTitle: 'Services',
        company:null
    })
})

exports.singleService = ((req, res, next)=>{
    res.status(200).render('single-pages/single-service',{
        pageTitle: 'Service',
        company:null
    })
})

exports.singleNews = ((req, res, next)=>{
    res.status(200).render('single-pages/single-news',{
        pageTitle: 'News',
        company:null
    })
})

exports.projects = ((req, res, next)=>{
    res.status(200).render('projects',{
        pageTitle: 'Projects',
        company:null
    })
})
