
exports.homePage = ((req, res, next)=>{
    res.status(200).render('index')
})

exports.contact = ((req, res, next)=>{
    res.status(200).render('contact')
})

exports.about = ((req, res, next)=>{
    res.status(200).render('about')
})

exports.news = ((req, res, next)=>{
    res.status(200).render('news')
})

exports.services = ((req, res, next)=>{
    res.status(200).render('services')
})

exports.singleService = ((req, res, next)=>{
    res.status(200).render('single-pages/single-service')
})

exports.singleNews = ((req, res, next)=>{
    res.status(200).render('single-pages/single-news')
})

exports.projects = ((req, res, next)=>{
    res.status(200).render('projects')
})
