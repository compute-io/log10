/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	log10 = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array log10', function tests() {

	it( 'should export a function', function test() {
		expect( log10 ).to.be.a( 'function' );
	});

	it( 'should compute the base-10 logarithm', function test() {
		var data, actual, expected;

		data = [
			Math.pow( 10, 4 ),
			Math.pow( 10, 6 ),
			Math.pow( 10, 9 ),
			Math.pow( 10, 15 ),
			Math.pow( 10, 10 ),
			Math.pow( 10, 25 )
		];
		actual = new Array( data.length );

		actual = log10( actual, data );
		expected = [ 4, 6, 9, 15, 10, 25 ];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( log10( [], [] ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [ true, null, [], {} ];
		actual = new Array( data.length );
		actual = log10( actual, data );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );
	});

});
