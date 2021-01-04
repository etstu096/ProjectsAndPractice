const {
    json
} = require('express');
let express = require('express');
let router = express();
// fs = interact and manipulates your FILE SYSTEM
// We use it to create and update a JSON FILE
let fs = require('fs');
const FILE_PATH = './public/data/products.json'



fs.readFile(FILE_PATH, function (err, data) {

    if (err) throw err;

    let api = JSON.parse(data);
    let products = api.products;

    // Globale get 
    router.get('/', function (req, res) {
        res.json(api);
    });

    // Get op basis van :id
    router.get('/:id', function (req, res) {
        let searchResults = products.filter(function (product) {
            return product.id == req.params.id;
        })

        if (searchResults.length < 1) {
            res.status(404).send({
                message: "NOT FOUND"
            });
        }

        res.json(searchResults);
    });


    // POST 
    router.post('/post', function (req, res) {
        let newProduct = req.body;

        //Kijken of product al bestaat
        let searchResult = products.filter(function(currentProduct){
            // BELANGRIJK
            // Wanneer je een object vergelijkt met een POST JSON object
            // Dan altijd met elkaar vergelijken in string vorm
            // STRINGS DONT LIE !!
            return JSON.stringify(currentProduct) == JSON.stringify(newProduct);
        });

        
        if(searchResult.length > 0){
         res.status(404).json({message: "PRODUCT ALREADY EXISTS"})
        }else{
            products.push(newProduct);
            saveApi();
            res.json({message: "NEW PRODUCT CREATED"});
        }
    });

    router.delete('/:id', function (req, res) {
        let newProductsList = products.filter(function (product) {
            return product.id != req.params.id;
        });

        if(newProductsList.length == products.length){
            res.status(404).json({
                message: "PRODUCT NOT FOUND !! NOTHING DELETED" ,
            })
        }else{
            products = newProductsList;
            saveApi();
            res.json({message: "PRODUCT REMOVED"});
          //  res.json(newProductsList);
        }
       
    });

    function saveApi() {
        api.products = products;
        fs.writeFile(FILE_PATH, JSON.stringify(api), function (err) {
            if (err) throw err;
        })
    }
});


module.exports = router;