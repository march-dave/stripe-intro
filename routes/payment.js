var express = require('express');
var router = express.Router();

var Bird = require('../models/bird');

//   POST /api/payment
router.post('/', (req, res) => {

  var token = req.body.token;
  var birdId = req.body.birdId;

  console.log('birdId:', birdId);

  Bird.findById(birdId, (err, bird) => {
    if(err || !bird) {
      return res.status(400).send(err || { error: 'Bird not found.' })
    }

    bird.purchase(token, (err, charge) => {
      if(err) return res.status(400).send(err);
      console.log('charge:', charge);

      res.send(charge);
    });
  });  
});

module.exports = router;
