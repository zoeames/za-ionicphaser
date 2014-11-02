'use strict';

var game = new Phaser.Game(500, 300, Phaser.CANVAS, '', {preload:preload, create:create, update:update});

function preload(){
  game.load.tilemap('map', 'assets/ionicphaser.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('mario', 'assets/super_mario.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.spritesheet('coin', 'assets/coin.png', 32, 32);

  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;

  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  game.scale.refresh();

}

var map, background, clouds, ground, dude, coins;

function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);

  map = game.add.tilemap('map');
  map.addTilesetImage('Mario', 'mario');

  background = map.createLayer('Background');
  clouds = map.createLayer('Clouds');
  ground = map.createLayer('Ground');
  coins = map.createLayer('Coins');
  background.resizeWorld();
  map.setCollision(34, true, 'Ground');

  coins = game.add.group();
  coins.enableBody = true;
  coins.physicsBodyType = Phaser.Physics.ARCADE;
  map.createFromObjects('Coins', 45, 'coin', 0, true, false, coins);

  coins.callAll('animations.add', 'animations', 'spin', [5, 4, 3, 2, 1, 0], 10, true);
  coins.callAll('animations.play', 'animations', 'spin');




  dude = game.add.sprite(0, 0, 'dude');
  dude.animations.add('left', [0, 1, 2, 3], 10, true);
  dude.animations.add('right', [5, 6, 7, 8], 10, true);
  game.physics.arcade.enable(dude);
  dude.body.gravity.y = 300;
  game.camera.follow(dude);
}

function update(){
  game.physics.arcade.collide(dude, ground);
  if(game.input.activePointer.isDown){
    if(game.input.activePointer.x < 150){
      dude.body.velocity.x = -150;
      dude.animations.play('left');
    }else{
      dude.body.velocity.x = 150;
      dude.animations.play('right');
    }
    if(game.input.activePointer.y < 150){
      dude.body.velocity.y = -150;
    }

  }else{
    dude.body.velocity.x = 0;
    dude.animations.stop();
    dude.frame = 4;
  }
}
