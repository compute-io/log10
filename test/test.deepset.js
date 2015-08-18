/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	log10 = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset log10', function tests() {

	it( 'should export a function', function test() {
		expect( log10 ).to.be.a( 'function' );
	});

	it( 'should compute the base-10 logarithm and deep set', function test() {
		var data, expected;

		data = [
			{'x': Math.pow( 10, 4 ) },
			{'x': Math.pow( 10, 6 ) },
			{'x': Math.pow( 10, 9 ) },
			{'x': Math.pow( 10, 15 ) },
			{'x': Math.pow( 10, 10 ) },
			{'x': Math.pow( 10, 25 ) }
		];

		data = log10( data, 'x' );
		expected = [
			{'x':4},
			{'x':6},
			{'x':9},
			{'x':15},
			{'x':10},
			{'x':25}
		];

		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		// Custom separator...
		data = [
			{'x':[9,Math.pow( 10, 4 )]},
			{'x':[9,Math.pow( 10, 6 )]},
			{'x':[9,Math.pow( 10, 9 )]},
			{'x':[9,Math.pow( 10, 15 )]},
			{'x':[9,Math.pow( 10, 10 )]},
			{'x':[9,Math.pow( 10, 25 )]}
		];

		data = log10( data, 'x/1', '/' );
		expected = [
			{'x':[9,4]},
			{'x':[9,6]},
			{'x':[9,9]},
			{'x':[9,15]},
			{'x':[9,10]},
			{'x':[9,25]}
		];

			assert.isTrue( deepCloseTo( data, expected, 1e-7 ), 'custom separator' );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( log10( [], 'x' ), [] );
		assert.deepEqual( log10( [], 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = log10( data, 'x' );

		expected = [
			{'x':NaN},
			{'x':NaN},
			{'x':NaN},
			{'x':NaN}
		];

		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );
	});

});
