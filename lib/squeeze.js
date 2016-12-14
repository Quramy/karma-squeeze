var minimatch = require('minimatch');

function pushIncludeOrExclude(rule, result) {
  if (rule.include) {
    if (Array.isArray(rule.include)) {
      rule.include.forEach(function(pattern) {
        result.push({pattern: pattern, type: 'include'});
      });
    } else if (typeof rule.include === 'string') {
      result.push({pattern: rule.include, type: 'include'});
    }
  }
  if (rule.exclude) {
    if (Array.isArray(rule.exclude)) {
      rule.exclude.forEach(function(pattern) {
        result.push({pattern: pattern, type: 'exclude'});
      });
    } else if (typeof rule.exclude === 'string') {
      result.push({pattern: rule.exclude, type: 'exclude'});
    }
  }
  return result;
}

function squeeze(list, config, log) {
  var result = [];
  if (!list || !config) return [];
  list.forEach(function(item) {
    var matched = false, otherRule;
    config.forEach(function(rule) {
      if (rule.other && !otherRule) return otherRule = rule;
      if (rule.test && minimatch(item, rule.test)) {
        matched = true;
        if (rule.self) {
          result.push({pattern: item, type: 'include'});
        }
        pushIncludeOrExclude(rule, result);
      }
    });
    if (!matched && otherRule) {
      pushIncludeOrExclude(otherRule, result);
    }
  });
  return result;
}

module.exports = squeeze;
