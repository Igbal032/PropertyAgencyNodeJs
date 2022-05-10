exports.error404 = (req, res, next)=>{
    res.render('errors/404',{
        pageTitle: 'Error',
    })
}