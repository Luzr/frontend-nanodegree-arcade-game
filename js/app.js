// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.reset();
	
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
    this.y = 83*this.row;

    // set a 10 pixle "columnlision" between the player and the enemies
	if (player.x > (this.x - 10) && player.x < (this.x + 10) && this.row == player.row)
	//console.log("Payer Enemy columnlision");
		player.reset();
	
	//enemy goes off the board reset the game
    if(this.x > 6 * 83){
        this.reset();
    }
};



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    this.column = -1; 
    this.row = randomWholeNum(1,3);
    this.x = 101 * this.column;
    this.y = 83 * this.row;
    this.speed = randomWholeNum(2,6);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(name) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.reset();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    if(this.moveable) {
        this.x = 101 * this.column;
        this.y = 83 * this.row;
    }

    if(this.y < 83 && this.moveable) {
		console.log("UPDATE /// x: " + this.x + " y: " + this.y + " column:" + this.column + " row: " + this.row);
        
        // alert the player that they won the game
		alert("You've won!");
		this.reset();
        return true;
    }

    return false;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.column = randomWholeNum(0,4); 
    this.row = randomWholeNum(5,4);
    this.moveable = true;
};

Player.prototype.handleInput = function(key) {
    if (key == 'up'){
        this.row--;
        }
    else if (key == 'down' && this.row < 4){
        this.row++;
        }    
    else if (key == 'left' && this.column > 0 ){
        this.column--;
        }
    else if (key == 'right' && this.column < 4){
        this.column++;
        }

        
    // log where enemies and player are.
	console.log("handleInput /// x: " + this.x + " y: " + this.y + " column:" + this.column + " row: " + this.row);	
};

function randomWholeNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for(var i = 0; i < 4; i++){
    allEnemies.push(new Enemy());
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
	//console.log(e.keyCode);
    player.handleInput(allowedKeys[e.keyCode]);
	//console.log("returnX: " + player.x + " returnY: " + player.y);
});