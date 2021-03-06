/* Define global constants */
var BLOCK_W = 101;
var BLOCK_H = 83;
var INIT_X = -100;
var INIT_y = -20;
var collision = false, won = false;

// Enemies our player must avoid
var Enemy = function( row, speed ) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = INIT_X;
    this.y = INIT_y;

    this.row = row;    
    this.speed = speed;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.y = INIT_y + this.row*BLOCK_H;

    this.x += this.speed * dt;

    /* let the bug keep going round & round */
    if( this.x > canvas.width ) {
        this.reset();
    }

    this.checkCollision( this, player );
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Enemy.prototype.reset = function () {
    this.x = INIT_X;
    this.y = INIT_y;
};

/* algorithm to check whether enemy & player touch */
Enemy.prototype.isColliding = function( enemy, player ) { 
    if( ( enemy.x + BLOCK_W > player.x && enemy.x < player.x + BLOCK_W ) && 
        ( enemy.y + BLOCK_H > player.y && enemy.y < player.y + BLOCK_H ) )  {
        collision = true;    
    } else {
        collision = false;
    }
    return collision;    
};


/* If enemy & player touch, then reset player to starting posotion */
Enemy.prototype.checkCollision = function( enemy, player ) { 
    if( this.isColliding( enemy, player ) ) { 
        console.log("collision! Now drawing gameOver");   
        player.reset();
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player who plays //
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.reset();
};


/* algorithm to check whether player touchs water */
Player.prototype.inWater = function( player ) { 
    if (player.y === 0) {
        won = true;
    } else {
        won = false;
    } 
    return won;   
};


/* If player touchs down, then show Won, reset player to starting posotion */
Player.prototype.checkWon = function( player ) { 
    if( this.inWater( player ) ) { 
        console.log( 'You Won !');
        player.reset();
    }
};


// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.checkWon( this );

};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.reset = function () {
    this.x=2*BLOCK_W;
    this.y=5*BLOCK_H;
};


// handleInputs from the keystroke //
Player.prototype.handleInput=function(key) {
    if (key === 'up'){
        if (this.y > 0) this.y-=BLOCK_H;
    } else if (key === 'down'){
        if (this.y < 4*BLOCK_W) this.y+=BLOCK_H;
    }else if (key === 'left') {
        if (this.x > 0) this.x-=BLOCK_W;
    } else if (key === 'right'){
        if (this.x < 4*BLOCK_W) this.x+=BLOCK_W;
    }
};


/* Start Game */

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

var enemy1 = new Enemy( 1, 60 );
var enemy2 = new Enemy( 2, 99 ); 
var enemy3 = new Enemy( 3, 29 ); 
var enemy4 = new Enemy( 3, 199 );

allEnemies.push(enemy1);
allEnemies.push(enemy2); 
allEnemies.push(enemy3);
allEnemies.push(enemy4);


// Place the player object in a variable called player
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

    player.handleInput(allowedKeys[e.keyCode]);
});
