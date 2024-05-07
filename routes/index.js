var express = require('express');
var router = express.Router();
const fs = require('fs')


/*To read a JSON file*/
const jsonData = JSON.parse(fs.readFileSync('quotes.json'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/quote',function(req,res){
    const randomIndex = Math.floor(Math.random()*jsonData.length);
    const randomQuote = jsonData[randomIndex];
    res.render('quote',{quote:randomQuote});
  });


router.post('/checkauthor',function(req,res){
  const selectedItem = req.body.selectedItem;
  const quote =jsonData.find(item =>item.a === selectedItem);
  if(quote){
    res.json(quote);
  }
  else{
    res.status(404).send('Selected author not found');
  }
});

module.exports = router;
