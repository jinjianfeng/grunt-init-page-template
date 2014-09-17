'use strict';

function runTask(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		name: 'mtTemplate',
		srcPath: 'src',
		assetsPath: 'assets',
		buildPath: 'build',
		destPath: 'dest',

		copy: {
			main: {
				files: [{
					expand: true,
					cwd: '<%=srcPath%>',
					src: ['*.js','.css'],
					dest:  '_temp'

				}]
			}
		},


		uglify: {
			main: {
				files: [{
					expand: true,
					cwd: '<%= srcPath %>',
					src: ['*.js'],
					dest: '<%= buildPath %>',
					ext: '.min.js'
				}]
			}
		},

		cssmin: {
			options: {
				report: 'min'
			},

			main: {
				files: [{
					expand: true,
					cwd: '<%= srcPath %>',
					src: ['*.css'],
					dest: '<%= buildPath %>',
					ext: '.min.css'
				}]
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: ['template/*.js'],
				dest: '_temp/template.contact.js',
			}
		},
		//编译template目录中的模板文件
		micro_template: {
			options: {
				banner: ''
			},
			build: {
				expand: true,
				cwd: 'template',
				src: '*.tpl',
				dest: 'template',
				ext: '.compilerTpl.js'
			}
		},
		//编译js和css到html代码
		comboall: {
			options: {
			},
			main: {
				files: [{
					expand: true,
					cwd: '_temp',
					src: '*.html',
					dest: 'dest',
					ext: '.combo.html'
				}]
			}
		},

		//处理html dom
		html_handle: {
			options: {
				banner: ''
			},
			main: {
				files: [{
					expand: true,
					cwd: '',
					src: '*.html',
					dest: '_temp',
					ext: '.html'
				}]
			}
		},
		//处理css 成rem
		rem_css: {
			options: {
				banner: ''
			},
			main: {
				files: [{
					expand: true,
					cwd: 'src',
					src: '*.css',
					dest: '_temp',
					ext: '.css'
				}]
			}
		},

		packset: {
			options: {
				banner: '',
				htmlExt:['.html','.htm'],
				cssExt:['.css','.less']
			},
			html: {
				files: [{
					expand: true,
					cwd: '',
					src: '*.html',
					dest: '_temp',
					ext: '.html'
				}]
			},
			css: {
				files: [{
					expand: true,
					cwd: 'src',
					src: '*.css',
					dest: '_temp',
					ext: '.css'
				}]
			}

		},

		watch: {
			package: {
				files: ['package.json'],
				tasks: ['copy:package']
			},


			js: {
				files: ['<%= srcPath %>/*.js', '<%= srcPath %>/**/*.js'],
				tasks: ['uglify:main']
			},

			pack:{
				files: ['<%= srcPath %>/*.css'],
				tasks: ['packset:css']
			},
			css: {
				files: ['<%= srcPath %>/*.css'],
				tasks: ['cssmin:main']
			}
		}

	});



	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.loadNpmTasks('grunt-combo-html-css-js');
	grunt.loadNpmTasks('grunt-micro-based-template');
	//grunt 打包
	grunt.loadNpmTasks('grunt-packset');


	grunt.registerTask('dest',['micro_template','concat'])
	grunt.registerTask('pack', ['packset:html','packset:css']);

	grunt.registerTask('template',['micro_template','concat']);
	grunt.registerTask('dest', ['template','copy','pack','comboall']);
	grunt.registerTask('default', ['dest']);

};

module.exports = function(grunt) {
	runTask(grunt);
}