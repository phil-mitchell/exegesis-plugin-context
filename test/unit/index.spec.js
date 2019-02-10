'use strict';

var expect = require( 'chai' ).expect;
var require_helper = require( '../require_helper' );
var index = require_helper( 'index' );

describe( 'No options', function() {
    before( function() {
        this.plugin = index();
        this.instance = this.plugin.makeExegesisPlugin();
    });
    it( 'sets extraContext to undefined', function() {
        var context = {};
        this.instance.postRouting( context );
        expect( context.extraContext ).to.be.undefined;
    });
});

describe( 'Null options', function() {
    before( function() {
        this.plugin = index( null );
        this.instance = this.plugin.makeExegesisPlugin();
    });
    it( 'sets extraContext to null', function() {
        var context = {};
        this.instance.postRouting( context );
        expect( context.extraContext ).to.be.null;
    });
});

describe( 'Empty options', function() {
    before( function() {
        this.plugin = index({});
        this.instance = this.plugin.makeExegesisPlugin();
    });
    it( 'sets extraContext to null', function() {
        var context = {};
        this.instance.postRouting( context );
        expect( context.extraContext ).to.eql({});
    });
});

describe( 'Empty options', function() {
    before( function() {
        this.plugin = index({});
        this.instance = this.plugin.makeExegesisPlugin();
    });
    it( 'sets extraContext to empty object', function() {
        var context = {};
        this.instance.postRouting( context );
        expect( context.extraContext ).to.eql({});
    });
});

describe( 'Non-empty options', function() {
    before( function() {
        this.plugin = index({
            foo: {}
        });
        this.instance = this.plugin.makeExegesisPlugin();
    });
    it( 'sets extraContext to provided object', function() {
        var context = {};
        this.instance.postRouting( context );
        expect( context.extraContext ).to.eql({ foo: {} });
    });
});

describe( 'Options are copied', function() {
    before( function() {
        this.plugin = index({
            foo: {}
        });
        this.instance = this.plugin.makeExegesisPlugin();
    });
    it( 'sets extraContext to a copy of the provided object', function() {
        var context = {};
        this.instance.postRouting( context );
        context.extraContext.bar = 123;
        expect( context.extraContext ).to.eql({ foo: {}, bar: 123 });
        expect( this.plugin.options ).to.eql({ foo: {} });
    });
});
