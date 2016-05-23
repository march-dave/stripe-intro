'use strict';

var app = angular.module('stripeApp', ['stripe.checkout']);


app.controller('mainCtrl', function($scope, Payment, Bird) {

  $scope.doCheckout = function(token) {
    Payment.completeCheckout(token, $scope.selectedBirdId)
      .then(res => {
        console.log('res:', res);
      });
  }

  $scope.selectBird = function(id) {
    $scope.selectedBirdId = id;
  };

  Bird.getAll()
    .then(res => {
      $scope.birds = res.data;
    })
    .catch(res => {
      console.log('err:', res);
    });
});


app.service('Payment', function($http) {
  this.completeCheckout = function(token, birdId) {
    return $http.post('/api/payment', { token: token, birdId: birdId });
  };
});


app.service('Bird', function($http) {

  this.getAll = () => {
    return $http.get('/api/birds');
  };

});


