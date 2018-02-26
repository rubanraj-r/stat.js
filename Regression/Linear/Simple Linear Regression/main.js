// Hand coded Simple Linear Regression //
// Method of Least Square Algorithm    //
// Rubanraj R (ru8anraj@gmail.com)     //

module.exports = {
    X : [], // predictors or inputs
    y : [], // outcomes

    fit : function(predictors, outcomes){
        if (predictors.length !== outcomes.length) {
            throw new Error('>> input array and output array should be same in length <<');
        } else {
            this.X = predictors;
            this.y = outcomes;
        }
    },
    
    initCalc : function(X, y){ // function calculates X_mean, y_mean, numerator and denominator of slope
        var X_sum = 0,
            y_sum = 0;
        for(var i=0, len=X.length; i<len; i++){ // summation of X and y respectively
            X_sum += X[i];
            y_sum += y[i];
        }
        var X_mean = X_sum/X.length,
            y_mean = y_sum/X.length,
            numerator = 1,
            denominator = 1;
        for(var i=0, len=X.length; i<len; i++){ // summation of numerator and denominator respectively
            numerator += (X[i]-X_mean) * (y[i]-y_mean);
            denominator += (X[i]-X_mean) * (X[i]-X_mean);
        }
        var obj = {
            X_mean : X_mean,
            y_mean : y_mean,
            numerator : numerator,
            denominator : denominator
        }
        return obj;
    },

    SLR : function(){
        reqValues = this.initCalc(this.X, this.y);
        var slope = reqValues.numerator/reqValues.denominator,
            y_intercept = reqValues.y_mean - (slope*reqValues.X_mean);
        linearRegression = {
            slope : slope,
            y_intercept : y_intercept
        };
        console.log(linearRegression);
        return linearRegression;
    },

    predict : function(predictor){
        if (this.X.length === 0 || this.y.length === 0) {
            throw new Error('>> MISSING FIT: fit your dataset using fit() <<');
        } else {
            slopeIntercept = this.SLR();
            y = (slopeIntercept.slope * predictor) + slopeIntercept.y_intercept;
            console.log(y);
            return y;
        }
    }
};