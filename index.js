/* jshint node: true */
'use strict';
var ConstantMangler = require('./utils/ConstantMangler');

module.exports = {
  name: 'ember-constant-mangling',
  postprocessTree: function(type, tree) {
    var processedTree = tree;
    if (type === 'all') {
      this.constantMangling.forEach(function(constants) {
        processedTree = new ConstantMangler(processedTree, constants);
      });
    }
    return processedTree;
  },
  setupPreprocessorRegistry: function(type, registry) {
    if (registry.app.options) {
      this.constantMangling = registry.app.options.constantMangling || [];
    }
  }
};
