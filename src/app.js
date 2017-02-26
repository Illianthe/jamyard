import 'expose-loader?PIXI!phaser-ce/build/pixi';
import 'expose-loader?p2!phaser-ce/build/p2';
import 'expose-loader?Phaser!phaser-ce';
import globals from './globals';
import LandMob from './sprites/land_mob';
import FlyingMob from './sprites/flying_mob';
import Wizard from './sprites/wizard';

var g = globals.game = new Phaser.Game(globals.gameWidth, globals.gameHeight, Phaser.AUTO, 'app', {
  preload: preload,
  create: create,
  update: update
});

var scoreText;
var livesText;

function handleKeypress(char) {
  globals.keypressSignal.dispatch(char);
}

function preload() {
  g.load.text('base-wordlist', 'assets/data/base_wordlist.txt');
  g.load.text('typo-wordlist', 'assets/data/typo_wordlist.txt');
  g.load.image('background', 'assets/background.png');
  g.load.image('fireball', 'assets/fireball.png');
  g.load.atlasJSONHash('land-mob', 'assets/sprites/land_mob/land_mob.png', 'assets/sprites/land_mob/land_mob.json');
  g.load.atlasJSONHash('flying-mob-1', 'assets/sprites/flying_mob/flying_mob.png', 'assets/sprites/flying_mob/flying_mob.json');
  g.load.atlasJSONHash('flying-mob-2', 'assets/sprites/flying_mob_2/flying_mob_2.png', 'assets/sprites/flying_mob_2/flying_mob_2.json');
  g.load.atlasJSONHash('flying-mob-3', 'assets/sprites/flying_mob_3/flying_mob_3.png', 'assets/sprites/flying_mob_3/flying_mob_3.json');
  g.load.atlasJSONHash('flying-mob-4', 'assets/sprites/flying_mob_4/flying_mob_4.png', 'assets/sprites/flying_mob_4/flying_mob_4.json');
  g.load.atlasJSONHash('wizard', 'assets/sprites/wizard/wizard.png', 'assets/sprites/wizard/wizard.json');
}

function create() {
  globals.baseWordlist = g.cache.getText('base-wordlist').split('\n');
  globals.typoWordlist = g.cache.getText('typo-wordlist').split('\n');

  g.physics.startSystem(Phaser.Physics.ARCADE);
  globals.wordCompletedSignal = new Phaser.Signal();
  globals.keypressSignal = new Phaser.Signal();
  g.input.keyboard.addCallbacks(this, null, null, handleKeypress);

  g.add.image(0, 0, 'background');

  globals.wizard = new Wizard({ game: g, x: 100, y: 400 });
  globals.wizard_attacks = g.add.group();
  globals.mobs = g.add.group();
  spawnLandMob();
  spawnFlyingMob();

  scoreText = g.add.text(20, 20, 'Score: ' + globals.score, { font: '20px Source Code Pro', fill: '#fff' });
  livesText = g.add.text(20, 50, 'Lives: ' + globals.lives, { font: '20px Source Code Pro', fill: '#fff' });
}

function update() {
  g.physics.arcade.overlap(globals.wizard, globals.mobs, mobCollideHandler, null, this);
  scoreText.text = 'Score: ' + globals.score;
  livesText.text = 'Lives: ' + globals.lives;
}

function spawnLandMob() {
  globals.mobs.addAt(new LandMob({ game: g, x: 1000, y: g.rnd.integerInRange(400, 500) }), 0);
  g.time.events.add(getSpawnSpeed(), spawnLandMob, this);
}

function spawnFlyingMob() {
  var type = g.rnd.integerInRange(1, 4);
  globals.mobs.addAt(new FlyingMob({ game: g, type: type, x: 1000, y: g.rnd.integerInRange(0, 300) }), 0);
  g.time.events.add(getSpawnSpeed(), spawnFlyingMob, this);
}

function getSpawnSpeed() {
  var spawnSpeed;
  if (globals.score > 50) {
    spawnSpeed = Phaser.Timer.SECOND + g.rnd.integerInRange(0, 1000);
  } else if (globals.score > 25) {
    spawnSpeed = Phaser.Timer.SECOND + g.rnd.integerInRange(0, 3000);
  } else if (globals.score > 10) {
    spawnSpeed = Phaser.Timer.SECOND + g.rnd.integerInRange(0, 5000);
  } else if (globals.score > 5) {
    spawnSpeed = Phaser.Timer.SECOND + g.rnd.integerInRange(0, 7000);
  } else {
    spawnSpeed = Phaser.Timer.SECOND + g.rnd.integerInRange(0, 9000);
  }
  return spawnSpeed;
}

function mobCollideHandler(wizard, mob) {
  mob.kill();
  globals.lives -= 1;

  if (globals.lives === 0) {
    wizard.kill();
    console.log('Game over!');
  }
}
