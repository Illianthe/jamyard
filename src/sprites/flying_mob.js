import Phaser from 'phaser-ce';
import globals from '../globals';

export default class extends Phaser.Sprite {
  constructor({ game, x, y, type }) {
    super(game, x, y, 'flying-mob-' + type, 'frame-1.png');
    this.animations.add('idle', Phaser.Animation.generateFrameNames('frame-', 1, 8, '.png', 0), 10, true, false);
    this.animations.play('idle');
    this.anchor.setTo(0.5);
    this.scale.x = -1;

    this.word = globals.typoWordlist[game.rnd.integerInRange(0, globals.typoWordlist.length)];
    this.cur_char = 0;
    var text = this.text = game.add.text(0, -32, this.word, {
      font: '20px Monospace',
      fill: '#FFF',
      backgroundColor: '#000'
    });
    text.anchor.set(0.5);
    text.scale.x = -1;
    this.addChild(text);

    game.physics.enable(this, Phaser.Physics.ARCADE);
    globals.keypressSignal.add(this.handleKeypress, this);
    game.add.existing(this);
  }

  update() {
    if (globals.wizard.alive) {
      this.game.physics.arcade.moveToObject(this, globals.wizard, 60);
    } else {
      this.body.velocity.x = -60;
      this.body.velocity.y = 0;
    }

    if (this.x < 0) {
      this.kill();
    }
  }

  handleKeypress(char) {
    if (this.word[this.cur_char] === char) {
      this.cur_char += 1;
      this.text.clearColors();
      this.text.addColor('#4ADCC0', 0);
      this.text.addColor('#FFF', this.cur_char);
    }

    if (!this.word[this.cur_char]) {
      globals.wordCompletedSignal.dispatch(this);
      globals.keypressSignal.remove(this.handleKeypress, this);
    }
  }
}
