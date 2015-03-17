import Ember from 'ember';

export default Ember.Object.extend({
  posterDefaultSize: 2,
  posterUrl: function() {
    var posterPath = this.get('poster_path');
    // var config = this.get('tmdbConfig');
    // var images = config.get('images');
    // console.log('images',JSON.stringify(images));
    if (posterPath === undefined || posterPath === null) {
      return 'https://d3a8mw37cqal2z.cloudfront.net/assets/f996aa2014d2ffddfda8463c479898a3/images/no-poster-w185.jpg';
    } else {
      var posterSizes = this.get('tmdbConfig.images.poster_sizes');
      var baseUrl = this.get('tmdbConfig.images.base_url');
      var posterDefaultSize = this.get('posterDefaultSize');
      return baseUrl + posterSizes[posterDefaultSize] + posterPath;
    }
  }.property('poster_path'),
  backdropDefaultSize: 2,
  backdropUrl: function() {
    var backdropPath = this.get('backdrop_path');
    // var config = this.get('tmdbConfig');
    // var images = config.get('images');
    if (backdropPath === undefined || backdropPath === null) {
      return '';
    } else {
        var backdropSizes = this.get('tmdbConfig.images.backdrop_sizes');
        var baseUrl = this.get('tmdbConfig.images.base_url');
        var backdropDefaultSize = this.get('backdropDefaultSize');
        return baseUrl + backdropSizes[backdropDefaultSize] + backdropPath;
    }
  }.property('backdrop_path')
});