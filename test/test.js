/*!
 * Unit testing on the model
 */

// importing testing tools
const assert = require("assert");

// importing developed models
const { SLR } = require("./../index.js");
const { MLR } = require("./../index.js");

/*
 * Simple Linear Regression
 */
describe('Simple Linear Regression', function() {
    /*
     * Testing the fit method
     */
    it('training... ', function(done) {
        let ht = [152, 166, 174, 179, 183, 172], // X (independent variable)
            wt = [62, 64, 85, 72, 78, 68]; // y (dependent variable)
        
        SLR.fit(ht, wt)
            .then(t => t)
            .then(done())
            .catch(err => done(err));
    });

    /*
     * Testing the predict method
     */
    before(function() {
        let ht = [152, 166, 174, 179, 183, 172], // X (independent variable)
            wt = [62, 64, 85, 72, 78, 68]; // y (dependent variable)
        
        SLR.fit(ht, wt);
    });
    it('prediction... ', function() {
        assert.equal(68.14793388429753, SLR.predict(165));
    });
});

/*
 * Multi Linear Regression
 */
describe('Multi linear Regression', function() {
    /*
     * Testing the fit method
     */
    it('training... ', function(done) {
        let X = [[1010, 1280, 1280, 795, 1461],[88, 94, 95, 84, 108],[1200, 1350, 1400, 850, 1550]]
          , y = [23.0, 18.5, 19.3, 21.5, 17.0];
        
        MLR.fit(X, y)
            .then(t => t)
            .then(done())
            .catch(err => done(err));
    });

    /*
     * Testing the predict method
     */
    before(function() {
        let X = [[1010, 1280, 1280, 795, 1461],[88, 94, 95, 84, 108],[1200, 1350, 1400, 850, 1550]]
          , y = [23.0, 18.5, 19.3, 21.5, 17.0];
        
        MLR.fit(X, y);
    });
    it('prediction... ', function() {
        assert.equal(18.686418012888545, MLR.predict([1000, 95, 1008]));
    });
});