'use strict';

// MODULES //

var LOG10 = require( './number.js' );


// BASE 10 LOGARITHM //

/**
* FUNCTION: log10( out, arr )
*	Computes an element-wise base-10 logarithm.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function log10( y, x ) {
	var len = x.length,
		i;
	for ( i = 0; i < len; i++ ) {
		y[ i ] = LOG10( x[ i ] );
	}
	return y;
} // end FUNCTION log10()


// EXPORTS //

module.exports = log10;
