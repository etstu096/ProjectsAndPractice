var express = require('express'); // import express
var app = express(); // assign instance of express so we can use it
var hello = require('./hello.js');
var dynamicRoute = require('./dynamicRoutes.js');
app.get('/', function(req,res){
  res.render('index' , {title: 'Express'});
});


app.use('/', dynamicRoute);
app.use('/hello', hello);


module.exports = app;