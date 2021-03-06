import Ember from 'ember';

export default Ember.Object.extend({
  posterDefaultSize: 2,
  posterUrl: function() {
    var posterPath = this.get('poster_path');
    var config = this.get('config');
    if (posterPath === undefined || posterPath === null) {
      return 'https://d3a8mw37cqal2z.cloudfront.net/assets/f996aa2014d2ffddfda8463c479898a3/images/no-poster-w185.jpg';
    } else {
      var posterSizes = config.get('images.poster_sizes');
      var baseUrl = config.get('images.base_url');
      var posterDefaultSize = this.get('posterDefaultSize');
      return baseUrl + posterSizes[posterDefaultSize] + posterPath;
    }
  }.property('poster_path'),
  backdropDefaultSize: 2,
  backdropUrl: function() {
    var backdropPath = this.get('backdrop_path');
    var config = this.get('config');
    if (backdropPath === undefined || backdropPath === null) {
      return '';
    } else {
        var backdropSizes = config.get('images.backdrop_sizes');
        var baseUrl = config.get('images.base_url');
        var backdropDefaultSize = this.get('backdropDefaultSize');
        return baseUrl + backdropSizes[backdropDefaultSize] + backdropPath;
    }
  }.property('backdrop_path')
});