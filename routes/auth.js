const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if(authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

const auth = {
  required: jwt({
    secret: process.env.SECRET,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    algorithms: ['RS256']
  }),
  optional: jwt({
    secret: process.env.SECRET,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
    algorithms: ['RS256']
  }),
};

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  }else{
    return res.status(404).json({error:"you must login to access this page"})
  }
};

const checkUnAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(404).json({error:"you are already logged in"})
  }else{
    next()
  }
};

module.exports = {auth,checkAuthenticated,checkUnAuthenticated};