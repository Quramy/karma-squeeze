var minimatch = require('minimatch');

function squeeze(list, config, log) {
  var result = [];
  if (!list || !config) return [];
  list.forEach(function(item) {
    config.forEach(function(rule) {
      var hit = minimatch(item, rule.test);
      if (hit) {
        if (rule.self) {
          result.push({pattern: item, type: 'include'});
        }
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
      }
    });
  });
  return result;
}

module.exports = squeeze;
