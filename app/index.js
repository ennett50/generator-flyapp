'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _s = require('underscore.string');
var mkdirp = require('mkdirp');

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
    },{
      type: 'list',
      name: 'grid',
      message: 'What kind grid in your project?',
      choices: [{
          name: 'Responsive',
          value: 'responsive'
        }, {
          name: 'Fixed',
          value: 'fixed'
        }],
      default: 0
    },{
      type: 'input',
      name: 'widthFixed',
      message: 'Width value on fixed grid?',
      default: '980',
      when: function(answers){
        return answers.grid.indexOf('fixed') !== -1;
      }

    }, {
      type: 'input',
      name: 'widthResponsive',
      message: 'Width value on responsive grid?',
      default: '1280',
      when: function(answers){
        return answers.grid.indexOf('responsive') !== -1;
      }
    }];

    this.prompt(prompts, function (props) {
      function hasFeature(feat) { return props.grid.indexOf(feat) !== -1; }

      this.props = props;
      this.projectTitle = _s.humanize(props.projectTitle);
      this.jquery = props.jquery;
      this.grid = props.grid;

      this.responsive = hasFeature('responsive');
      this.widthResponsive = props.widthResponsive;
      this.fixed = hasFeature('fixed');
      this.widthFixed = props.widthFixed;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      mkdirp('___scaffolding');
      mkdirp('__index');
      mkdirp('_dev');

      this.fs.copy(
        this.templatePath('_index'),
        this.destinationPath('__index')
      );
      this.fs.copy(
        this.templatePath('styles'),
        this.destinationPath('_dev/styles')
      );

      this.template('_package.json', '___scaffolding/package.json');
      this.template('_index/index.jade', '__index/index.jade');
      this.template('styles/01_variables.styl', '_dev/styles/01_variables.styl');

      // this.fs.copy(
      //   this.templatePath('_package.json'),
      //   this.destinationPath('__scaffolding/package.json')
      // );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('___scaffolding/bower.json')
      );

    
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('___scaffolding/.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('___scaffolding/.jshintrc')
      );
      

      mkdirp('_dev/images');
      mkdirp('_dev/images/_example');
      mkdirp('_dev/images/elements');
      mkdirp('_dev/images/icons');

      mkdirp('_dev/scripts');
      mkdirp('_dev/scripts/base');

      mkdirp('_dev/styles');
      mkdirp('_dev/styles/base');

  

      

      // mkdirp('_dev/js');
      // this.copy('favicon.ico', '_dev/favicon.ico');
      // this.copy('404.html', '_dev/404.html');
      // this.copy('robots.txt', '_dev/robots.txt');
      // this.copy('htaccess', '_dev/.htaccess');
    }
  },

  install: function () {
    this.installDependencies();
  }
});
