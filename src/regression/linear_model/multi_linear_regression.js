// Multiple Linear Regression            //
// Method of Least Square Algorithm      //
// Rubanraj R (ru8anraj@gmail.com)       //

// importing dependencies
const math = require('mathjs');

/*!
 * MLR Object
 * 
 */
module.exports = {
  X : [], // predictors or inputs
  y : [], // outcomes

  betas: {}, // contants for the MLR formula

  MLR : function(){
    /*!
     * MLR method
     * @params -> none
     * 
     * @purpose -> To calculate the beta values
     *          -> β = (X^T X)^(-1) X^T y
     * 
     * @returns -> beta values
     */
    var X_transpose = math.transpose(this.X)
      , X_trans_X = math.multiply(X_transpose, this.X)
      , X_trans_X_inv = math.inv(X_trans_X)
      , X_trans_y = math.multiply(X_transpose, this.y)
      , betas = math.multiply(X_trans_X_inv, X_trans_y);

    return betas;
  },

  fit : function(predictors, outcomes){
    /*!
     * FIT method
     * @params -> {Array of Arrays} predictors
     * @params -> {Array of Numbers} outcomes
     * 
     * @purpose -> assigns predictors and outcomes to the X and y variable resp
     *          -> calls MLR method to calculate the beta values and assign it to the betas variable 
     * 
     * @returns -> Promise of assignment (X, y, betas variable)
     */
    return new Promise((resolve, reject) => {
      var ones = [];
      predictors[0].map((item) => ones.push(1));
      predictors.unshift(ones);
      var temp_X = math.matrix(predictors)
        , temp_y = math.matrix(outcomes);
      this.X = math.transpose(temp_X);
      this.y = math.transpose(temp_y);
      this.betas = this.MLR();
      resolve({
        X: this.X,
        y: this.y,
        betas: this.betas
      });
    });
  },

  predict : function(predictor){
    /*!
     * PREDICT method
     * @params -> {Array of Numbers} predictors
     * 
     * @purpose -> predict the expected outcome by multiplying the new predictors with the beta value
     * 
     * @returns -> predicted value (y)
     */
    if (this.X.length === 0 || this.y.length === 0) {
        throw new Error('>> MISSING FIT: fit your dataset using fit() <<');
    } else {
      predictor.unshift(1);
      y = math.multiply(predictor, this.betas);
      return y;
    }
  },

  coeff_ : function(){
    /*!
     * COEFF_ method
     * @params -> none
     * 
     * @returns -> beta values
     */

    if (this.X.length === 0 || this.y.length === 0) {
        throw new Error('>> MISSING FIT: fit your dataset using fit() <<');
    } else {
      return this.betas;
    }
  }
};
