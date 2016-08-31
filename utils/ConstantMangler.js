/* eslint-env node */
/* jscs:disable */
var Filter = require('broccoli-filter');
var _ = require('lodash');

function intToLetters(index) {
  var result = '';
  index = index + 1;
  while (--index >= 0) {
    result = String.fromCharCode(index % 26 + 65) + result;
    index = Math.floor(index / 26);
  }
  return result;
}

function ConstantMangler(inputNode, csCommands) {
  // Initialize mangled command list
  this.srcCommands = _.shuffle(Object.keys(csCommands));
  this.dstCommands = this.srcCommands.map(function(item, index) { return intToLetters(index); });
  if (!(this instanceof ConstantMangler)) {
    return new ConstantMangler(inputNode);
  }
  Filter.call(this, inputNode, {
    annotation: 'Constant Mangling'
  });
}
ConstantMangler.prototype = Object.create(Filter.prototype);
ConstantMangler.prototype.constructor = ConstantMangler;
ConstantMangler.prototype.extensions = ['js'];
ConstantMangler.prototype.targetExtension = 'js';
ConstantMangler.prototype.processString = function(content) {
  for (var i = 0; i < this.srcCommands.length; i++) {
    content = content.replace(new RegExp(this.srcCommands[i] + '([\s,:;\)"])', 'gm'), this.dstCommands[i] + '$1');
  }
  return content;
};

module.exports = ConstantMangler;
