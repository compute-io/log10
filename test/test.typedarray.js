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

describe( 'typed-array log10', function tests() {

	it( 'should export a function', function test() {
		expect( log10 ).to.be.a( 'function' );
	});

	it( 'should compute the base-10 logarithm', function test() {
		var data, actual, expected;

		data = new Float32Array( [
			Math.pow( 10, 2 ),
			Math.pow( 10, 0 ),
			Math.pow( 10, 3 ),
			Math.pow( 10, 10 ),
			Math.pow( 10, 9 ),
			Math.pow( 10, 4 )
		] );
		actual = new Float32Array( data.length );

		actual = log10( actual, data );
		expected = new Float32Array( [ 2, 0, 3, 10, 9, 4 ] );

		assert.deepEqual( actual, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( log10( new Int8Array(), new Int8Array() ), new Int8Array() );
	});

});
