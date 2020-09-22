const Post = require('../database/models/Post')
 
module.exports = (req, res) => {
    const posts = Post.find().sort({ createdAt: -1 })
    .then((result) => {
            res.render("index", {
                posts: result
            });
    })
    .catch((err) => {
        console.log(err)
    })
}