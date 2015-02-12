'use strict';
/*jshint esnext: true */

class TmdbFactory {
  constructor(Restangular) {
    this.Restangular = Restangular;
    Restangular.all('configs').getList()
    .then(function(results) {
      console.log('config: ', results);
      this.configuration = results[0];
    }.bind(this));
  }

  all(name) {
    return this.Restangular.all(name).getList();
  }

  search(name, query) {
    return this.Restangular.all(name).customGET('search/'+query);
  }

  config() {
    return this.configuration;
  }

  static tmdbFactory(Restangular){
    return new TmdbFactory(Restangular);
  }
}

TmdbFactory.$inject = ['Restangular'];

export default TmdbFactory;
