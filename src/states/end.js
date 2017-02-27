import Phaser from 'phaser-ce';
import globals from '../globals';

export default class extends Phaser.State {
  create() {
    var titleText = this.game.add.text(500, 100, 'U DED', { font: '60px Source Code Pro', fill: '#FFF' });
    titleText.anchor.set(0.5);

    var scoreText = this.game.add.text(500, 200, 'Your final score is: ' + globals.score, { font: '32px Source Code Pro', fill: '#FFF' });
    scoreText.anchor.set(0.5);

    var startText = this.game.add.text(500, 400, 'Press any key to restart...', { font: '32px Source Code Pro', fill: '#FFF' });
    startText.anchor.set(0.5);
    this.game.input.keyboard.addCallbacks(this, null, null, this.handleKeypress);
  }

  handleKeypress() {
    this.state.start('Game');
  }
}
