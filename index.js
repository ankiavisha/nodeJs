const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var flash    = require('connect-flash');
var passport = require('passport');
var morgan       = require('morgan');

require('./app/configurations/passport')(passport);

import storeUserData from './app/middlewares/assignUserToRequest';

import { router as uploadRoutes } from './app/routes/upload';
import { router as homeRoutes } from './app/routes/home';
import { router as likeRoutes } from './app/routes/like';
import { router as commentRoutes } from './app/routes/comments';
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 5000));

app.use(cookieParser());
app.use(morgan('dev'));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(storeUserData);
require('./app/routes/signup.js')(app, passport);
app.use(uploadRoutes);
app.use(homeRoutes);
app.use(likeRoutes);
app.use(commentRoutes);
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

