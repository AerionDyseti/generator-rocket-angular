describe('Controller: HomeController', function()
{
    // load the module.
    beforeEach(module('<%= app_name %>'));

    // Make variables scoped so that we can test them.
    var home;

    // Here, we're passing the angular service $controller, which is used to create the actual controller.
    // We would pass any mocked services as well.
    beforeEach(inject(function($controller) {
        home = $controller('HomeController');
    }));


    /******************************************************************
     *          Tests go here.
     ******************************************************************/

    it (' should be defined', function(done){
        expect(home).toBeDefined();
        done();
    });

    it(' should have a string on scope', function(done) {
        expect(home.string).toBeDefined();
        done();
    });

    it(' should have a string that matches "A string!"', function(done) {
        expect(home.string).toEqual('A string!');
        done();
    });

    it(' should have a number on scope', function(done) {
        expect(home.number).toBeDefined();
        done();
    });

    it(' should have a number that matches 123', function(done) {
        expect(home.number).toEqual(123);
        done();
    });

});
