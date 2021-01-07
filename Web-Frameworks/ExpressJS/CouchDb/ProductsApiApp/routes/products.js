var express = require('express');
var router = express.Router();
let axios = require('axios').default;

//Constanten
const URL = 'http://127.0.0.1:5984'
const VIEW_PATH = '/products/_design/view/_view/byName'
const DB_PATH = '/products/'

/* GET home page. */
router.get('/', function (req, res, next) {
  axios.get(URL + VIEW_PATH).
  then(response => {
    let result = response.data.rows; // gets all data
    let documents = result.map(product =>{
      return product.value;
    });
      res.render('index.ejs',{ products: documents});
    })
    .catch((error) => {
      console.log(error);
    });
});

// Post methode om te adden
router.post('/add',(req,res) =>{
  let document = req.body;
  axios.post(URL + DB_PATH, req.body)
  .then(response =>{
    console.log(req.body);

    console.log(response);
    res.redirect('/');
  })
  .catch(error => {
    console.log(error);
  })
});


router.get('/add', function (req, res, next) {
  res.render('add');
});

router.get('/search', function (req, res, next) {
  res.render('search');
});


router.get('/results', function (req, res, next) {
  
axios.get(URL+VIEW_PATH+'?key=' + '"'+req.query.name+'"')
.then((response => {
  let documents = response.data.rows;
  let foundProducts = documents.map( product =>{
    return product.value
  })
  res.render('index2',  { products: foundProducts })
}))
.catch(error =>{
  console.log(error);
})
});

router.post('/delete', (req,res) =>{
  let documentId = req.body._id;
  let documentRevisionId = req.body._rev;
  axios.delete(URL+DB_PATH+documentId+'?rev='+documentRevisionId)
  .then(response => {
    console.log(response.data);
    res.redirect('/')
  })
  .catch(error => {
    console.log(error);
  })

});





module.exports = router;