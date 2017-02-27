import Phaser from 'phaser-ce';
import globals from '../globals';
import Fireball from './fireball';

export default class extends Phaser.Sprite {
  constructor({ game, x, y }) {
    super(game, x, y, 'wizard', 'idle_1.png');
    this.animations.add('idle', Phaser.Animation.generateFrameNames('idle_', 1, 4, '.png', 0), 5, true, false);
    this.animations.add('dead', Phaser.Animation.generateFrameNames('dead_', 1, 3, '.png', 0), 5, true, false);
    this.animations.play('idle');
    this.anchor.setTo(0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    globals.wordCompletedSignal.add(this.fire, this);
    game.add.existing(this);
  }

  update() {
    if (!this.alive) {
      globals.wordCompletedSignal.remove(this.fire, this);
    }
  }

  fire(target) {
    globals.wizard_attacks.add(new Fireball({ game: this.game, target: target, x: this.x, y: this.y }));
  }

  die() {
    this.animations.play('dead', 10, false, true);
  }
}
