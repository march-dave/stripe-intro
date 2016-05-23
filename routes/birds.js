var express = require('express');
var router = express.Router();

var Bird = require('../models/bird');

router.get('/', (req, res) => {
  Bird.find({}, (err, birds) => {
    res.status(err ? 400 : 200).send(err || birds);
  });
});

router.get('/:id', (req, res) => {
  Bird.findById(req.params.id, (err, bird) => {
    res.status(err ? 400 : 200).send(err || bird);
  });
});

router.post('/', (req, res) => {
  Bird.create(req.body, (err, bird) => {
    res.status(err ? 400 : 200).send(err || bird);
  });
});

router.delete('/:id', (req, res) => {
  Bird.findByIdAndRemove(req.params.id, (err) => {
    res.status(err ? 400 : 200).send(err);
  });
});

router.put('/:id', (req, res) => {
  Bird.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, bird) => {
    res.status(err ? 400 : 200).send(err || bird);
  });
});

module.exports = router;
