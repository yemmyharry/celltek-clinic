const Post = require('../database/models/Post')
 
module.exports = (req, res) => {
    
    const post = Post.findById(req.params.id)
        .then((result) => {
            
             res.render("post", {
                post: result
    });
        }).catch((err)=> {console.log(err)})
};