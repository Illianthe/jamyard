import 'expose-loader?PIXI!phaser-ce/build/pixi';
import 'expose-loader?p2!phaser-ce/build/p2';
import 'expose-loader?Phaser!phaser-ce';
import config from './config';

var game = new Phaser.Game(config.gameWidth, config.gameHeight, Phaser.AUTO, 'app', {
  preload: preload,
  create: create,
  update: update
});

function preload() {
  this.game.load.text('base_wordlist', 'assets/data/base_wordlist.txt');
  this.game.load.text('typo_wordlist', 'assets/data/typo_wordlist.txt');
}

function create() {
  const baseWordlist = game.cache.getText('base_wordlist').split('\n');
  const typoWordlist = game.cache.getText('typo_wordlist').split('\n');

  game.input.keyboard.addCallbacks(this, null, null, handleKeypress);

  addWord(typoWordlist[0], game.world.centerX, game.world.centerY);
}

function update() {
}

function handleKeypress(char) {
  console.log('Handling keypress:', char);
}

function addWord(word, posX, posY) {
  var text = game.add.text(posX, posY, word, {
    font: '32px Helvetica',
    fill: '#FFF'
  });
  text.anchor.set(0.5);
  return text;
}
