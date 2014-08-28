'use strict';

function runTask(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		name: '{%= name %}',
		srcPath: 'src',
		assetsPath: 'assets',
		buildPath: 'build',
		destPath: 'dest',

		copy: {
			package: {
				files: [{
					expand: true,
					cwd: './',
					src: ['package.json'],
					dest: '<%= destPath %>'
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
				src: ['tmp/*.js'],
				dest: 'build/template.contact.js',
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
				src: '*',
				dest: 'tmp',
				ext: '.tpl.js'
			}
		},
		//编译js和css到html代码
		comboall: {
			options: {},
			main: {
				files: [{
					expand: true,
					cwd: '',
					src: '*.html',
					dest: 'dest',
					ext: '.combo.html'
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

	grunt.registerTask('dest', ['copy', 'micro_template', 'concat', 'uglify', 'cssmin', 'comboall']);
	grunt.registerTask('default', ['dest']);

};

module.exports = function(grunt) {
	runTask(grunt);
}