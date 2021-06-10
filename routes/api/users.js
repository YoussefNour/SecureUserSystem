const router = require("express").Router();
const auth = require("../auth");
const userModel = require("../../models/Users")
const passport = require('passport');
const crypto = require('crypto');

// define the login route
router.get("/login", auth.optional, (req, res) => {
  return res.render("./login");
});

//POST login route (optional, everyone has access)
router.post("/login", auth.optional, (req, res, next) => {
  const {email,password} = req.body;

  if (!email) {
    return res.status(422).json({
      errors: {
        email: "is required",
      },
    });
  }

  if (!password) {
    return res.status(422).json({
      errors: {
        password: "is required",
      },
    });
  }

  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();

        return res.json({ user: user.toAuthJSON() });
      }
      return res.status(400);
    }
  )(req, res, next);
});

// define the register route
router.get("/register", auth.optional, (req, res) => {
  return res.render("./registration",{error:false});
});

// define the create route
router.post("/register", auth.optional, (req, res) => {
  console.log(req.body);
  const { userName, email, firstName, lastName, password, confirmPassword } =
    req.body;
  if(password===confirmPassword){
    const user = new userModel({
      userName,
      email,
      firstName,
      lastName,
    });
    user.setPassword(password)
    user.save();
    return res.redirect("/api/users/login");
  }else{
    return res.render("./registration",{error:"passwords don't match"})
  }
});

module.exports = router;
