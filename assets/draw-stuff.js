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
	
	fill('red');
	rect(19*rminor,19*rminor,rminor,rminor); //bucket
	
	fill('tan');
	rect(4*rminor,4*rminor,rminor,rminor); //plants
	rect(25*rminor,4*rminor,rminor,rminor);
	rect(31*rminor,4*rminor,rminor,rminor);
	rect(34*rminor,7*rminor,rminor,rminor);
	rect(28*rminor,7*rminor,rminor,rminor);
	rect(22*rminor,7*rminor,rminor,rminor);
	rect(15*rminor,7*rminor,rminor,rminor);
	rect(25*rminor,10*rminor,rminor,rminor);
	rect(31*rminor,10*rminor,rminor,rminor);
	rect(34*rminor,13*rminor,rminor,rminor);
	rect(28*rminor,13*rminor,rminor,rminor);
	rect(25*rminor,13*rminor,rminor,rminor);
	rect(10*rminor,13*rminor,rminor,rminor);
	rect(10*rminor,16*rminor,rminor,rminor);
	rect(7*rminor,16*rminor,rminor,rminor);
	rect(25*rminor,16*rminor,rminor,rminor);
	rect(28*rminor,16*rminor,rminor,rminor);
	rect(31*rminor,16*rminor,rminor,rminor);
	rect(34*rminor,19*rminor,rminor,rminor);
	rect(28*rminor,19*rminor,rminor,rminor);
	rect(25*rminor,19*rminor,rminor,rminor);
	rect(13*rminor,19*rminor,rminor,rminor);
	rect(10*rminor,19*rminor,rminor,rminor);
	rect(4*rminor,19*rminor,rminor,rminor);
	rect(7*rminor,22*rminor,rminor,rminor);
	rect(10*rminor,22*rminor,rminor,rminor);
	rect(13*rminor,22*rminor,rminor,rminor);
	rect(25*rminor,22*rminor,rminor,rminor);
	rect(28*rminor,22*rminor,rminor,rminor);
	rect(31*rminor,22*rminor,rminor,rminor);
	rect(4*rminor,25*rminor,rminor,rminor);
	rect(10*rminor,25*rminor,rminor,rminor);
	rect(13*rminor,25*rminor,rminor,rminor);
	rect(16*rminor,25*rminor,rminor,rminor);
	rect(19*rminor,25*rminor,rminor,rminor);
	rect(22*rminor,25*rminor,rminor,rminor);
	rect(25*rminor,25*rminor,rminor,rminor);
	rect(28*rminor,25*rminor,rminor,rminor);
	rect(34*rminor,25*rminor,rminor,rminor);
	rect(7*rminor,28*rminor,rminor,rminor);
	rect(10*rminor,28*rminor,rminor,rminor);
	rect(13*rminor,28*rminor,rminor,rminor);
	rect(16*rminor,28*rminor,rminor,rminor);
	rect(19*rminor,28*rminor,rminor,rminor);
	rect(22*rminor,28*rminor,rminor,rminor);
	rect(25*rminor,28*rminor,rminor,rminor);
	rect(28*rminor,28*rminor,rminor,rminor);
	rect(31*rminor,28*rminor,rminor,rminor);
	rect(4*rminor,31*rminor,rminor,rminor);
	rect(10*rminor,31*rminor,rminor,rminor);
	rect(16*rminor,31*rminor,rminor,rminor);
	rect(22*rminor,31*rminor,rminor,rminor);
	rect(28*rminor,31*rminor,rminor,rminor);
	rect(34*rminor,31*rminor,rminor,rminor);
	rect(7*rminor,34*rminor,rminor,rminor);
	rect(13*rminor,34*rminor,rminor,rminor);
	rect(19*rminor,34*rminor,rminor,rminor);
	rect(25*rminor,34*rminor,rminor,rminor);
	rect(31*rminor,34*rminor,rminor,rminor);
	
	fill('black');
	for(var i = 14; i < 19; i++){ //barn
		for(var j = 11; j < 15; j++){
    	rect(i*rminor,j*rminor,rminor,rminor);
		}
    }
	
	fill('blue');
	var j = 15;
	for(var i = 1; i < 16; i++){ //river
    	rect(i*rminor,j*rminor,rminor,rminor);
		j--;
    }
	j = 14;
	for(var i = 1; i < 16; i++){ 
    	rect(i*rminor,j*rminor,rminor,rminor);
		j--;
    }
	fill(rfill);
	rect(15*rminor,0*rminor,rminor,rminor);
	rect(5*rminor,10*rminor,rminor,rminor);
	rect(6*rminor,10*rminor,rminor,rminor);
	rect(11*rminor,5*rminor,rminor,rminor);
	rect(10*rminor,5*rminor,rminor,rminor);
}
