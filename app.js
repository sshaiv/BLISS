var createError = require('http-errors');
var express = require('express');
var session =  require('express-session')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const login = require('./routes/UserRoute/login');
const register = require('./routes/UserRoute/register');
const user_profile = require('./routes/UserRoute/user_profile')
const club_login = require('./routes/ClubRoute/club_login')
const club_register = require('./routes/ClubRoute/club_register')
const user_home = require('./routes/UserRoute/user_home')
const onboarding_que = require('./routes/onboarding/onboarding_que')
const get_started = require('./routes/UserRoute/getstarted')
const user_suggestion = require('./routes/UserRoute/user_suggestion')
const addEvent = require('./routes/ClubRoute/addEvent')
const addEventView = require('./routes/ClubRoute/addEventView')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(session({
  secret: 'your-secret-key', // Change this to a secure key
  resave: true,
  saveUninitialized: true
}));


app.use('/', indexRouter);
app.use('/login', login);
app.use('/register', register);
app.use('/user_profile', user_profile);
app.use('/club_login', club_login);
app.use('/club_register', club_register);
app.use('/user_home', user_home);
app.use('/onboarding_que', onboarding_que);
app.use('/get_started', get_started);
app.use('/user_suggestion', user_suggestion);
app.use('/addEvent', addEvent);
app.use('/addEventView', addEventView);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
