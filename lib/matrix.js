'use strict';

// MODULES //

var LOG10 = require( './number.js' );


// BASE 10 LOGARITHM //

/**
* FUNCTION: log10( out, matrix )
*	Computes an element-wise base-10 logarithm.
*
* @param {Matrix} out - output matirx
* @param {Matrix} arr - input matrix
* @returns {Matrix} output matrix
*/
function log10( y, x ) {
	var len = x.length,
		i;
	if ( y.length !== len ) {
		throw new Error( 'log10()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = LOG10( x.data[ i ] );
	}
	return y;
} // end FUNCTION log10()


// EXPORTS //

module.exports = log10;
