const Post = require('../database/models/Post')

// module.exports = (req, res) => {
//   Post.findByIdAndDelete(req.params.id)
//   .then((result) => {
//       res.json({ redirect: '/'})
//   })
//   .catch(err => console.log(err))
    
// };

module.exports = async (req, res) => {
  if (req.session.userId) {
    const article = await Post.findById(req.params.id)
    res.render("edit" , {
        article: article
    });
}
}