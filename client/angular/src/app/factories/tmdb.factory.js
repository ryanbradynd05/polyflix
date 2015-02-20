'use strict';
/*jshint esnext: true */

class TmdbFactory {
  constructor(Restangular) {
    this.Restangular = Restangular;
  }

  config() {
    if (this.configuration === undefined) {
      this.configuration = this.Restangular.all('configs').getList();
    }
  }

  all(name) {
    this.config();
    return this.Restangular.all(name).getList();
  }

  create(name, item) {
    this.config();
    return this.Restangular.all(name).post(item);
  }

  movieSearch(query) {
    this.config();
    return this.Restangular.all('movies').customGET('search/'+query);
  }

  movieInfo(id) {
    this.config();
    return this.Restangular.one('movies').customGET('info/'+id);
  }

  getPosterUrl(image, size) {
    if (image === undefined) {
      return 'https://d3a8mw37cqal2z.cloudfront.net/assets/f996aa2014d2ffddfda8463c479898a3/images/no-poster-w185.jpg';
    }
    var posterSizes = this.configuration.$object[0].images.poster_sizes; // jshint ignore:line
    if (size === undefined) {
      size = posterSizes.length-1;
    }
    var url = this.configuration.$object[0].images.base_url + posterSizes[size] + image; // jshint ignore:line
    return url;
  }

  getBackdropUrl(image, size) {
    if (image === undefined) {
      return '';
    }
    var backdropSizes = this.configuration.$object[0].images.backdrop_sizes; // jshint ignore:line
    if (size === undefined) {
      size = backdropSizes.length-1;
    }
    var url = this.configuration.$object[0].images.base_url + backdropSizes[size] + image; // jshint ignore:line
    return url;
  }

  static tmdbFactory(Restangular){
    return new TmdbFactory(Restangular);
  }
}

TmdbFactory.$inject = ['Restangular'];

export default TmdbFactory;
