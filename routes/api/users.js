const router = require("express").Router();
const { auth, checkAuthenticated, checkUnAuthenticated } = require("../auth");
const userModel = require("../../models/Users");
const passport = require("passport");
const crypto = require("crypto");
const Users = require("../../models/Users");

// define the login route
router.get("/login", checkUnAuthenticated, (req, res) => {
  return res.render("./login");
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
  console.log("login success");
  return res.redirect("/api");
});

// define the register route
router.get("/register", checkUnAuthenticated, (req, res) => {
  return res.render("./registration", { error: false });
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
    });
    user.setPassword(password);
    user.save();
    return res.redirect("/api/users/login");
  } else {
    return res.render("./registration", { error: "passwords don't match" });
  }
});

router.get("/", checkAuthenticated, (req, res) => {
  Users.find({}, function (err, users) {
    console.log(users);
    return res.render("./users", { users });
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
