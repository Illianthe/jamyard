import 'expose-loader?PIXI!phaser-ce/build/custom/pixi';
import 'expose-loader?p2!phaser-ce/build/custom/p2';
import 'expose-loader?Phaser!phaser-ce';
import globals from './globals';
import BootState from './states/boot';
import GameState from './states/game';
import EndState from './states/end';

class Game extends Phaser.Game {
  constructor() {
    super(globals.gameWidth, globals.gameHeight, Phaser.AUTO, 'app');

    this.state.add('Boot', BootState, false);
    this.state.add('Game', GameState, false);
    this.state.add('End', EndState, false);

    this.state.start('Boot');
  }
}
globals.game = new Game();
