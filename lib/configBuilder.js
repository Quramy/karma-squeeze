module.exports = function configBuilder () {
  var config = [];
  var andFn = function () {
    return builder;
  };
  var includeFn = function(ruleBuilder, rule, pattern) {
    if (!rule.include) {
      rule.include = [];
    }
    rule.include.push(pattern);
    return ruleBuilder;
  };
  var excludeFn = function(ruleBuilder, rule, pattern) {
    if (!rule.exclude) {
      rule.exclude = [];
    }
    rule.exclude.push(pattern);
    return ruleBuilder;
  };
  var builder = {
    path: function (p) {
      var rule = {test: p};
      var ruleBuilder = {
        and: andFn,
        includeSelf: function() { rule.self = true; return ruleBuilder;},
        include: function (pattern) {return includeFn(ruleBuilder, rule, pattern);},
        exclude: function (pattern) {return excludeFn(ruleBuilder, rule, pattern);},
      };
      config.push(rule);
      return ruleBuilder;
    },
    other: function() {
      var rule = {other: true};
      config.push(rule);
      var ruleBuilder = {
        and: andFn,
        include: function (pattern) {return includeFn(ruleBuilder, rule, pattern);},
        exclude: function (pattern) {return excludeFn(ruleBuilder, rule, pattern);},
      };
      return ruleBuilder;
    }
  };
  return {
    builder: builder,
    config: config
  };
}
