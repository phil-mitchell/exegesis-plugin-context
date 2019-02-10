'use strict';

const path = require( 'path' );

//const is_ci = process.env.CI === 'true';
const is_shippable = process.env.SHIPPABLE === 'true';

var coverage_dir = is_shippable ? './shippable/codecoverage' : './coverage';
var results_dir = is_shippable ? './shippable/testresults' : '.';

module.exports = function( grunt ) {
    grunt.initConfig({
        clean: [ 'coverage', 'shippable', 'xunit.xml' ],
        env: {
            coverage: {
                APP_DIR_FOR_CODE_COVERAGE: path.resolve( __dirname, 'coverage/instrument' ),
                REPORT_DIR_FOR_CODE_COVERAGE: path.resolve( __dirname, 'coverage/reports' )
            },
            unit: {
                XUNIT_FILE: results_dir + '/unittests.xml'
            },
            integration: {
                XUNIT_FILE: results_dir + '/integrationtests.xml'
            }
        },
        mkdir: {
            report: {
                options: {
                    create: [ path.dirname( process.env.XUNIT_FILE || './xunit.xml' ) ]
                }
            }
        },
        express: {
            test: {
                options: {
                    script: './test/app.js'
                }
            }
        },
        instrument: {
            files: 'src/**/*.js',
            options: {
                lazy: false,
                basePath: './coverage/instrument/'
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec-xunit-file'
            },
            unit: {
                src: [ 'test/unit/**/*.spec.js' ]
            },
            integration: {
                src: [ 'test/integration/**/*.spec.js' ]
            }
        },
        storeCoverage: {
            options: {
                dir: './coverage/reports',
                'include-all-sources': true
            }
        },
        makeReport: {
            src: './coverage/reports/**/*.json',
            options: {
                type: [ 'cobertura', 'html', 'json', 'lcovonly' ],
                dir: coverage_dir,
                print: 'detail'
            }
        }
    });
    grunt.loadNpmTasks( 'grunt-express-server' );
    grunt.loadNpmTasks( 'grunt-mocha-test' );
    grunt.loadNpmTasks( 'grunt-istanbul' );
    grunt.loadNpmTasks( 'grunt-env' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-mkdir' );

    grunt.registerTask( 'dummyCoverage', () => {
        global['__coverage__'] = global['__coverage__'] || {};
    });

    grunt.registerTask( 'unit', [ 'env:unit', 'mkdir:report', 'mochaTest:unit' ] );
    grunt.registerTask( 'integration', [ 'env:integration', 'express:test', 'mkdir:report', 'mochaTest:integration', 'express:test:stop' ] );
    grunt.registerTask( 'default', [ 'clean', 'integration' ] );
    grunt.registerTask( 'coverage', [ 'clean', 'env:coverage', 'instrument',
                                      'unit', 'integration', 'dummyCoverage',
                                      'storeCoverage', 'makeReport' ] );
};
