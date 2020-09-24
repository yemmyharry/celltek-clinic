const User = require('../database/models/User')
 
module.exports = (req, res, next) => {
    if (req.session.User) {
        return res.redirect('/blog')
    }
 
    next()
}