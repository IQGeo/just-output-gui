define(function() {
    suite("Suite 1")
    
    test("1+1", function() {
        output(1+1);
    });
    
    test("1+2", function() {
        return Promise.delay(5000).then(() => Promise.resolve(output(1+3)));
    });
    
    test("1+3", function() {
        output(1+3);
    });
    
    test("1+4", function() {
        output(1+3);
    });
    
    test("1+5", function() {
        output(1+3);
    });
    
    
    test("1+6", function() {
        output(1+3);
    });
    
    test("1+7", function() {
        output(1+3);
    });
    
    test("1+8", function() {
        output(1+3);
    });
    
    test("1+9", function() {
        output(1+3);
    });
    
    test("1+10", function() {
        output(1+3);
    });
});