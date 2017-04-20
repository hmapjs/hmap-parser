'use strict';

var fs = require('fs');
var assert = require('assert');
var parse = require('../');
var lex = require('hmap-lexer');

var dir = __dirname + '/cases/';
var testCases = fs.readdirSync(dir).filter(function (name) {
  return /\.hmap$/.test(name);
});

function parseNewlineHmap(str) {
  return str.split('\n').filter(Boolean).map(JSON.parse)
}

function read(path) {
  return fs.readFileSync(__dirname + '/cases/' + path, 'utf8');
}
function write(path, body) {
  return fs.writeFileSync(__dirname + '/cases/' + path, body);
}

testCases.forEach(function (filename) {
  console.dir(filename);
  var token = lex(fs.readFileSync(dir + filename, 'utf8'), {filename: dir + filename});
  var actualAst = parse(token, {filename: filename});
  console.log(JSON.stringify(actualAst));
  console.log("==============================");
});
