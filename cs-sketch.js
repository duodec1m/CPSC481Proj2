//code provided by professor with a few modificaitons
//team AiBros
//this sets up the setup and draw functions
// cs-sketch.js; P5 key animation fcns.  // CF p5js.org/reference
// Time-stamp: <2020-02-17 19:15:08 Chuck Siska>

// ============================================================ Mods ====
// to 2020-02-10 16:42:24: add btns.
// to 2020-02-09 16:55:21: add btn onclick exported fn
// to 2020-02-10 17:22:23: log btn onclick

// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas; // JS Global var, w canvas size info.
var g_frame_cnt; // Setup a P5 display-frame counter, to do anim
var g_frame_mod; // Update ever 'mod' frames.
var g_stop; // Go by default.
var g_cnv;   // To hold a P5 canvas.
var g_button; // btn
var g_button2; // btn
var sc; //step counter
var tC; //total crops
var f; //forecast
var b; //barrels
var w; //wind

var g_l4job = { id:1 }; // Put Lisp stuff for JS-to-access in ob; id to make ob.

function do_btn( )
{ // grab code from csu\assets\js\js+p5+editbox

    // Creates an <input></input> element in the DOM for text input.
    // Use g_input.size() to set the display length of the box.
    g_input = createInput( ); // Create input textbox; get via "contentx = g_input.value();"
    g_input.position(  20, 30 );
    g_button = createButton( "Submit" );
    g_button.id( "btn" ); //Add for P5 btn onclick
    g_button.position( 160, 30 );
    // text( "Enter your name.", 20, 20 );

    g_button2 = createButton( "Save Image" );
    g_button2.position( 20, 60 );
    g_button2.mousePressed( save_image ); // the callback
}

function save_image( ) // btn
{
    save('myCanvas-' + g_frame_cnt +  '.jpg');
}

function setup() // P5 Setup Fcn
{
    console.log( "Beg P5 setup =====");
    console.log( "@: log says hello from P5 setup()." );
    g_canvas = { cell_size:20, wid:40, hgt:40 };
    g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
    g_frame_mod = 5; // Update ever 'mod' frames.
    g_stop = 0; // Go by default.

    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1.
    let height = sz * g_canvas.hgt;
    g_cnv = createCanvas( width, height );  // Make a P5 canvas.
    console.log( "@: createCanvas()." );
    draw_grid( 20, 20, 'white', 'tan' );
    do_btn( ); // 
	
	sc = document.getElementById("stepCounter");
	tC = document.getElementById("cropsHarvested");
	f = document.getElementById("forecast");
	b = document.getElementById("barrels");
	w = document.getElementById("wind");
	sc.innerHTML = 0;
	tC.innerHTML = 0;
	f.innerHTML = "Clear";
	b.innerHTML = 0;
	w.innerHTML = "None";

    console.log( "End P5 setup =====");
}

var g_bot1 = { dir:3, x:19, y:19, color:100, plots:20, seeds:20, fertilizer:0, water:0, barrels:-1, soap:0, pots:0 }; // Dir is 0..7 clock, w 0 up.
var g_bot2 = { dir:3, x:18, y:19, color:100, plots:20, seeds:20, fertilizer:0, water:0, barrels:-1, soap:0, pots:0 };
var g_bot3 = { dir:3, x:17, y:19, color:100, plots:20, seeds:20, fertilizer:0, water:0, barrels:-1, soap:0, pots:0 };
var g_bot4 = { dir:3, x:16, y:19, color:100, plots:20, seeds:20, fertilizer:0, water:0, barrels:-1, soap:0, pots:0 };
var g_box = { t:1, hgt:47, l:1, wid:63 }; // Box in which bot can move.

function csjs_get_pixel_color_sum( rx, ry )
{
    let acolors = get( rx, ry ); // Get pixel color [RGBA] array.
    let sum = acolors[ 0 ] + acolors[ 1 ] + acolors[ 2 ]; // Sum RGB.
    //dbg console.log( "color_sum = " + sum );
    return sum;
}

function draw_update()  // Update our display.
{
    console.log( "Call g_l4job.draw_fn" );
    g_l4job.draw_fn( );
}

function draw()  // P5 Frame Re-draw Fcn, Called for Every Frame.
{
    ++g_frame_cnt;
    if (0 == g_frame_cnt % g_frame_mod)
    {
        //console.log( "g_frame_cnt = " + g_frame_cnt );
        if (!g_stop) draw_update();
    }
}

function keyPressed( )
{
    console.log( "@: keyPressed " );
    g_stop = ! g_stop;
    if (g_stop) { noLoop(); } else {loop();}
}

function mousePressed( )
{
    console.log( "@: mousePressed " );
    let x = mouseX;
    let y = mouseY;
    //dbg console.log( "mouse x,y = " + x + "," + y );
    let sz = g_canvas.cell_size;
    let gridx = round( (x-0.5) / sz );
    let gridy = round( (y-0.5) / sz );
    //dbg console.log( "grid x,y = " + gridx + "," + gridy );
    //dbg console.log( "box wid,hgt = " + g_box.wid + "," + g_box.hgt );
    g_bot.x = gridx + g_box.wid; // Ensure its positive.
    //dbg console.log( "bot x = " + g_bot.x );
    g_bot.x %= g_box.wid; // Wrap to fit box.
    g_bot.y = gridy + g_box.hgt;
    //dbg console.log( "bot y = " + g_bot.y );
    g_bot.y %= g_box.hgt;
    //dbg console.log( "bot x,y = " + g_bot.x + "," + g_bot.y );
    console.log( "Call g_l4job.draw_fn for mousePressed" );
    g_l4job.draw_fn( );
}

//PLANTS
//Even though water levels are between 1 and 3, it takes two water units to move between levels so it makes sense to make them 1 to 5. 
//Water levels: 0 = black, 1 = brown, 2 = yellow, 3 = green
//Apple Plant levels: 0 = seeded, 1 = stalked, 4 = bushed, 10 = blossomed, 13 = fruited, 15 = apples, 18+ = none
//Berry Plant levels: 0 = seeded, 1 = stalked, 4 = bushed, 8 = blossomed, 10 = fruited, 11 = apples, 14+ = none
//Corn Plant levels: 0 = seeded, 1 = stalked, 3 = bushed, 5 = blossomed, 7 = fruited, 8 = apples, 11+ = none
//Blight: true, false
var plant1 = {x:4, y:4, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant2 = {x:25, y:4, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant3 = {x:31, y:4, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant4 = {x:34, y:7, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant5 = {x:28, y:7, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant6 = {x:22, y:7, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant7 = {x:15, y:7, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant8 = {x:25, y:10, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant9 = {x:31, y:10, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant10 = {x:34, y:13, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant11 = {x:28, y:13, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant12 = {x:25, y:13, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant13 = {x:10, y:13, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant14 = {x:10, y:16, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant15 = {x:7, y:16, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant16 = {x:25, y:16, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant17 = {x:28, y:16, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant18 = {x:31, y:16, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant19 = {x:34, y:19, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant20 = {x:28, y:19, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant21 = {x:25, y:19, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant22 = {x:13, y:19, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant23 = {x:10, y:19, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant24 = {x:4, y:19, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant25 = {x:7, y:22, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant26 = {x:10, y:22, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant27 = {x:13, y:22, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant28 = {x:25, y:22, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant29 = {x:28, y:22, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant30 = {x:31, y:22, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant31 = {x:4, y:25, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant32 = {x:10, y:25, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant33 = {x:13, y:25, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant34 = {x:16, y:25, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant35 = {x:19, y:25, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant36 = {x:22, y:25, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant37 = {x:25, y:25, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant38 = {x:28, y:25, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant39 = {x:34, y:25, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant40 = {x:7, y:28, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant41 = {x:10, y:28, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant42 = {x:13, y:28, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant43 = {x:16, y:28, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant44 = {x:19, y:28, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant45 = {x:22, y:28, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant46 = {x:25, y:28, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant47 = {x:28, y:28, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant48 = {x:31, y:28, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant49 = {x:4, y:31, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant50 = {x:10, y:31, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant51 = {x:16, y:31, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant52 = {x:22, y:31, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant53 = {x:28, y:31, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant54 = {x:34, y:31, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant55 = {x:7, y:34, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant56 = {x:13, y:34, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant57 = {x:19, y:34, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant58 = {x:25, y:34, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var plant59 = {x:31, y:34, wLevel:0, beingVisited:false, pType:"", plotted:false, fertilized:false, seeded:false, pLevel:0, blight:false };
var array = [plant1,plant2,plant3,plant4,plant5,plant6,plant7,plant8,plant9,plant10,plant11,plant12,plant13,plant14,plant15,plant16,plant17,plant18,plant19,plant20,plant21,plant22,plant23,plant24,plant25,plant26,plant27,plant28,plant29,plant30,plant31,plant32,plant33,plant34,plant35,plant36,plant37,plant38,plant39,plant40,plant41,plant42,plant43,plant44,plant45,plant46,plant47,plant48,plant49,plant50,plant51,plant52,plant53,plant54,plant55,plant56,plant57,plant58,plant59];

function drawNature(){
	//Planting phases
	var mArray = array.filter(({pLevel}) => pLevel < 18).filter(({plotted}) => plotted === true);
	for(const plant of mArray){
		fill('gray');
		rect(plant.x*20,plant.y*20,20,20);
	}
	mArray = array.filter(({pLevel}) => pLevel < 18).filter(({seeded}) => seeded === true);
	for(const plant of mArray){
		fill('green');
		circle(plant.x*20,plant.y*20,7);

	}
	mArray = array.filter(({pLevel}) => pLevel < 18).filter(({fertilized}) => fertilized === true);
	for(const plant of mArray){
		fill('brown');
		rect(plant.x*20,plant.y*20,20,20);

	}
	
	//Watering phases
	mArray = array.filter(({pLevel}) => pLevel < 18).filter(({wLevel}) => wLevel >= 1);
	for(const plant of mArray){
		if(plant.pLevel === 0){
			fill('lightblue');
			rect(plant.x*20,plant.y*20,18,18);
		}
	}
	mArray = mArray.filter(({wLevel}) => wLevel >= 2);
	for(const plant of mArray){
		if(plant.pLevel === 0){
			fill('lightskyblue');
			rect(plant.x*20,plant.y*20,18,18);
		}
	}
	mArray = mArray.filter(({wLevel}) => wLevel >= 3);
	for(const plant of mArray){
		if(plant.pLevel === 0){
			fill('blue');
			rect(plant.x*20,plant.y*20,18,18);
		}
	}
	
	//Growth phases for apples
	mArray = array.filter(({pLevel}) => pLevel < 18).filter(({pType}) => pType === "apples");
	mArray = mArray.filter(({pLevel}) => pLevel >= 1);
	for(const plant of mArray){
		fill('green');
		rect(plant.x*20,plant.y*20,18,18);
		fill('brown');
		circle(plant.x*20,plant.y*20,10);
	}
	mArray = mArray.filter(({pLevel}) => pLevel >= 4);
	for(const plant of mArray){
		fill('green');
		circle(plant.x*20,plant.y*20,15);
	}
	mArray = mArray.filter(({pLevel}) => pLevel >= 10);
	for(const plant of mArray){
		fill('yellow');
		circle(plant.x*20,plant.y*20,20);
	}
	mArray = mArray.filter(({pLevel}) => pLevel >= 13);
	for(const plant of mArray){
		fill('indianred');
		circle(plant.x*20,plant.y*20,20);
	}
	mArray = mArray.filter(({pLevel}) => pLevel >= 15);
	for(const plant of mArray){
		fill('red');
		circle(plant.x*20,plant.y*20,20);
	}
	//Growth phases for berries
	mArray = array.filter(({pLevel}) => pLevel < 18).filter(({pType}) => pType === "berries");
	mArray = mArray.filter(({pLevel}) => pLevel >= 1);
	for(const plant of mArray){
		fill('green');
		rect(plant.x*20,plant.y*20,18,18);
		fill('brown');
		circle(plant.x*20,plant.y*20,10);
	}
	mArray = mArray.filter(({pLevel}) => pLevel >= 4);
	for(const plant of mArray){
		fill('green');
		circle(plant.x*20,plant.y*20,15);
	}
	mArray = mArray.filter(({pLevel}) => pLevel >= 8);
	for(const plant of mArray){
		fill('yellow');
		circle(plant.x*20,plant.y*20,20);
	}
	mArray = mArray.filter(({pLevel}) => pLevel >= 10);
	for(const plant of mArray){
		fill('indianred');
		circle(plant.x*20,plant.y*20,20);
	}
	mArray = mArray.filter(({pLevel}) => pLevel >= 11);
	for(const plant of mArray){
		fill('red');
		circle(plant.x*20,plant.y*20,20);
	}
	//Growth phases for corn
	mArray = array.filter(({pLevel}) => pLevel < 18).filter(({pType}) => pType === "corn");
	mArray = mArray.filter(({pLevel}) => pLevel >= 1);
	for(const plant of mArray){
		fill('green');
		rect(plant.x*20,plant.y*20,18,18);
		fill('brown');
		circle(plant.x*20,plant.y*20,10);
	}
	mArray = mArray.filter(({pLevel}) => pLevel >= 3);
	for(const plant of mArray){
		fill('green');
		circle(plant.x*20,plant.y*20,15);
	}
	mArray = mArray.filter(({pLevel}) => pLevel >= 5);
	for(const plant of mArray){
		fill('yellow');
		circle(plant.x*20,plant.y*20,20);
	}
	mArray = mArray.filter(({pLevel}) => pLevel >= 7);
	for(const plant of mArray){
		fill('indianred');
		circle(plant.x*20,plant.y*20,20);
	}
	mArray = mArray.filter(({pLevel}) => pLevel >= 8);
	for(const plant of mArray){
		fill('red');
		circle(plant.x*20,plant.y*20,20);
	}
	
	//Dead Plants
	mArray = array.filter(({pLevel}) => pLevel >= 18);
	for(const plant of mArray){
		fill('black');
		rect(plant.x*20,plant.y*20,20,20);
	}
	
	//Blights
	mArray = array.filter(({blight}) => blight === true);
	for(const plant of mArray){
		fill('light blue');
		circle(plant.x*21,plant.y*21,10);
	}
	
	//Strawed Crops
	mArray = array.filter(({wLevel}) => wLevel > 3);
	for(const plant of mArray){
		tint(255, 127); // Display at half opacity
		fill('khaki');
		rect(plant.x*20,plant.y*20,20,20);
	}
}

function updateNature(){
	if(Math.floor(Math.random() * 100) + 1 <= 30){
		var windPatterns = ["North", "South", "East", "West"];
		w.innerHTML = windPatterns[Math.floor(Math.random() * windPatterns.length)].toString();
	}
	else
		w.innerHTML = "None";
	var cloudy = false;
	var rain = false;
	if(Math.floor(Math.random() * 100) + 1 <= 10){
			if(Math.floor(Math.random() * 100) + 1 <= 50){
				rain = true;
				f.innerHTML = "Rain";
			}
			else{
				cloudy = true;
				f.innerHTML = "Cloudy";
			}
	}
	else
		f.innerHTML = "Clear";
	
	var mArray = array.filter(({plotted}) => plotted === true)
						.filter(({seeded}) => seeded === true)
						.filter(({fertilized}) => fertilized === true)
						.filter(({wLevel}) => wLevel > 0);
	for(const plant of mArray){
		if(Math.floor(Math.random() * 100) + 1 <= 2) //growing plants could grow a blight
			plant.blight = true;
		if(plant.wLevel === 3 && plant.blight === false && cloudy === false && rain === false) //no blight and clear skies with sufficient water to grow
			plant.pLevel++;
		if(rain === true)
			plant.wLevel++;
		else
			plant.wLevel--;
		if(plant.wLevel === 0)
			plant.pLevel = 18; //Make pLevel 18 so it can be added to the death list
	}
	
	mArray = array.filter(({pType}) => pType === "berries").filter(({pLevel}) => pLevel >= 14);
	for(const plant of mArray){
		plant.pLevel = 18;
	}
	mArray = array.filter(({pType}) => pType === "corn").filter(({pLevel}) => pLevel >= 11);
	for(const plant of mArray){
		plant.pLevel = 18;
	}
	mArray = array.filter(({pLevel}) => pLevel >= 18);
	for(const plant of mArray){
		plant.wLevel=0;
		plant.fertilized=false;
		plant.seeded=false;
	}
}

var markedPoint;
function markVisit(xx, yy){
	markedPoint = array.filter(({x}) => x === xx).find(({y}) => y === yy);
}

//Searching where the box should go next has been split into multiple functions representing search criteria
var markedPlant;
function wLevel(x){
	markedPlant = array.filter(({beingVisited}) => beingVisited === false)
						.filter(({pLevel}) => pLevel < 18) //do not water dead plants
						.filter(({plotted}) => plotted === true) //or unplotted areas
						.filter(({seeded}) => seeded === true) //or unseeded plants
						.filter(({fertilized}) => fertilized === true) //or unfertilized plants
						.find(({wLevel}) => wLevel < x);
	if(markedPlant != null)
		return true;
	return false;
}
function pType(x){
	markedPlant = array.filter(({beingVisited}) => beingVisited === false).find(({pType}) => pType === x);
	if(markedPlant != null)
		return true;
	return false;
}
function plotted(x){
	markedPlant = array.filter(({beingVisited}) => beingVisited === false).find(({plotted}) => plotted === x);
	if(markedPlant != null)
		return true;
	return false;
}
function fertilized(x){
	markedPlant = array.filter(({beingVisited}) => beingVisited === false).find(({fertilized}) => fertilized === x);
	if(markedPlant != null)
		return true;
	return false;
}
function seeded(x){
	markedPlant = array.filter(({beingVisited}) => beingVisited === false).find(({seeded}) => seeded === x);
	if(markedPlant != null)
		return true;
	return false;
}
function pLevel(){
	markedPlant = array.filter(({beingVisited}) => beingVisited === false)
								.filter(({pType}) => pType === "apples")
								.filter(({pLevel}) => pLevel >= 15)
								.find(({pLevel}) => pLevel < 18);
	if(markedPlant != null)
		return true;
	markedPlant = array.filter(({beingVisited}) => beingVisited === false)
								.filter(({pType}) => pType === "berries")
								.filter(({pLevel}) => pLevel >= 11)
								.find(({pLevel}) => pLevel < 14);
	if(markedPlant != null)
		return true;
	markedPlant = array.filter(({beingVisited}) => beingVisited === false)
								.filter(({pType}) => pType === "corn")
								.filter(({pLevel}) => pLevel >= 8)
								.find(({pLevel}) => pLevel < 11);
	if(markedPlant != null)
		return true;
	return false;
}
function blight(x){
	markedPlant = array.filter(({beingVisited}) => beingVisited === false).find(({blight}) => blight === x);
	if(markedPlant != null)
		return true;
	return false;
}

function getSeed(){
	var seeds = ["apples", "berries", "corn"];
	return seeds[Math.floor(Math.random() * seeds.length)].toString();
}