/*
 * grunt-init-mtbproj
 * https://gruntjs.com/
 *
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = '创建一个运营页面';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_项目名称_ 不能包含“gitlab”、“mtb”、“app”、“lib”或者“js”等字样';

// Template-specific notes to be displayed after question prompts.
exports.after = '用 _npm install_ 安装依赖模块，此后，可以通过 _grunt_ 来运行任务。' + 
  '关于安装和配置Grunt，请参考 《Getting Started Guide》: \n\n  ' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {
  var PROMPT_WORDS = {
  //  'type': '项目类型',
    'name': '项目名称',
    'description': '项目描述',
    'version': '项目版本',
    'repository': '项目代码库',
   // 'homepage': '项目主页',
    'licenses': '项目版权',
    'author_name': '开发者姓名',
    //'author_email': '开发者邮箱',
    //'publish_dir': '发布目录'
  }

  init.process({type: 'mtbproj'}, [
    // Prompt for these values.
   // init.prompt(PROMPT_WORDS.type, 'lib'),
    init.prompt(PROMPT_WORDS.name, 'mtTemplate'),
    init.prompt(PROMPT_WORDS.description, '运营页面'),
    init.prompt(PROMPT_WORDS.version, '0.0.1'),
    init.prompt(PROMPT_WORDS.repository),
   // init.prompt(PROMPT_WORDS.homepage),
    init.prompt(PROMPT_WORDS.licenses, 'MIT'),
    init.prompt(PROMPT_WORDS.author_name),
   // init.prompt(PROMPT_WORDS.author_email),
   // init.prompt(PROMPT_WORDS.publish_dir, 'build')
  ], function(err, props) {
    // A few additional properties.
    for (var k in PROMPT_WORDS) {
      //if (props[PROMPT_WORDS[k]]) {
        if (k === 'licenses') {
          props[PROMPT_WORDS[k]] = props[PROMPT_WORDS[k]].split(',');
        }
        props[k] = props[PROMPT_WORDS[k]];
        delete props[PROMPT_WORDS[k]];
      //}
    }

    // props.combo = {};
    // props.dependencies = {};
    // props.devDependencies = {
    //   "grunt": "~0.4.1",
    //   "grunt-depconcat": "~0.2.0",
    //   "grunt-depcombo": "~0.2.0",
    //   "grunt-contrib-copy": "~0.4.1",
    //   "grunt-contrib-less": "~0.6.4",
    //   "grunt-contrib-cssmin": "~0.6.0",
    //   "grunt-contrib-uglify": "~0.2.0",
    //   "grunt-contrib-watch": "~0.4.0"
    // };
    // props.node_version  = '>= 0.8.0';
    // props.keywords = [PROMPT_WORDS.type, PROMPT_WORDS.name];

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file, used by npm and grunt.
    // init.writePackageJSON('package.json', props);

    // All done!
    done();
  });
};