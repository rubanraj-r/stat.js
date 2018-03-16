const MLR = require('./../multi_linear_regression.js');

var X = [[1010, 1280, 1280, 795, 1461],[88, 94, 95, 84, 108],[1200, 1350, 1400, 850, 1550]]
  , y = [23.0, 18.5, 19.3, 21.5, 17.0];


MLR.fit(X, y);
var predict = MLR.predict([1000, 95, 1008])
  , coeff = MLR.coeff_();

console.log('prediction - > ', predict);
console.log('coeff - > ', coeff);
