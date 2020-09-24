
// const Post = require('../database/models/Post')

// module.exports = async (req, res, next) => {
//   if (req.session.userId) {
//     await Post.findById(req.params.id)
//     next()
//     res.redirect("/");
// }
// }


// const Post = require('../database/models/Post')
 
// module.exports = (req, res) => {
    
//     const post = Post.findById(req.params.id)
//         .then((result) => {
            
//              res.render("edit", {
//                 post: result
//     });
//         }).catch((err)=> {console.log(err)})
// };


const path = require('path')
const Post = require('../database/models/Post')
 
module.exports = (req, res) => {
    const {
        image
    } = req.files

 
    image.mv(path.resolve(__dirname, '..', 'public/posts', image.name), (error) => {
        Post.updateOne({'image': `${image.name}` },{ $set:{
            ...req.body,
            image: `/posts/${image.name}`
        }}, (error, post) => {
            console.log(post)
            res.redirect("/blog");
        });
    })
}



// const path = require('path')
// const Post = require('../database/models/Post')
 
// module.exports = (req, res) => {
//     const {
//         image
//     } = req.files

//     const post = new Post();
        
    
 
//     image.mv(path.resolve(__dirname, '..', 'public/posts', image.name), (error) => {
//         Post.create({
//             post: req.post,
//             image: `/posts/${image.name}`
//         }, (error, post) => {
//             console.log(post)
//             res.redirect("/");
//         });
//     })
// }
