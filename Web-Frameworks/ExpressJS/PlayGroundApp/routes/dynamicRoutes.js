var express = require('express');
var route = express.Router();

/*  COMMENTAAR
   Je kan dynamische routes configureren door de benodigde request string
   parameters te anticiperen en te bepalen in de http methode (get, post, put, delete ...).
   Men kan daarna dmv van het req.params property de ingevulde waarde van de request gebruiken om te
   navigeren, valideren of bepaalde content te laten zien
*/

// in /dynamic/:name is dynamic fixed en :name een variabele.
// Je kan :name gebruiken via req.params.name
route.get('/dynamic/:name', function(req,res){ // /dynamic/:name is een optie. Is vergelijkbaar met de constructor signature
    res.send("Welcome " + req.params.name); 
});


//Meerdere variabelen in een request urI
var path2 = '/dynamic/:name/:lang/:id([0-9]{5})'; //Regex gaat (id = 5 cijfers van 0 - 9) komt het niet overeen dan error 404
route.get(path2, function(req,res) {
  //  req.params.id = "0001"; // kan variabalen aanmaken 
    var test = parseInt(req.params.id); //gewn creatief zijn
    res.send("Welcome " + req.params.name + " Your chosen language is " + req.params.lang + "Your session id is " + req.params.id);
});

// Allesomvattende route
// Deze route zal overeenkomen met wat de gebruiker ook typt in de browser. Dit word gedaan met het * teken.
// BELANGRIJK !! ZET DEZE REQUEST ALTIJD ALS LAATSTE REQUEST IN DE FILE WANT EXPRESS DOORLOOPT ALLE OPTIES SEQUENTIEEL
// ANDERS ZAL DEZE REQUEST HANDLER ALTiJD GEBRuIKT WORDEN AANGEZIEN DIE OP ELKE REQUEST ZAL REAGEREN
route.get('*', function(req,res) {
    res.send("Sorry, this is an invalid URL");
});



module.exports = route;