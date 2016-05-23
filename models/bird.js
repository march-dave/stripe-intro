'use strict';

var mongoose = require('mongoose');
var stripe = require('stripe')(process.env.STRIPE_API_SECRET);

var birdSchema = new mongoose.Schema({
  variety: { type: String, required: true },
  value: { type: Number, required: true }
});

birdSchema.methods.purchase = function(token, cb) {
  stripe.charges.create({
    amount: this.value * 100,
    currency: "usd",
    source: token.id, // obtained with Stripe.js
    description: `Charge for ${token.email}: ${this.variety}`
  }, cb);
};

var Bird = mongoose.model('Bird', birdSchema);

module.exports = Bird;
