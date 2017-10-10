casper.test.begin('Test description', 4, function(test) {
    casper.start();

    casper.then(function() {
        test.assert(true, 'true');
        test.assert(true, 'true');
        test.assert(true, 'true');
        test.assert(true, 'true');
    });

    casper.run(function() {
        test.done();
    });
});
