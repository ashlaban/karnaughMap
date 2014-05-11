var print = function( arg ){ console.log(arg) };

function go( expr, variables )
{
	var variables = lettersUsed(variables);

	var newExpr = parseExpr( expr, variables );

	var ret = "";
	var permutations = generatePermutations( variables.length );
	for (var i = 0; i<permutations.length; ++i)
	{
		var val = evalExpr( newExpr, variables, permutations[i] );

		if ( val) ret += "1";
		if (!val) ret += "0";
	}

	return sliceGrid( grayCode(ret) );
}

function lettersUsed( string )
{
	var letters = [];
	var isLetter = function (curVal, index, arr){ if (letters.indexOf(curVal) == -1 && isInSet("abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ", curVal)) letters.push(curVal); }

	string.split("").map( isLetter );
	return letters.sort();
}

function isInSet( setString, val )
{
	return setString.split("").indexOf(val) != -1
}

function evalExpr(expr, variables, row)
{
	for (var i = 0; i < variables.length; i++) {
		window[variables[i]] = parseInt(row[i], 10);
	}

	return eval( expr );
}

function parseExpr(expr, variables)
{
	// Invert not for parentheses
	var parenExpr = expr;
	for (var i = 0; i < parenExpr.length; ++i)
	{
		if (i+1 < parenExpr.length && parenExpr[i+1] == "'" && parenExpr[i] == ")")
		{
			var nParen = 1;
			for (var j = i-1; j >= 0; --j)
			{
				if (parenExpr[j] == ")") ++nParen;
				if (parenExpr[j] == "(") --nParen;
				if (nParen == 0) 
				{
					parenExpr = [parenExpr.slice(0, j), "!", parenExpr.slice(j)].join('');
					parenExpr = [parenExpr.slice(0, i+2), parenExpr.slice(i+3)].join('');
					break;
				}
			}
		}
	};

	// Invert not
	var invertedExpr = "";
	for (var i = 0; i < parenExpr.length; ++i)
	{
		invertedExpr += parenExpr[i];

		if (i+1 < parenExpr.length && parenExpr[i+1] == "'")
		{
			invertedExpr = [invertedExpr.slice(0, i), "!", invertedExpr.slice(i)].join('');
			++i;
		}
	};

	// Replace multiplication
	var andExpr = "";
	for (var i = 0; i < invertedExpr.length; i++)
	{
		andExpr += invertedExpr[i];
		if (i+1 < invertedExpr.length
			&& isInSet( variables + "!(" , invertedExpr[i+1] )
			&& isInSet( variables + ")"  , invertedExpr[i]   ))
		{
			andExpr += " && ";
		}
	};

	// Replace addition
	var orExpr = andExpr.replace( new RegExp("\\+", "g"), "||" );

	print(orExpr)

	return orExpr;
	
}

function addZero (curVal, index, arr) { return arr[index] + "0"; }
function addOne (curVal, index, arr) { return arr[index] + "1"; }
function generatePermutations( nVars ) {
	
	if (nVars <= 1) return [ "0", "1" ];
	else 
	{
		var lowerItems = generatePermutations( nVars - 1 );
		var lowerItemsZero = lowerItems.slice(0).map( addZero );
		var lowerItemsOne  = lowerItems.slice(0).map( addOne );

		var ret = lowerItemsZero.concat( lowerItemsOne );
		return ret;
	}

}

function grayCode( bitstring )
{
	return grayCodeHelper( bitstring, Math.log(bitstring.length) / Math.LN2 );
}
function grayCodeHelper( bitstring, iLevel )
{
	var grayMap = [0, 2, 3, 1];
	if (iLevel <= 2) return bitstring;

	var ret = "";
	var nChunks = 4;
	var chunkLength = bitstring.length / 4;
	for (var iChunk = 0; iChunk < nChunks; iChunk++) {
		var iMin = grayMap[iChunk]*chunkLength;
		var iMax = iMin + chunkLength;
		ret += grayCodeHelper( bitstring.slice(iMin, iMax), iLevel-1 );
	};

	return ret;
}

function sliceGrid( bitstring )
{
	var ret = [];
	if (bitstring.length == 4)
	{
		for (var i = 0; i < 2; i++) {
			ret.push( bitstring.slice( i*2, i*2+2 ) );
		};
	}
	if (bitstring.length == 8)
	{
		for (var i = 0; i < 4; i++) {
			ret.push( bitstring.slice( i*2, i*2+2 ) );
		};
	}
	if (bitstring.length == 16)
	{
		for (var i = 0; i < 4; i++) {
			ret.push( bitstring.slice( i*4, i*4+4 ) );
		};
	}
	return ret;
}

function printGrid( bitstring )
{
	if (bitstring.length == 16)
	{
		for (var i = 0; i < 4; i++) {
			console.log( bitstring.slice( i*4, i*4+4 ) );
		};
	}
}