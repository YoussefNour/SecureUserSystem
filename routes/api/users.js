const router = require("express").Router();
const { auth, checkAuthenticated, checkUnAuthenticated } = require("../auth");
const userModel = require("../../models/Users");
const passport = require("passport");
const crypto = require("crypto");
const Users = require("../../models/Users");

// define the login route
router.get("/login", checkUnAuthenticated, (req, res) => {
  console.log(req.query);
  const error = req.query.error?req.query.error:null;
  return res.render("./login",{error});
});

/**
 * Login user with meail and password
 */
router.post(
  "/login",
  checkUnAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/api/users/success",
    failureRedirect: "/api/users/failure",
  })
);

/**
 * If user login is successfull
 */
router.get("/success", (req, res) => {
  return res.redirect("/api");
});

router.get("/failure", (req, res) => {
  const error = "wrong email or password";
  return res.redirect(`/api/users/login?error=${error}`);
});


// define the register route
router.get("/register", checkUnAuthenticated, (req, res) => {
  const error = req.query.error ? req.query.error:null; 
  return res.render("./registration", {error});
});

// define the create route
router.post("/register", checkUnAuthenticated, (req, res) => {
  console.log(req.body);
  const { userName, email, firstName, lastName, password, confirmPassword } =
    req.body;
  if (password === confirmPassword) {
    const user = new userModel({
      userName,
      email,
      firstName,
      lastName,
      role:"user"
    });
    user.setPassword(password);
    user.save();
    return res.redirect("/api/users/login");
  } else {
    const error = "passwords don't match";
    return res.redirect(`/api/users/register?error=${error}`);
  }
});

router.get("/", checkAuthenticated, (req, res) => {
  let filter = req.user.role === "admin" ? "userName email firstName lastName password" : "userName email firstName lastName";
  Users.find({},filter, function (err, users) {
    return res.render("./users", { users, loggedinUser:{role:req.user.role,_id:req.user._id} });
  });
});

router.post("/delete", checkAuthenticated, (req, res) => {
  const { _id } = req.body;
  Users.findOneAndDelete({ _id: _id }, (error, user) => {
    if (error) {
      res.status(404).json("you must be logged in to delete");
    } else {
      return res.send({ pass: true });
    }
  });
});

router.get("/logout", checkAuthenticated, (req, res) => {
  req.logout();
  res.redirect("/api");
});

module.exports = router;
