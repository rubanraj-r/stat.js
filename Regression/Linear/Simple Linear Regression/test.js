var SLR = require('./main.js');

var ht = [152, 166, 174, 179, 183, 172], // X (independent variable)
    wt = [62, 64, 85, 72, 78, 68]; // y (dependent variable)

SLR.fit(ht, wt);

pred = SLR.predict(166);

console.log('predicted value (wt) -- > ', pred);
