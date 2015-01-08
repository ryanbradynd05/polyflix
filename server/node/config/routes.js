'use strict';

// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
module.exports = function routes() {
    this.resources('movies', {
        only: [ 'index', 'create', 'show', 'update', 'destroy' ]
    });
    this.match('movies', 'movies#deleteAll', {
        via: 'delete'
    });
};