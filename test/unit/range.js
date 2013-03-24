'use strict';

var assert = require('../assert');

suite('range');

test('natural range', function() {
	assert.compileTo([
		'body {',
		'	-foo: 1..3;',
		'}',
	], [
		'body {',
		'	-foo: 1 2 3;',
		'}',
	]);
});

test('natural exclusive range', function() {
	assert.compileTo([
		'body {',
		'	-foo: 1...3;',
		'}',
	], [
		'body {',
		'	-foo: 1 2;',
		'}',
	]);
});

test('reversed range', function() {
	assert.compileTo([
		'body {',
		'	-foo: 3..1;',
		'}',
	], [
		'body {',
		'	-foo: 3 2 1;',
		'}',
	]);
});

test('reversed exclusive range', function() {
	assert.compileTo([
		'body {',
		'	-foo: 3...1;',
		'}',
	], [
		'body {',
		'	-foo: 3 2;',
		'}',
	]);
});

test('one number range', function() {
	assert.compileTo([
		'body {',
		'	-foo: 1..1;',
		'}',
	], [
		'body {',
		'	-foo: 1;',
		'}',
	]);
});

test('empty range', function() {
	assert.compileTo([
		'body {',
		'	-foo: 1...1;',
		'}',
	], [
		'body {',
		'	-foo: null;',
		'}',
	]);
});

test('percentage range', function() {
	assert.compileTo([
		'body {',
		'	-foo: 0%..2%;',
		'}',
	], [
		'body {',
		'	-foo: 0% 1% 2%;',
		'}',
	]);
});

test('dimension range', function() {
	assert.compileTo([
		'body {',
		'	-foo: 100px..102px;',
		'}',
	], [
		'body {',
		'	-foo: 100px 101px 102px;',
		'}',
	]);
});

test('mixed range', function() {
	assert.compileTo([
		'body {',
		'	-foo: 1px..3%;',
		'}',
	], [
		'body {',
		'	-foo: 1px 2px 3px;',
		'}',
	]);
});

test('reversed single-number mixed exclusiverange', function() {
	assert.compileTo([
		'body {',
		'	-foo: 2px...1%;',
		'}',
	], [
		'body {',
		'	-foo: 2px;',
		'}',
	]);
});

test('start number must be numberic', function() {
	assert.failAt([
		'body {',
		'	-foo: a...3;',
		'}',
	], {line: 2, column: 8});
});

test('end number must be numberic', function() {
	assert.failAt([
		'body {',
		'	-foo: 1..b;',
		'}',
	], {line: 2, column: 11});
});