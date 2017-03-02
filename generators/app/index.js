'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the posh ' + chalk.red('generator-ld-angular') + ' generator!'
    ));

    var prompts = [{
      name: 'site_name',
      message: 'What is the name of this site? '
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.site_name = props.site_name;
      this.app_name = toCamelCase(props.site_name) + 'App';
      this.package_name = props.site_name.replace(/\W+/g, '-').toLowerCase();
    }.bind(this));
  },

  writing: function () {
    this.directory('','');
  },

  install: function () {
    this.installDependencies();
  }
});


function toCamelCase(sentenceCase) {
    var out = "";
    sentenceCase.split(" ").forEach(function (el, idx) {
        var add = el.toLowerCase();
        out += (idx === 0 ? add : add[0].toUpperCase() + add.slice(1));
    });
    return out;
}

