var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./posts")
const passport = require("passport");
const upload = require("./multer");

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/",  function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login",  function (req, res, next) {
  res.render("login", {error: req.flash("error")});
});

router.get("/profile", isloggedIn, async function(req, res){
  const user = await userModel
        .findOne({username: req.session.passport.user})
        .populate("posts");
  res.render("profile", {user});
});

router.get("/show/posts", isloggedIn, async function(req, res){
  const user = await userModel
        .findOne({username: req.session.passport.user})
        .populate("posts");
  res.render("show", {user});
});

router.get("/add", isloggedIn, async function(req, res){
  const user = await userModel.findOne({username: req.session.passport.user});
  res.render("add", {user});
});

router.post("/createpost", isloggedIn, upload.single("postimage"), async function(req, res){
  const user = await userModel.findOne({username: req.session.passport.user});
  const post = await postModel.create({
    user: user._id,
    title: req.body.title,
    description: req.body.description,
    image: req.file.filename,
  })
  user.posts.push(post.id);
  await user.save();
  res.redirect("/profile")
});

router.post("/fileupload", isloggedIn, upload.single("image"),async function(req, res, next){
  const user = await userModel.findOne({username: req.session.passport.user});
  user.profileImage = req.file.filename;
  await user.save();
  res.redirect("/profile")
});

router.get("/feed", function(req, res){
  res.render("feed")
})

router.post("/register", function (req, res) {
  const { username, email, fullname } = req.body;
  const userdata = new userModel({ username, email, fullname });

  userModel.register(userdata, req.body.password)
  .then(function(registereduser){
    passport.authenticate("local")(req, res, function(){
      res.redirect('/profile')
    })
  })
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true
}))

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isloggedIn(req, res, next) {
  if (req.user) {
      next();
  } else {
      res.redirect('/login');
  }
}
// function isLoggedIn(req, res, next){
//   if(req.isAuthenticated())
//     return next();
//   res.redirect("/")
// }


module.exports = router;
