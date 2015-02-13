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
    console.log('All',name);
    return this.Restangular.all(name).getList();
  }

  create(name, item) {
    console.log('Create',name,item);
    return this.Restangular.all(name).post(item);
  }

  movieSearch(query) {
    console.log('movieSearch',query);
    return this.Restangular.all('movies').customGET('search/'+query);
  }

  movieInfo(id) {
    console.log('movieInfo',id);
    return this.Restangular.one('movies').customGET('info/'+id);
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
