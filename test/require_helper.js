'use strict';

const path = require( 'path' );

const src_dir = ( process.env.APP_DIR_FOR_CODE_COVERAGE || path.resolve( __dirname, '..' ) ) + '/src/';
module.exports = function( req ) {
    return require( src_dir + req );
};
