var assert = require('power-assert');
var squeeze = require('../lib/squeeze');

describe('squeeze', function() {

  beforeEach(function() {
  });

  describe("simple pattern", function() {
    it('should return empty list when config does not match any diff', function() {
      var config = [
        {test: '**/*.jsx', self: true},
      ];
      diff = [ 'src/modules/foo.js' ];
      var actual = squeeze(diff, config);
      assert.deepEqual(actual, []);
    });

    it('should return list of items type self', function() {
      var config = [
        {test: '**/*.js', self: true},
      ];
      diff = [ 'src/modules/foo.js' ];
      var actual = squeeze(diff, config);
      assert.deepEqual(actual, [{type: 'include', pattern: 'src/modules/foo.js'}]);
    });

    it('should return list of items type include string', function() {
      var config = [
        {test: '**/*.js', include: 'foo'}
      ];
      diff = [
        'src/modules/foo.js',
      ];
      var actual = squeeze(diff, config);
      assert.deepEqual(actual, [{type: 'include', pattern: 'foo'}]);
    });

    it('should return list of items type include array', function() {
      var config = [
        {test: '**/*.js', include: ['foo', 'hoge']},
      ];
      diff = [
        'src/modules/foo.js',
      ];
      var actual = squeeze(diff, config);
      assert.deepEqual(actual, [{type: 'include', pattern: 'foo'}, {type: 'include', pattern: 'hoge'}]);
    });

    it('should return list of items type exclude string', function() {
      var config = [
        {test: '**/*.js', exclude: 'foo'}
      ];
      diff = [
        'src/modules/foo.js',
      ];
      var actual = squeeze(diff, config);
      assert.deepEqual(actual, [{type: 'exclude', pattern: 'foo'}]);
    });

    it('should return list of items type exclude array', function() {
      var config = [
        {test: '**/*.js', exclude: ['foo', 'hoge']}
      ];
      diff = [
        'src/modules/foo.js',
      ];
      var actual = squeeze(diff, config);
      assert.deepEqual(actual, [{type: 'exclude', pattern: 'foo'}, {type: 'exclude', pattern: 'hoge'}]);
    });
  });

  describe('complex pattern', function() {

    var config;
    beforeEach(function () {
      config = [
        {test: '**/*.spec.js', self: true},
        {test: 'src/modules/core/**/*.js', include: '**/*.spec.js'},
        {test: 'src/modules/ui/**/*.js', include: ['test/modules/{ui,feat}/**/*.spec.js'], exclude: 'test/modules/core/**/*.spec.js'},
        {test: 'config/**/*', exclude: '**/*.spec.js'}
      ];
    });

    it('diff a', function() {
      var diff = ['src/modules/core/index.js', 'package.json'];
      var actual = squeeze(diff, config);
      var expected = [{type: 'include', pattern: '**/*.spec.js'}];
      assert.deepEqual(actual, expected);
    });

  });

});
