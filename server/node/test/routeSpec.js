var should = require('should'),
    locomotive = require('locomotive');

describe('Application', function() {
    before(function(done) {
        // boot LocomotiveJS app
        this.app = new locomotive.Locomotive();
        this.app.boot(__dirname + '/..', 'test', function() {
            done();
        });
    });
});