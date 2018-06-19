// Hand coded Multiple Linear Regression //
// Method of Least Square Algorithm      //
// Rubanraj R (ru8anraj@gmail.com)       //

const math = require('mathjs');


module.exports.MLR = {
  X : [], // predictors or inputs
  y : [], // outcomes

  generateOnes : function(len){
    var onesArray = [];
    for(var i=0; i<len; i++){
      onesArray.push(1);
    }
    return onesArray;
  },

  fit : function(predictors, outcomes){
    var ones = this.generateOnes(predictors[0].length)
    predictors.unshift(ones);
    var temp_X = math.matrix(predictors)
      , temp_y = math.matrix(outcomes);
    this.X = math.transpose(temp_X);
    this.y = math.transpose(temp_y);
  },

  MLR : function(){
    var X_transpose = math.transpose(this.X)
      , X_trans_X = math.multiply(X_transpose, this.X)
      , X_trans_X_inv = math.inv(X_trans_X)
      , X_trans_y = math.multiply(X_transpose, this.y)
      , betas = math.multiply(X_trans_X_inv, X_trans_y);

    return betas;
  },

  predict : function(predictor){
    if (this.X.length === 0 || this.y.length === 0) {
        throw new Error('>> MISSING FIT: fit your dataset using fit() <<');
    }else {
      var betas = this.MLR();
      predictor.unshift(1);
      y = math.multiply(predictor, betas);
      return y;
    }
  },

  coeff_ : function(){
    if (this.X.length === 0 || this.y.length === 0) {
        throw new Error('>> MISSING FIT: fit your dataset using fit() <<');
    }else {
      var betas = this.MLR();
      return betas;
    }
  }
};
