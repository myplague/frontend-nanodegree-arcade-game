// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 60) + 60


    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};


var Player = function() {

    this.x = 250;
    this.y = 400;
    this.score = 0;
    this.sprite = 'images/char-boy.png';
}




// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = -80
    }

};
Player.prototype.update = function() {

    if (this.x > 470) {
        this.x = 470
    }
    if (this.x < 35) {
        this.x = 35
    }
    if (this.y < 100) {
        this.y = 530
    }
    if (this.y > 530) {
        this.y = 530
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x - 51, this.y - 115);
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x - 51, this.y - 118);
    ctx.font = '30px Arial Black';
    if (this.dead == true){
      ctx.strokeText('GAME OVER' , 20,400);
    }
    else {
      ctx.strokeText('SCORE: ' + this.score, 20,80);

    }



};


Player.prototype.handleInput = function(x) {
  if(this.dead){
    return;
  }
    if (x === 'left') {
        this.x = this.x - 50
    }
    if (x === 'right') {
        this.x = this.x + 50
    }
    if (x === 'up') {
        this.y = this.y - 50

    }
    if (x === 'down') {
        this.y = this.y + 50
    }

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies.push(new Enemy(30, 180))
allEnemies.push(new Enemy(300, 260))
allEnemies.push(new Enemy(100, 350))



var player = new Player;



Player.prototype.detectCollisions = function(enemies) {
    for (var i = 0; i < enemies.length; i++) {
        if (findDistance(this, enemies[i]) < 70) {
            this.x = 250;
            this.y = 500;
            if (this.score > 0){
              this.score = this.score  -1;
            }
             else if (this.score == 0 ){
              this.dead = true;
            };

            return;
        }
        function findDistance(player, enemy) {
            return Math.sqrt((player.x - enemy.x) * (player.x - enemy.x) + (player.y - enemy.y) * (player.y - enemy.y));
        }

    }


}

Player.prototype.detectGemCollisions = function(gems) {
    for (var i = 0; i < gems.length; i++) {
        if (findDistance(this, gems[i]) < 70) {
            this.score = this.score + 5,
            gems.splice(i,1)

            return;
        }
        function findDistance(player, gem) {
            return Math.sqrt((player.x - gem.x) * (player.x - gem.x) + (player.y - gem.y) * (player.y - gem.y));
        }
    }
}





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

var Gem = function(x, y, color) {
    this.x = x;
    this.y = y;
    if (color == 'blue')
        this.sprite = 'images/Gem Blue.png';
    else if (color == 'green')
        this.sprite = 'images/Gem Green.png';
    else
        this.sprite = 'images/Gem Orange.png';
}

Gem.prototype.update = function() {

}

Gem.prototype.render = function(ctx) {
    ctx.drawImage(Resources.get(this.sprite), this.x - 51, this.y - 118);

}
var gem1 = new Gem(300, 300, 'green');
var gem2 = new Gem(50, 250, 'blue');
var gem3 = new Gem(450, 200, 'orange');

var allGems = [gem1, gem2, gem3]
