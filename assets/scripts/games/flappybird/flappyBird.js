var cvs = document.getElementById("flappy_bird");
var ctx = cvs.getContext("2d"); 

// load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var scoreboard = new Image();
var gameover = new Image();
var get_ready = new Image();
var start_button = new Image();
var instructions = new Image();

// src is source - link here depend on word_practice.html file not this js file
bird.src = "./../../assets/scripts/games/flappybird/images/bird.png";
bg.src = "./../../assets/scripts/games/flappybird/images/bg.png";
fg.src = "./../../assets/scripts/games/flappybird/images/fg.png";
pipeNorth.src = "./../../assets/scripts/games/flappybird/images/pipeNorth.png";
pipeSouth.src = "./../../assets/scripts/games/flappybird/images/pipeSouth.png";
scoreboard.src = "./../../assets/scripts/games/flappybird/images/scoreboard.png";
gameover.src = "./../../assets/scripts/games/flappybird/images/gameover.png";
get_ready.src = "./../../assets/scripts/games/flappybird/images/get-ready.png";
start_button.src = "./../../assets/scripts/games/flappybird/images/start-button.png"
instructions.src = "./../../assets/scripts/games/flappybird/images/instructions.png"

// some variables

var gap = 85; // space for bird to fly through
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;
var noGravity = false;

var score = 0;
var highScore = localStorage.getItem("highScore"); // take high score from local storage
highScore ? 1 : highScore = 0 // if null, set to 0

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "./../../assets/scripts/games/flappybird/sounds/fly.mp3";
scor.src = "./../../assets/scripts/games/flappybird/sounds/score.mp3";

var patternDict = ["ba", "má", "tôi", "tớ", "cơ", "cậu", "lợn", "bò"]
var pattern = "cơ";
var input = "";
// on key down
// any key pressed
//document.addEventListener("keydown", () => {start = false});
cvs.addEventListener("click", () => {start = false; $("#output").focus()});
document.addEventListener("keyup", () => {typing()}); 

// will change in future to fit the requirement
function moveUp(dist) {
    bY -= dist; // move up 
    fly.play(); // make sound
}

var str = [] // array contains string

// add typing function
function typing() {
	input = $("#output").val().trim();
	console.log(input);

    if(pattern == input) {
    	// fly through pipe when condition meet requirement
    	for(var i = 0; i < pipe.length; i++){ 
    		if(pipe[i].x - bX > 0) {
    			bY = (pipe[i].y+pipeNorth.height + Math.floor((gap-bird.width)/2)) // new distance
		    	fly.play();
		    	noGravity = true;
		    	break;
    		}
    	}
    }
    else {
    	$("#output").html("");
    }
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// draw images
var spd = 1; //set pipe speed
var start = true;
var pause = false;

function draw(){
    
    ctx.drawImage(bg,0,0);
    if(start == true) {
    	// foreground
	    ctx.drawImage(fg,0,cvs.height - fg.height);
	    // bird on screen
	    ctx.drawImage(bird,bX,bY);
	    ctx.drawImage(get_ready, (cvs.width - get_ready.width)/2, 40);
	    ctx.drawImage(instructions,(cvs.width - start_button.width)/2, cvs.height - fg.height - instructions.height);
	    requestAnimationFrame(draw);
    }
    
    else {
    	// logic 
	    for(var i = 0; i < pipe.length; i++){ 
	        
	        constant = pipeNorth.height+gap; 
	        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y); 
	        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
	             
	        pipe[i].x -= spd; // move pipe towards bird
	        
	        if( pipe[i].x == 125 ){ // add a new pipe when meet the condition
	            pipe.push({
	                x : cvs.width,
	                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
	            }); 
	        }

	        // detect collision
	        
	        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) /* check if bird collide with a pipe*/
	        	|| bY + bird.height >=  cvs.height - fg.height /* check if bird hit the foreground*/){
	        	highScore < score ? localStorage.setItem("highScore", score) : 0 // push high score to localStorage

	            //location.reload(); // reload the page, actually reload the cvs
	            pause = true;
	        }

	        // get score 
	        if(pipe[i].x == 5){
	            score++;
	            scor.play();
	        }

	        // get over pipe,  gravity return
	        if(pipe[i].x + pipeNorth.width == 10) {
	        	noGravity = false;
				$("#output").html("");
				pattern = patternDict[Math.floor(Math.random()*patternDict.length)];
				setSelectionRange(document.getElementById("output"), 0, 0);
	        }
	    }

	    // foreground
	    ctx.drawImage(fg,0,cvs.height - fg.height);
	    // bird on screen
	    ctx.drawImage(bird,bX,bY);
	    // draw text on bird to type
	    ctx.fillStyle = "#272";
	    ctx.font = "20px Verdana";
	    ctx.fillText(pattern, bX, bY-10);
	    // fall down 
	    noGravity ? 0 : bY += gravity // if no gravity, not change bY
	    
	    ctx.fillStyle = "#000";
	    ctx.font = "20px Verdana";
	    ctx.fillText("Score : "+score,10,cvs.height-20); // text, x, y || show score 
	    ctx.fillText("High Score : "+highScore, cvs.width-150, cvs.height-20); // show high Score

	    if(pause == false) {requestAnimationFrame(draw);} // callback function to render animation   
	    else { // render last time
	    	ctx.drawImage(gameover, (cvs.width - gameover.width)/2, (cvs.height - gameover.height)/2);
	    } 
    }
}

draw();
























