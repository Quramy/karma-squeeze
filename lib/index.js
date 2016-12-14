'use strict';

var fs = require('fs');
var path = require('path');
var squeeze = require('./squeeze');


var karmaSqueeze = function(logger, basePath, config, files, exclude) {
	config = typeof config === 'object' ? config : {};
	var log = logger.create('karma-squeeze');
  var rules = config.rules || [];
  var list = getList(config, basePath, log);
  log.info(list);

  const additonalPattens = squeeze(list, rules);

  additonalPattens.forEach(function(item) {
    if (item.type === 'include') {
      files.push({
        pattern: path.join(basePath, item.pattern),
        served: true,
        included: true,
      });
    } else if (item.type === 'exclude') {
      exclude.push(basePath + '/' + item.pattern);
    }
  });
};
karmaSqueeze.$inject = ['logger', 'config.basePath', 'config.squeeze', 'config.files', 'config.exclude'];

function getList(config, basePath, logger) {
  if (config.list) {
    return config.list;
  } else if (typeof config.listPath === 'string') {
    try {
      var content = fs.readFileSync(path.join(basePath, config.listPath), 'utf-8')
    } catch (e) {
      logger.warn('Not found file list: ', config.listPath);
      return [];
    }
    if (path.extname(config.listPath) === '.json') {
      return JSON.parse(content);
    } else {
      return content.split(/\n/);
    }
  } else if (typeof config.listProvider === 'function') {
    return config.listProvider();
  } else {
    return [];
  }
}

module.exports = {
	'framework:squeeze': ['factory', karmaSqueeze]
};
