var assert = require('power-assert');
var configBuilder = require('../lib/configBuilder');

describe('configBuilder', function() {
  var config, builder;
  beforeEach(function() {
    var tmp = configBuilder();
    builder = tmp.builder;
    config = tmp.config;
  });

  it('should build config with self include', function() {
    builder.path('hoge').includeSelf();
    assert.deepEqual(config, [{test: 'hoge', self: true}]);
  });

  it('should build config with self include and chain', function() {
    rule= builder.path('hoge').includeSelf().and().path('piyo');
  });

  it('should build config with include chain', function() {
    builder.path('hoge').include('foo').include('piyo');
    assert.deepEqual(config, [{test: 'hoge', include: ['foo', 'piyo']}]);
  });

  it('should build config with exclude chain', function() {
    builder.path('hoge').exclude('foo').exclude('piyo');
    assert.deepEqual(config, [{test: 'hoge', exclude: ['foo', 'piyo']}]);
  });

  it('should build next rule with and chain', function() {
    builder.path('hoge').include('foo').and().path('bar').include('foo');
    assert.deepEqual(config, [
      {test: 'hoge', include: ['foo']},
      {test: 'bar', include: ['foo']}
    ]);
  });

  it('should build other rule', function() {
    builder.other().include('foo').exclude('hoge');
    assert.deepEqual(config, [{other: true, include: ['foo'], exclude: ['hoge']}]);
  });
});
