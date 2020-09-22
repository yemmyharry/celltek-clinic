const mongoose = require('mongoose');
const marked = require('marked')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)
 
const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    markdown: String,
    username: String,
    image: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    sanitizedHtml: {
        type: String,
        required: true
      }
});

PostSchema.pre('validate', function(next) {
  
    if (this.markdown) {
      this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }
  
    next()
  })
 
const Post = mongoose.model('Post', PostSchema);
 
module.exports = Post;