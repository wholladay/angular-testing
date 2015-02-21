/* global describe, beforeEach, module, it, inject, expect */
describe('myApp.view2 module', function() {
    'use strict';

  beforeEach(module('myApp.view2'));

  describe('view2 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view2Ctrl = $controller('View2Ctrl');
      expect(view2Ctrl).toBeDefined();
    }));

  });
});