/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Function to apply element-wise:
	LOG10 = require( './../lib/number.js' ),

	// Module to be tested:
	log10 = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-log10', function tests() {

	it( 'should export a function', function test() {
		expect( log10 ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				log10( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				log10( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				log10( new Int8Array([1,2,3]), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				log10( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			// NaN, // allowed
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( log10( values[ i ] ) ) );
		}
	});

	it( 'should compute the base-10 logarithm when provided a number', function test() {
		assert.closeTo( log10( 7 ), 0.84509804, 1e-7 );
		assert.closeTo( log10( 90 ), 1.95424250, 1e-7  );
		assert.closeTo( log10( 300 ), 2.47712125, 1e-7  );

		assert.isTrue( isnan( log10( NaN ) ) );
	});

	it( 'should compute an element-wise base-10 logarithm when provided a plain array', function test() {
		var data, actual, expected;

		data = [
			Math.pow( 10, 4 ),
			Math.pow( 10, 6 ),
			Math.pow( 10, 9 ),
			Math.pow( 10, 15 ),
			Math.pow( 10, 10 ),
			Math.pow( 10, 25 )
		];
		expected = [ 4, 6, 9, 15, 10, 25 ];

		actual = log10( data );
		assert.notEqual( actual, data );
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Mutate...
		actual = log10( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );
	});

	it( 'should compute an element-wise base-10 logarithm when provided a typed array', function test() {
		var data, actual, expected;

		data = new Float64Array( [
			Math.pow( 10, 4 ),
			Math.pow( 10, 6 ),
			Math.pow( 10, 9 ),
			Math.pow( 10, 15 ),
			Math.pow( 10, 10 ),
			Math.pow( 10, 25 )
		] );
		expected = new Float64Array( [ 4, 6, 9, 15, 10, 25 ] );

		actual = log10( data );
		assert.notEqual( actual, data );
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Mutate:
		actual = log10( data, {
			'copy': false
		});
		expected = new Float64Array( [ 4, 6, 9, 15, 10, 25 ] );
		assert.strictEqual( actual, data );
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );
	});

	it( 'should compute an element-wise base-10 logarithm and return an array of a specific type', function test() {
		var data, actual, expected;

		data = 	[
			Math.pow( 10, 4 ),
			Math.pow( 10, 6 ),
			Math.pow( 10, 9 ),
			Math.pow( 10, 15 ),
			Math.pow( 10, 10 ),
			Math.pow( 10, 25 )
		];
		expected = new Float64Array( [ 4, 6, 9, 15, 10, 25 ] );

		actual = log10( data, {
			'dtype': 'float64'
		});
		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 8 );
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should compute an element-wise base-10 logarithm using an accessor', function test() {
		var data, actual, expected;

		data = [
			[0,Math.pow( 10, 4 )],
			[1,Math.pow( 10, 6 )],
			[2,Math.pow( 10, 15 )],
			[3,Math.pow( 10, 10 )],
			[4,Math.pow( 10, 25 )]
		];
		expected = [ 4, 6, 15, 10, 25 ];

		actual = log10( data, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Mutate:
		actual = log10( data, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should compute an element-wise base-10 logarithm and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':[0,Math.pow( 10, 4 )]},
			{'x':[1,Math.pow( 10, 6 )]},
			{'x':[2,Math.pow( 10, 15 )]},
			{'x':[3,Math.pow( 10, 10 )]},
			{'x':[4,Math.pow( 10, 25 )]}
		];
		expected = [
			{'x':[0,4]},
			{'x':[1,6]},
			{'x':[2,15]},
			{'x':[3,10]},
			{'x':[4,25]}
		];
		actual = log10( data, {

			'path': 'x.1'
		});
		assert.strictEqual( actual, data );
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Specify a path with a custom separator...
		data = [
			{'x':[0,Math.pow( 10, 4 )]},
			{'x':[1,Math.pow( 10, 6 )]},
			{'x':[2,Math.pow( 10, 15 )]},
			{'x':[3,Math.pow( 10, 10 )]},
			{'x':[4,Math.pow( 10, 25 )]}
		];

		actual = log10( data, {
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should compute an element-wise base-10 logarithm when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			d3,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float64Array( 25 );
		d3 = new Float64Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = LOG10( i );
			d3[ i ] = LOG10( i );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = log10( mat );

		assert.deepEqual( out.data, d2 );

		// Mutate...
		out = log10( mat, {
			'copy': false
		});
		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d3 );
	});

	it( 'should compute an element-wise base-10 logarithm and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float32Array( 25 );
		d2 = new Int32Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = Math.floor( LOG10( i ) );
		}
		mat = matrix( d1, [5,5], 'float32' );
		out = log10( mat, {
			'dtype': 'int32'
		});

		assert.strictEqual( out.dtype, 'int32' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( log10( [] ), [] );
		assert.deepEqual( log10( matrix( [0,0] ) ).data, new Float64Array() );
		assert.deepEqual( log10( new Int8Array() ), new Float64Array() );
	});

});
