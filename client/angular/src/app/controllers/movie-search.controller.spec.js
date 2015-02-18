'use strict';

describe('controllers', function() {
  beforeEach(module('polyflix'));

  it('should ....', inject(function($controller) {
    console.log('controller',$controller);
    var movieSearchCtrl = $controller('MovieSearchCtrl');
    expect(movieSearchCtrl).toBeDefined();
  }));
});