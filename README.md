<h1> Stat.JS </h1>
<p> Provides a Rich Models for Statistical Computing using JavaScript </p>
<br />
<br />
<h2> How to use </h2>
<p> This package is developed with the concern of simple plug and play experience without worrying the under the hood issues </p>

<h4> Simple Linear Regression </h4>
    
    var { SLR } = require('stat_learn_js');

    var ht = [152, 166, 174, 179, 183, 172] // X (independent variable)
      , wt = [62, 64, 85, 72, 78, 68]; // y (dependent variable)

    SLR.fit(ht, wt); // training starts

    SLR.predict(166); // predict the new weight with the new height value
    
<h4> Multi Linear Regression </h4>
    
    // lets predict with multiple input columns
    const {MLR} = require('stat_learn_js');

    var cc = [1010, 1280, 1280, 795, 1461];
    var hp = [88, 94, 95, 84, 108];
    var weight = [1200, 1350, 1400, 850, 1550];
    var milage = [23.0, 18.5, 19.3, 21.5, 17.0];
    
    var X = [] // (Array of Arrays)
    X.push(cc);
    X.push(hp);
    X.push(weight);

    MLR.fit(X, milage); // Training starts
    MLR.predict([1000, 95, 1008]); // predicting with the new input
    MLR.coeff_(); //coefficient values or beta values
