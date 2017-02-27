import Phaser from 'phaser-ce';
import globals from '../globals';

export default class extends Phaser.Sprite {
  constructor({ game, x, y, cardAttrs }) {
    super(game, x, y, 'land-mob', 'idle/frame-1.png');
    this.cardAttrs = cardAttrs;
    this.animations.add('idle', Phaser.Animation.generateFrameNames('idle/frame-', 1, 8, '.png', 0), 10, true, false);
    this.animations.play('idle');
    this.anchor.setTo(0.5);

    this.word = globals.typoWordlist[game.rnd.integerInRange(0, globals.typoWordlist.length)];
    this.cur_char = 0;
    var textGroup = new Phaser.Group(this.game, this);
    var text = this.text = game.add.text(0, -32, this.word, {
      font: '20px Source Code Pro',
      fill: '#FFF'
    });
    text.anchor.set(0.5);
    var border = game.add.tileSprite(0, -36, text.width + 20, text.height + 10, cardAttrs.tile);
    border.anchor.set(0.5);
    var bg = game.add.tileSprite(0, -36, text.width + 18, text.height + 8, 'black-tile');
    bg.anchor.set(0.5);
    textGroup.add(border);
    textGroup.add(bg);
    textGroup.add(text);

    game.physics.enable(this, Phaser.Physics.ARCADE);
    globals.keypressSignal.add(this.handleKeypress, this);
    game.add.existing(this);
  }

  update() {
    if (globals.wizard.alive) {
      this.game.physics.arcade.moveToObject(this, globals.wizard, 40);
    } else {
      this.body.velocity.x = -40;
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
      this.text.addColor(this.cardAttrs.color, 0);
      this.text.addColor('#FFF', this.cur_char);
    }

    if (!this.word[this.cur_char]) {
      globals.wordCompletedSignal.dispatch(this);
      globals.keypressSignal.remove(this.handleKeypress, this);
    }
  }
}
