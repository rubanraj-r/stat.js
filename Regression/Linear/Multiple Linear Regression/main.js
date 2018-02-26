// Hand coded Multiple Linear Regression //
// Method of Least Square Algorithm      //
// Rubanraj R (ru8anraj@gmail.com)       //


module.exports = {
    X : {}, // predictors or inputs
    y : [], // outcomes

    fit : function(predictors, outcomes){
        var X_keys = Object.keys(predictors);
        for(var i=0, len=X_keys.length; i<len; i++){
          if (predictors[X_keys[i]].length !== outcomes.length) {
            throw new Error('>> input and output should have same length of values <<');
          }
        }
        this.X = predictors;
        this.y = outcomes;
    },

    predict : function(predictor){

    }


};


function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

function initCalc(X, y){
  var X_keys = Object.keys(X),
      X_sum = {},
      y_sum = 0;

  for(var i=0, len=X_keys.length; i<len; i++){ // summation of X[i] and y respectively
    var x_temp = X[X_keys[i]], // Array value of the particular key
        keyName = X_keys[i], // name of the key from the X object
        sum = 0;
    y_sum += y[i];
    for(var j=0, len1=X[keyName].length; j<len1; j++){
        sum += x_temp[j];
    }
    X_sum[keyName] = sum;
  }

  var X_mean = {};
  for(var i=0, len=X_keys.length; i<len; i++){
    X_mean[X_keys[i]] = X_sum[X_keys[i]]/X[X_keys[i]].length;
  }
  var y_mean = y_sum/y.length,
      numerator = {},
      denominator = {};
  for(var i=0, len=X_keys.length; i<len; i++){ // summation of numerator and denominator respectively
    var keyName = X_keys[i],
        numSum = 0,
        denSum = 0;
    for(var j=0, len1=X[keyName].length; j<len1; j++){
      numSum += precisionRound((X[keyName][j]-X_mean[keyName]) * (y[j]-y_mean), 2);
      denSum += (X[keyName][j]-X_mean[keyName]) * (X[keyName][j]-X_mean[keyName]);
    }
    numerator[keyName] = numSum;
    denominator[keyName] = denSum;
  }
  
  var obj = {
      X_mean : X_mean,
      y_mean : y_mean,
      numerator : numerator,
      denominator : denominator
  }
  return obj;
}
// Multiple Linear Regression Model
function MLR(){
  var X = {
    'cc' : [1010, 1280, 1280, 795, 1461],
    'hp' : [88, 94, 95, 84, 108],
    'wt' : [1200, 1350, 1400, 850, 1550]
  }; // X (independent variable)
  var y = [23.0, 18.5, 19.3, 21.5, 17.0]; // y (dependent variable)
  var X_keys = Object.keys(X);
  for(var i=0, len=X_keys.length; i<len; i++){
    if (X[X_keys[i]].length !== y.length) {
      throw new Error('>> input and output should have same length of values <<');
    }
  }
  reqValues = initCalc(X, y);
  var slope = {},
    y_intercept = 0,
    X_slope_sum = 0;
  for(var i=0, len=X_keys.length; i<len; i++){
    slope[X_keys[i]] = reqValues.numerator[X_keys[i]]/reqValues.denominator[X_keys[i]];
    X_slope_sum += (slope[X_keys[i]] * reqValues.X_mean[X_keys[i]]);
  }
  y_intercept = reqValues.y_mean - X_slope_sum;
  linearRegression = {
      slope : slope,
      y_intercept : y_intercept
  };
  console.log(linearRegression);
  return linearRegression;
}

function predict(X){
  var slopeIntercept = MLR();
  var slope_Xsum = 0;
  var keyName = Object.keys(slopeIntercept.slope)
  for(var i=0, len=X.length; i<len; i++){
    slope_Xsum += X[i] * slopeIntercept.slope[keyName[i]]
  }
  console.log(slope_Xsum);
  var y = slope_Xsum + slopeIntercept.y_intercept;
  return y
}
module.exports = MLR, predict;
console.log(predict([1000, 95, 1008]));
