var express = require('express');
var router = express.Router();
let mongodb = require('mongodb');
let MongodbClient = require('mongodb').MongoClient;



/* GET home page. */


MongodbClient.connect("mongodb://localhost:27017/products", (err, db) => {
  if (err) throw err;
  let currentdB = db.db('products');
  let itemsCollection = currentdB.collection('items');;


  //Make navigation to throug website possible
  router.get('/', (req, res, next) => {
    itemsCollection.find({}).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      
      res.render('index',{products: result});


    });

  });

 

  router.get('/add', (req, res, next) => {
    res.render('add');
  });
  router.get('/search', (req, res, next) => {
    res.render('search');
  });


  router.post('/add', (req, res) => {
    let item = {
      _id: req.body.id,
      name: req.body.name,
      brand: req.body.brand,
      description: req.body.description,
      price: req.body.price,
    }
    itemsCollection.insertOne(item, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    console.log("ITEM ADDED");
    res.redirect('/');
  });

  router.post('/search/results', (req, res) => {
    itemsCollection.find({name: req.body.name}).toArray((err,result) =>{
      if(err) throw err;
      res.render('searchResult',{products: result});
    });
  })

  router.post('/',(req,res)=>{
    console.log(req.params._id);
    itemsCollection.deleteOne({_id: req.body.id});
    res.redirect('/');
  });
});


module.exports = router;