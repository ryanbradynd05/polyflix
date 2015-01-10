'use strict';

var should = require('should');

module.exports = {
    checkAttribute: function(model, name, type) {
        var attribute = model.attributes[name];
        should.exist(attribute);
        should.equal(attribute.type._typeName,type);
    }
};