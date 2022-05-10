
exports.homePage = ((req, res, next)=>{
    // console.log(req.get('Cookie'))
    res.status(200).render('index',{
        pageTitle: 'Home',
    })
})

exports.contact = ((req, res, next)=>{
    res.status(200).render('contact',{
        pageTitle: 'Contact',
    })
})

exports.about = ((req, res, next)=>{
    res.status(200).render('about',{
        pageTitle: 'About',
    })
})

exports.news = ((req, res, next)=>{
    res.status(200).render('news',{
        pageTitle: 'News',
    })
})

exports.services = ((req, res, next)=>{
    res.status(200).render('services',{
        pageTitle: 'Services',
    })
})

exports.singleService = ((req, res, next)=>{
    res.status(200).render('single-pages/single-service',{
        pageTitle: 'Service',
    })
})

exports.singleNews = ((req, res, next)=>{
    res.status(200).render('single-pages/single-news',{
        pageTitle: 'News',
    })
})

exports.projects = ((req, res, next)=>{
    res.status(200).render('projects',{
        pageTitle: 'Projects',
    })
})
