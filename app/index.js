'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var util = require('util');
var yosay = require('yosay');
var path = require('path');





var FlyAppGenerator = module.exports = function FlyAppGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  //ищет путь до текущего файла от рабочей текущей дирректории самого процесса
  this.appname = path.basename(process.cwd());


  // опция - отмена установки модулей
  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  //берем package в текущец дирректории
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

};
util.inherits(FlyAppGenerator, yeoman.generators.Base);

FlyAppGenerator.prototype.askFor = function askFor() {
  var cb = this.async();
  // have Yeoman greet the user.
  console.log(this.yeoman);


  var prompts = [{
    type: 'input',
    name: 'projectName',
    message: 'Enter name for frontend project',
    //default: this._.humanize(path.basename(process.cwd()))
    //default:  this.destinationRoot()
   // default:  __dirname
   default: this.appname

  },{
    type: 'list',
    name: 'framework',
    message: 'Какой фреймворк будем использовать?',
    choices: [{
        name: 'Foundation 5',
        value: 'foundation'
      }, {
        name: 'Twitter Bootstrap 3',
        value: 'bootstrap'
    }],
    default: 0
  }];

  this.prompt(prompts, function (props) {
    //функция, которая проверяет наличие выбранного пункта ответа в чекбоксах
    function hasFeature(feat) { return props.features.indexOf(feat) !== -1; }
    this.projectName = props.projectName
    this.framework = props.framework;


    cb();
  }.bind(this));
};


FlyAppGenerator.prototype.git = function git() {
  console.log("git");
  this.copy('gitignore', '.gitignore');
};

FlyAppGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
};
FlyAppGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
}
FlyAppGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js', 'Gruntfile.js');
}

FlyAppGenerator.prototype.bower = function bower() {
  this.template('_bower.json', 'bower.json');
  this.copy('bowerrc', '.bowerrc');
}
FlyAppGenerator.prototype.readIndex = function readIndex() {
  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.indexFile = this.engine(this.indexFile, this);
}

FlyAppGenerator.prototype.writeIndex = function writeIndex() {
  var fndir = 'bower_components/foundation/js/foundation/';
  var twbsdir = 'bower_components/sass-bootstrap/js/';
  if (this.framework == 'foundation') {
    this.indexFile = this.appendScripts(this.indexFile, 'js/foundation.js', [
      fndir + "foundation.js",
      fndir + "foundation.abide.js",
      fndir + "foundation.accordion.js",
      fndir + "foundation.alert.js",
      fndir + "foundation.clearing.js",
      fndir + "foundation.dropdown.js",
      fndir + "foundation.interchange.js",
      fndir + "foundation.joyride.js",
      fndir + "foundation.magellan.js",
      fndir + "foundation.offcanvas.js",
      fndir + "foundation.orbit.js",
      fndir + "foundation.reveal.js",
      fndir + "foundation.tab.js",
      fndir + "foundation.tooltip.js",
      fndir + "foundation.topbar.js"
      ]);
  } else if (this.framework == 'bootstrap') {
    this.indexFile = this.appendScripts(this.indexFile, 'js/bootstrap.min.js', [
        twbsdir + "affix.js",
        twbsdir + "alert.js",
        twbsdir + "dropdown.js",
        twbsdir + "tooltip.js",
        twbsdir + "modal.js",
        twbsdir + "transition.js",
        twbsdir + "button.js",
        twbsdir + "popover.js",
        twbsdir + "carousel.js",
        twbsdir + "scrollspy.js",
        twbsdir + "collapse.js",
        twbsdir + "tab.js"
      ]);
  }
};

FlyAppGenerator.prototype.app = function app() {
  this.mkdir('web');
  this.mkdir('web/css');
  this.mkdir('web/fonts');
  this.mkdir('web/img');
  this.mkdir('web/js');

  this.write('web/index.html', this.indexFile);

  this.copy('favicon.ico', 'web/favicon.ico');
  this.copy('404.html', 'web/404.html');
  this.copy('robots.txt', 'web/robots.txt');
  this.copy('htaccess', 'web/.htaccess');
};

