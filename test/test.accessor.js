/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	log10 = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor log10', function tests() {

	it( 'should export a function', function test() {
		expect( log10 ).to.be.a( 'function' );
	});

	it( 'should compute the base-10 logarithm using an accessor', function test() {
		var data, actual, expected;

		data = [
			{'x': Math.pow( 10, 4 ) },
			{'x': Math.pow( 10, 6 ) },
			{'x': Math.pow( 10, 9 ) },
			{'x': Math.pow( 10, 15 ) },
			{'x': Math.pow( 10, 10 ) },
			{'x': Math.pow( 10, 25 ) }
		];
		actual = new Array( data.length );

		actual = log10( actual, data, getValue );
		expected = [ 4, 6, 9, 15, 10, 25 ];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( log10( [], [], getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = new Array( data.length );
		actual = log10( actual, data, getValue );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

});
