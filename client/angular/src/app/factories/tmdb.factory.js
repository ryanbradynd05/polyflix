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

  getPosterUrl(image, size) {
    if (image === null) {
      return '';
    }
    var config = this.configuration;
    var posterSizes = config.images.poster_sizes; // jshint ignore:line
    if (size === undefined) {
      size = posterSizes.length-1;
    }
    var url = config.images.base_url + posterSizes[size] + image; // jshint ignore:line
    return url;
  }

  getBackdropUrl(image, size) {
    if (image === null) {
      return '';
    }
    var config = this.configuration;
    var backdropSizes = config.images.backdrop_sizes; // jshint ignore:line
    if (size === undefined) {
      size = backdropSizes.length-1;
    }
    console.log('backdropSizes: ',backdropSizes,size);
    var url = config.images.base_url + backdropSizes[size] + image; // jshint ignore:line
    return url;
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
