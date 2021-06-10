// create an express app
const express = require("express")
const app = express()
const errorHandler = require('errorhandler');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();

const mongoose = require('mongoose');
const userModel = require("./models/Users")

app.set("view engine", 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(require('./routes'));

require('./config/passport');
mongoose.promise = global.Promise;
mongoose.set('debug', true);

app.use(cors());
app.use(require('morgan')('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

//Configure Mongoose
mongoose.connect(process.env.MONGOLINK,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."))