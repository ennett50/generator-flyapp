'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _s = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.appname = path.basename(process.cwd());
    this.currentYear = (new Date()).getFullYear();
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the flawless ' + chalk.red('Flyapp') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'projectTitle',
      message: 'Enter name your frontend project',
      default: _s.humanize(this.appname),
      validate: function(value){
        return !!value
      }
    }, {
      type: 'confirm',
      name: 'jquery',
      message: 'Would you use JQuery?',
      default: true
    }, {
      type: 'input',
      name: 'versionJquery',
      message: 'What version JQuery (1.8.3 <= )?',
      default: '1.8.3',
      when: function(answers){
        return answers.jquery;
      }
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
