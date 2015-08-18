/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	log10 = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number log10', function tests() {

	it( 'should export a function', function test() {
		expect( log10 ).to.be.a( 'function' );
	});

	it( 'should compute the base-10 logarithm', function test() {
		assert.closeTo( log10( 7 ), 0.84509804, 1e-7 );
		assert.closeTo( log10( 90 ), 1.95424250, 1e-7  );
		assert.closeTo( log10( 300 ), 2.47712125, 1e-7  );
	});

	it( 'should return `NaN` if provided with a negative number or zero', function test() {
		var val;

		val = log10( -9 );
		assert.isTrue( val !== val );

		val = log10( -900 );
		assert.isTrue( val !== val );

		val = log10( -81 );
		assert.isTrue( val !== val );
	});

});
