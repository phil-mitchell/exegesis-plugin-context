'use strict';

var superagent = require( 'superagent' );
var expect = require( 'chai' ).expect;

describe( 'Options', function() {
    it( 'Can access the provided context in the handler', function( done ) {
        superagent
        .get( 'http://localhost:3000/pets' )
        .end( function( e, res ) {
            expect( e ).to.be.null;
            expect( res.text ).to.contain( 'Context contains test123' );
            done();
        });
    });
});

