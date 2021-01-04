var express = require('express');
var router = express.Router();
let date = new Date();
let currentDate = "";
currentDate = currentDate.concat(date.getDate(),'-',date.getMonth(),'-',date.getFullYear(),'at',date.getHours(),'-',date.getMinutes) 
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(currentDate);
  res.render('index', { title: 'Express' });
});

module.exports = router;
