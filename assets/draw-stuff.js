// Draw stuff, with P5  // CF p5js.org/reference
// Time-stamp: <2020-02-02 14:46:00 Chuck Siska>
// ------------------------------------------------------------

// =====================================================  draw_grid ====
// Draw a fancy grid with major & minor lines 
// & major row/col numbers.
function draw_grid( rminor, rmajor, rstroke, rfill  ) 
{
	fill(rfill);
    for(var i = 0; i < 40; i++){
		for(var j = 0; j < 40; j++){
    	rect(i*rminor,j*rminor,rminor,rminor);
		}
    }
	
	fill('gray');
	rect(20*rminor,20*rminor,rminor,rminor); //bucket
	
	fill('green');
	rect(30*rminor,30*rminor,rminor,rminor); //plants
	rect(25*rminor,30*rminor,rminor,rminor);
	rect(20*rminor,30*rminor,rminor,rminor);
	rect(15*rminor,30*rminor,rminor,rminor);
	rect(10*rminor,30*rminor,rminor,rminor);
}
