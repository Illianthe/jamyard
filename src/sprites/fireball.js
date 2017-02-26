import Phaser from 'phaser-ce';
import globals from '../globals';

export default class extends Phaser.Sprite {
  constructor({ game, target, x, y }) {
    super(game, x, y, 'fireball');
    this.target = target;
    this.anchor.setTo(0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    game.add.existing(this);
  }

  update() {
    this.game.physics.arcade.moveToObject(this, this.target, 720);
    this.rotation = this.game.physics.arcade.angleBetweenCenters(this, this.target);
    this.game.physics.arcade.overlap(this, this.target, this.attackMobCollideHandler, null, this);
  }

  attackMobCollideHandler(attack, mob) {
    globals.score += 1;
    attack.kill();
    mob.kill();
  }
}
