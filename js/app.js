//Random Number Generator from Stacked Exchange
function randomWholeNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.restart();
	
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	
    this.x = (this.x + this.speed);
    this.y = 83 * this.row;

    // set a 10 pixle "collision" between the player and the enemies
	if (player.x > (this.x - 10) && player.x < (this.x + 10) && this.row == player.row)
	//console.log("Payer Enemy collision");
	player.restart();
	
	//enemy goes off the board restart the game
    if(this.x > 6 * 80){
        this.restart();
    }
};



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.restart = function() {
    this.column = 0; 
    this.row = randomWholeNum(1,3);
    this.x =  this.column;
    this.y =  this.row;
    this.speed = randomWholeNum(4,8);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(name) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.restart();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    if(this.moveable) {
        this.x = 100 * this.column;
        this.y = 84 * this.row;
        // log where the player is
        //console.log("UPDATE /// x: " + this.x + " y: " + this.y + " column:" + this.column + " row: " + this.row);
    }

    if(this.y < 84 && this.moveable) {
		// alert the player that they won the game
		alert("You've won! Player will reset to the bottom.");
		this.restart();
    }
};

//Rener the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Start the player in the middle of the map.
Player.prototype.restart = function() {
    this.column = 2; 
    this.row = 5;
    this.moveable = true;
};

// input keys for the player
Player.prototype.handleInput = function(key) {
    if (key == 'up'){
        this.row--;
        }
        // move around the map with the limit of the bottom tile
    else if (key == 'down' && this.row < 5){
        this.row++;
        }   
         // move around the map with the limit of the left tile
    else if (key == 'left' && this.column > 0 ){
        this.column--;
        }
        // move around the map with the limit of the right tile
    else if (key == 'right' && this.column < 4){
        this.column++;
        }

        
    // log where enemies and player are.
	// console.log("handleInput /// x: " + this.x + " y: " + this.y + " column:" + this.column + " row: " + this.row);	
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Max of 4 enemies
var allEnemies = [0, 1, 2, 3];
for (i = 0; i < allEnemies.length; i++){
    allEnemies[i] = new Enemy()
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    
    // check the key being pressed
	// console.log(e.keyCode);
    player.handleInput(allowedKeys[e.keyCode]);
	//console.log("returnX: " + player.x + " returnY: " + player.y);
});