import Phaser from 'phaser-ce';
import globals from '../globals';

export default class extends Phaser.Sprite {
  constructor({ game, x, y }) {
    super(game, x, y, 'wizard', 'idle_1.png');
    this.animations.add('idle', Phaser.Animation.generateFrameNames('idle_', 1, 4, '.png', 0), 5, true, false);
    this.animations.play('idle');
    this.anchor.setTo(0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    game.add.existing(this);
  }
}
