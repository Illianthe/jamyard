import 'expose-loader?PIXI!phaser-ce/build/pixi';
import 'expose-loader?p2!phaser-ce/build/p2';
import 'expose-loader?Phaser!phaser-ce';
import globals from './globals';
import LandMob from './sprites/land_mob';

var g = globals.game = new Phaser.Game(globals.gameWidth, globals.gameHeight, Phaser.AUTO, 'app', {
  preload: preload,
  create: create,
  update: update
});

function handleKeypress(char) {
  console.log('Handling keypress:', char);
}

function addWord(word, posX, posY) {
  var text = g.add.text(posX, posY, word, {
    font: '24px Helvetica',
    fill: '#FFF'
  });
  text.anchor.set(0.5);
  return text;
}

function preload() {
  g.load.text('base-wordlist', 'assets/data/base_wordlist.txt');
  g.load.text('typo-wordlist', 'assets/data/typo_wordlist.txt');

  g.load.atlasJSONHash('land-mob', 'assets/sprites/land_mob/land_mob.png', 'assets/sprites/land_mob/land_mob.json');
}

function create() {
  globals.baseWordlist = g.cache.getText('base-wordlist').split('\n');
  globals.typoWordlist = g.cache.getText('typo-wordlist').split('\n');

  g.input.keyboard.addCallbacks(this, null, null, handleKeypress);
  g.physics.startSystem(Phaser.Physics.ARCADE);

  new LandMob({ game: globals.game, x: 300, y: 300 });
}

function update() {
}
