
var externalPadding = {x: 40, y: 40};
var internalPadding = {x: 10, y: 10};
var size    = {x: 40, y: 40};

var totalSize = {x: null, y: null};
var contentSize = {x: null, y: null};

var nVars = {x:null, y:null};

function drawCanvas(bitstring2d, variables)
{
	var canvas = document.getElementById('karnaugh');
	var ctx = canvas.getContext('2d');

	nVars.x = Math.floor(variables.length/2);
	nVars.y = Math.ceil(variables.length/2);

	contentSize.x = 2*nVars.x*(size.x+internalPadding.x) - internalPadding.x;
	contentSize.y = 2*nVars.y*(size.y+internalPadding.y) - internalPadding.y;
	totalSize.x = externalPadding.x + contentSize.x;
	totalSize.y = externalPadding.y + contentSize.y;

	clearContext( ctx );

	ctx.save();
	ctx.translate( canvas.width/2, canvas.height/2 );
	ctx.translate( -contentSize.x/2, -contentSize.y/2 );
	ctx.translate( -externalPadding.x, -externalPadding.y );

	drawLabelX( variables, ctx );
	drawLabelY( variables, ctx );
	drawGrid4by4( bitstring2d, ctx );

	ctx.restore();
}

function clearContext(ctx)
{
	// Store the current transformation matrix
	ctx.save();

	// Use the identity matrix while clearing the canvas
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	// Restore the transform
	ctx.restore();
}

function drawLabelX( variables, ctx )
{
	ctx.fillStyle = "black";
	ctx.font="20px Georgia";
	ctx.textAlign="center";
	

	// Draw variables
	var varText = variables.slice(0, nVars.x);

	ctx.textBaseline="top";
	ctx.fillText( varText, externalPadding.x + contentSize.x/2, 0 );

	// Draw 00 01 11 10
	ctx.textBaseline="bottom";
	var graycode = [];
	if (nVars.x == 1) graycode = ["0", "1"];
	if (nVars.x == 2) graycode = ["00", "01", "11", "10"];
	for (var i = 0; i < graycode.length; i++)
	{
		var x = externalPadding.x + i*(size.x+internalPadding.x);
		var y = 0;

		ctx.fillText( graycode[i], x + size.x/2, y + externalPadding.y );
	};
}
function drawLabelY( variables, ctx )
{ 
	ctx.fillStyle = "black";
	ctx.font="20px Georgia";
	
	// Draw variables
	var varText = variables.slice(nVars.y);
	ctx.textAlign="left";
	ctx.textBaseline="middle";
 	ctx.fillText( varText, 0, externalPadding.y + contentSize.y/2 );

	// Draw 00 01 11 10
	ctx.textAlign="right";
	ctx.textBaseline="middle";
	var graycode = [];
	if (nVars.y == 1) graycode = ["0", "1"];
	if (nVars.y == 2) graycode = ["00", "01", "11", "10"];
	for (var i = 0; i < graycode.length; i++)
	{
		var x = 0;
		var y = externalPadding.y + i*(size.y+internalPadding.y);

		ctx.fillText( graycode[i], x + externalPadding.x - 2, y + size.y/2 );
	};
}
function drawGrid4by4( bitstring2d, ctx )
{
	console.log("Length: " + bitstring2d.length)

	for (var j = 0; j < bitstring2d.length; j++)
	{
		
		for (var i = 0; i < bitstring2d[j].length; i++)
		{
			// New column
			var color;
			var ch = bitstring2d[j][i];
			if (ch == '0') color = "rgb(255,120,120)"
			if (ch == '1') color = "rgb(189,236,182)"

			var x = externalPadding.x + i*(size.x+internalPadding.x);
			var y = externalPadding.y + j*(size.y+internalPadding.y);
			ctx.fillStyle = color;
			ctx.fillRect(x, y, size.x, size.y);
			ctx.strokeStyle = "black";
			ctx.strokeRect(x, y, size.x, size.y);

			ctx.fillStyle = "black";
			ctx.font="20px Georgia";
			ctx.textAlign="center";
			ctx.textBaseline="middle";
			ctx.fillText( bitstring2d[j][i] ,x + size.x/2, y + size.y/2);
		};

		// New row
	};
}