import Phaser from 'phaser-ce';
import globals from '../globals';

export default class extends Phaser.Sprite {
  constructor({ game, x, y }) {
    super(game, x, y, 'land-mob', 'idle/frame-1.png');
    this.animations.add('idle', Phaser.Animation.generateFrameNames('idle/frame-', 1, 8, '.png', 0), 10, true, false);
    this.animations.play('idle');
    this.anchor.setTo(0.5);

    this.word = globals.typoWordlist[game.rnd.integerInRange(0, globals.typoWordlist.length)];
    var text = game.add.text(0, -48, this.word, {
      font: '24px Helvetica',
      fill: '#FFF'
    });
    text.anchor.set(0.5);
    this.addChild(text);

    game.add.existing(this);
  }

  update() {
  }
}
