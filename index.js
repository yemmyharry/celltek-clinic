require('dotenv').config()
const expressEdge = require("express-edge");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require("connect-flash");
const edge = require("edge.js");
const methodOverride = require("method-override");
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')
const storePost = require('./middleware/storePost');
const auth = require("./middleware/auth");

const logoutController = require("./controllers/logout");
const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/blogHome');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const createUserController = require("./controllers/createUser");
const storeUserController = require('./controllers/storeUser');
const loginController = require("./controllers/login");
const loginUserController = require('./controllers/loginUser');
const getEditPostController = require('./controllers/getEditPost')
const putEditPostController = require('./controllers/putEditPost')
const Post = require('./database/models/Post')

const app = new express();
 
// mongoose.connect(process.env.DATABASE, { useNewUrlParser: true ,'useFindAndModify': false, 'useCreateIndex': true, useUnifiedTopology: true})
//     .then(() => 'You are now connected to Mongo!')
//     .catch(err => console.error('Something went wrong', err));

mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true ,'useFindAndModify': false, 'useCreateIndex': true, useUnifiedTopology: true})
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err));
 
const mongoStore = connectMongo(expressSession);
 
app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));

// app.use(redirectToHTTPS());
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));

app.use(methodOverride("_method"))
app.use(connectFlash());
app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge.engine);
app.set('views', __dirname + '/views');

app.use('*', (req, res, next) => {
  edge.global('auth', req.session.userId)
  next()
});
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
  
app.use('/posts/store', storePost)
 


app.get('/', (req, res) => {
    res.render("home")});

app.get("/blog", homePageController);
app.get("/post/:id", getPostController);
app.get("/edit/:id", getEditPostController);
app.put("/post/:id", putEditPostController);
app.get("/posts/new", auth, createPostController);
app.post("/posts/store", auth, storePost, storePostController);
app.get("/auth/login", redirectIfAuthenticated, loginController);
app.post("/users/login", redirectIfAuthenticated, loginUserController);
app.get("/auth/register", redirectIfAuthenticated, createUserController);
app.post("/users/register", redirectIfAuthenticated, storeUserController);
app.get("/auth/logout", redirectIfAuthenticated, logoutController);
app.delete('/post/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id)
  res.redirect('/blog')
})


app.listen(process.env.PORT || 4000, () => {
  console.log("App listening on port " + process.env.PORT);
});  
