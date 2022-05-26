module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/ad1000/logAd1000');
    }
    next();
}