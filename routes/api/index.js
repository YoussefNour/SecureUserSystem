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

module.exports = router;