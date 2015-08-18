'use strict';

// MODULES //

var LOG10 = require( './number.js' );


// BASE 10 LOGARITHM //

/**
* FUNCTION: log10( out, arr, accessor )
*	Computes an element-wise base-10 logarithm using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function log10( y, x, clbk ) {
	var len = x.length,
		v, i;
	for ( i = 0; i < len; i++ ) {
		v = clbk( x[ i ], i );
		if ( typeof v === 'number' ) {
			y[ i ] = LOG10( v );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION log10()


// EXPORTS //

module.exports = log10;
