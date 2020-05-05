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

    console.log( "End P5 setup =====");
}

var g_bot1 = { dir:3, x:19, y:19, color:100, plots:20, seeds:20, fertilizer:0, water:0, barrels:0, soap:0, pots:0 }; // Dir is 0..7 clock, w 0 up.
var g_bot2 = { dir:3, x:18, y:19, color:100, plots:20, seeds:20, fertilizer:0, water:0, barrels:0, soap:0, pots:0 };
var g_bot3 = { dir:3, x:17, y:19, color:100, plots:20, seeds:20, fertilizer:0, water:0, barrels:0, soap:0, pots:0 };
var g_bot4 = { dir:3, x:16, y:19, color:100, plots:20, seeds:20, fertilizer:0, water:0, barrels:0, soap:0, pots:0 };
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
        console.log( "g_frame_cnt = " + g_frame_cnt );
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
//Water levels: 1 = brown, 3 = yellow, 5 = green
//Plant type: apple, berry, corn
//Plant levels: 1 = plotted, 2 = seeded, 3 = fertilized, 4 = watered (during 4 is where plant starts growing)
//Maturity levels: 1 = seeded, 2 = stalked, 3 = bushed (during 3 is where plant starts fruiting)
//Fruit levels: 1 = flowering, 2 = green, 3 = red, 4 = none
//Blight: true, false
var plant1 = {x:4, y:4, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant2 = {x:25, y:4, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant3 = {x:31, y:4, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant4 = {x:34, y:7, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant5 = {x:28, y:7, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant6 = {x:22, y:7, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant7 = {x:15, y:7, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant8 = {x:25, y:10, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant9 = {x:31, y:10, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant10 = {x:34, y:13, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant11 = {x:28, y:13, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant12 = {x:25, y:13, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant13 = {x:10, y:13, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant14 = {x:10, y:16, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant15 = {x:7, y:16, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant16 = {x:25, y:16, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant17 = {x:28, y:16, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant18 = {x:31, y:16, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant19 = {x:34, y:19, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant20 = {x:28, y:19, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant21 = {x:25, y:19, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant22 = {x:13, y:19, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant23 = {x:10, y:19, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant24 = {x:4, y:19, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant25 = {x:7, y:22, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant26 = {x:10, y:22, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant27 = {x:13, y:22, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant28 = {x:25, y:22, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant29 = {x:28, y:22, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant30 = {x:31, y:22, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant31 = {x:4, y:25, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant32 = {x:10, y:25, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant33 = {x:13, y:25, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant34 = {x:16, y:25, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant35 = {x:19, y:25, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant36 = {x:22, y:25, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant37 = {x:25, y:25, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant38 = {x:28, y:25, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant39 = {x:34, y:25, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant40 = {x:7, y:28, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant41 = {x:10, y:28, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant42 = {x:13, y:28, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant43 = {x:16, y:28, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant44 = {x:19, y:28, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant45 = {x:22, y:28, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant46 = {x:25, y:28, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant47 = {x:28, y:28, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant48 = {x:31, y:28, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant49 = {x:4, y:31, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant50 = {x:10, y:31, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant51 = {x:16, y:31, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant52 = {x:22, y:31, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant53 = {x:28, y:31, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant54 = {x:34, y:31, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant55 = {x:7, y:34, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant56 = {x:13, y:34, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant57 = {x:19, y:34, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant58 = {x:25, y:34, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
var plant59 = {x:31, y:34, wLevel:5, beingVisited:false, age:0, pType:"", pLevel:0, mLevel:0, fLevel:0, blight:false };
