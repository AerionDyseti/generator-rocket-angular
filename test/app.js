'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-sample:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({site_name: 'Test Site'})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      '.gitignore',
      'gulpfile.js',
      'karma.conf.js',
      'package.json',
      'tests/controllers/home.controller.test.js',
      'app/src/app.js',
      'app/src/app.scss',
      'app/src/index.html'
    ]);
  });


});
