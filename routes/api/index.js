const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
router.use('/users', require('./users'));

router.get('/',(req,res)=>{
  const username = req.user ? req.user.userName : false;
  return res.render("./index",{username})
});
// //POST new user route (optional, everyone has access)
// router.get('/', auth.optional, (req, res, next) => {
//   const { body: { user } } = req;

//   if(!user.email) {
//     return res.status(422).json({
//       errors: {
//         email: 'is required',
//       },
//     });
//   }

//   if(!user.password) {
//     return res.status(422).json({
//       errors: {
//         password: 'is required',
//       },
//     });
//   }

//   const finalUser = new Users(user);

//   finalUser.setPassword(user.password);

//   return finalUser.save()
//     .then(() => res.json({ user: finalUser.toAuthJSON() }));
// });


// router.get("/home", auth.required, (req, res) => {
//   return res.render("./users");
// });

module.exports = router;