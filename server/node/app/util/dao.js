'use strict';

function Dao(model) {
    this.model = model;
}

Dao.prototype = {
    handlePromise: function(promise, context, name) {
        promise
            .success(function(results) {
                var respObj = {};
                respObj[name] = results;
                context.res.send(respObj);
            })
            .error(function(error) {
                context.next(error);
            });
    },
    create: function(context, name, params) {
        var promise = this.model.create(params);
        this.handlePromise(promise, context, name);
    },
    deleteAll: function(context) {
        if (process.env.NODE_ENV === 'test') {
            this.model.destroy();
        }
        context.res.send({});
    },
    destroy: function(context, name, id) {
        this.model.find(id)
            .success(function(result) {
                result.destroy()
                    .success(function(result) {
                        var respObj = {};
                        respObj[name] = {};
                        context.res.send(respObj);
                    })
                    .error(function(error) {
                        context.next(error);
                    });
            })
            .error(function(error) {
                context.next(error);
            });
    },
    findAll: function(context, name) {
        var promise = this.model.findAll();
        this.handlePromise(promise, context, name);
    },
    show: function(context, name, id) {
        var promise = this.model.find(id);
        this.handlePromise(promise, context, name);
    },
    update: function(context, name, id, params) {
        this.model.find(id)
            .success(function(result) {
                result.updateAttributes(params)
                    .success(function() {
                        var respObj = {};
                        respObj[name] = result;
                        context.res.send(respObj);
                    })
                    .error(function(error) {
                        context.next(error);
                    });
            })
            .error(function(error) {
                context.next(error);
            });
    }
};

module.exports = Dao;