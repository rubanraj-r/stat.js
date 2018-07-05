// Simple Linear Regression            //
// Method of Least Square Algorithm    //
// Rubanraj R (ru8anraj@gmail.com)     //

/*!
 * SLR Object
 * 
 */
module.exports = {
  X : [], // predictors or inputs
  y : [], // outcomes

  fit : function(predictors, outcomes){
    /*!
     * FIT method
     * @params -> {Array of Numbers} predictors
     * @params -> {Array of Numbers} outcomes
     * 
     * @purpose -> assigns predictors and outcomes to the X and y variable resp 
     * 
     * @returns -> Promise of assignment (X, y variable)
     */
    return new Promise((resolve, reject) => {
      if (predictors.length !== outcomes.length) {
        throw new Error('>> input array and output array should be same in length <<');
      } else {
        this.X = predictors;
        this.y = outcomes;
        resolve({
          X:this.X,
          y:this.y
        });
      }
    });
  },

  initCalc : function(X, y){ // function calculates X_mean, y_mean, numerator and denominator of slope
    /*!
     * INITCALC method
     * @params -> {Array of Arrays} predictors
     * @params -> {Array of Numbers} outcomes
     * 
     * @purpose -> calculates the mean value of X and y
     *          -> calculates the numerator function and denominator function
     * 
     * @returns -> Promise of assignment (X, y variable)
     */

    var X_sum = 0,
        y_sum = 0;
    X.map((item, i) => { // summation of X and y respectively
        X_sum += X[i];
        y_sum += y[i];
    });

    var X_mean = X_sum/X.length,
        y_mean = y_sum/X.length,
        numerator = 1,
        denominator = 1;
    X.map((item, i) => { // summation of numerator and denominator respectively
        numerator += (X[i]-X_mean) * (y[i]-y_mean);
        denominator += (X[i]-X_mean) * (X[i]-X_mean);
    });

    var obj = {
        X_mean : X_mean,
        y_mean : y_mean,
        numerator : numerator,
        denominator : denominator
    };
    return obj;
  },

  SLR : function(){
    /*!
     * FIT method
     * @params -> none
     * 
     * @purpose -> calls initial calculation function to pre-process the data
     * 
     * @returns -> slope and y_intercept values (constants)
     */

    reqValues = this.initCalc(this.X, this.y);
    var slope = reqValues.numerator/reqValues.denominator,
        y_intercept = reqValues.y_mean - (slope*reqValues.X_mean);
    linearRegression = {
        slope : slope,
        y_intercept : y_intercept
    };
    return linearRegression;
  },

  predict : function(predictor){
    /*!
     * PREDICT method
     * @params -> {Number} predictors
     * 
     * @purpose -> calls SLR method to calculate slope and y_intercept values (constants)
     *          -> predict the expected outcome by multiplying the new predictors with the constants
     * 
     * @returns -> predicted value (y)
     */

    if (this.X.length === 0 || this.y.length === 0) {
        throw new Error('>> MISSING FIT: fit your dataset using fit() <<');
    } else {
        slopeIntercept = this.SLR();
        y = (slopeIntercept.slope * predictor) + slopeIntercept.y_intercept;
        return y;
    }
  }
};
