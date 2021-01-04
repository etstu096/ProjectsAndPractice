var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// Bodyparser module maakt het mogelijk om met JSON te werken (post data)
let bodyParser = require('body-parser');

//importing routers
let productsRouter = require('./routes/products');
const { use } = require('./routes/products');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Using the modules
app.use(logger('dev')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setting up our routes
app.use('/products', productsRouter);


//get request at index of site so it doesn't crash
app.get('/',function(req,res,next){
  res.redirect('/products');
});

//Dont touch below
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
