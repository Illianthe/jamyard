import Phaser from 'phaser-ce';
import globals from '../globals';
import LandMob from '../sprites/land_mob';
import FlyingMob from '../sprites/flying_mob';
import Wizard from '../sprites/wizard';

export default class extends Phaser.State {
  init() {
    globals.lives = 3;
    globals.score = 0;
  }

  create() {
    globals.baseWordlist = this.game.cache.getText('base-wordlist').split('\n');
    globals.typoWordlist = this.game.cache.getText('typo-wordlist').split('\n');

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    globals.wordCompletedSignal = new Phaser.Signal();
    globals.keypressSignal = new Phaser.Signal();
    this.game.input.keyboard.addCallbacks(this, null, null, this.handleKeypress);

    this.game.add.image(0, 0, 'background');

    globals.wizard = new Wizard({ game: this.game, x: 100, y: 400 });
    globals.wizard_attacks = this.game.add.group();
    globals.mobs = this.game.add.group();
    this.spawnLandMob();
    this.spawnFlyingMob();

    this.scoreText = this.game.add.text(20, 20, 'Score: ' + globals.score, { font: '20px Source Code Pro', fill: '#fff' });
    this.livesText = this.game.add.text(20, 50, 'Lives: ' + globals.lives, { font: '20px Source Code Pro', fill: '#fff' });

    this.game.sound.play('music-2', 1, true);
  }

  update() {
    this.game.physics.arcade.overlap(globals.wizard, globals.mobs, this.mobCollideHandler, null, this);
    this.scoreText.text = 'Score: ' + globals.score;
    this.livesText.text = 'Lives: ' + globals.lives;

    if (!globals.wizard.alive) {
      this.state.start('End');
    }
  }

  handleKeypress(char) {
    globals.keypressSignal.dispatch(char);
  }

  spawnLandMob() {
    globals.mobs.addAt(new LandMob({ game: this.game, x: 1000, y: this.game.rnd.integerInRange(400, 500) }), 0);
    this.game.time.events.add(this.getSpawnSpeed(), this.spawnLandMob, this);
  }

  spawnFlyingMob() {
    var type = this.game.rnd.integerInRange(1, 4);
    globals.mobs.addAt(new FlyingMob({ game: this.game, type: type, x: 1000, y: this.game.rnd.integerInRange(0, 300) }), 0);
    this.game.time.events.add(this.getSpawnSpeed(), this.spawnFlyingMob, this);
  }

  getSpawnSpeed() {
    var spawnSpeed;
    if (globals.score > 50) {
      spawnSpeed = Phaser.Timer.SECOND + this.game.rnd.integerInRange(0, 1000);
    } else if (globals.score > 25) {
      spawnSpeed = Phaser.Timer.SECOND + this.game.rnd.integerInRange(0, 3000);
    } else if (globals.score > 10) {
      spawnSpeed = Phaser.Timer.SECOND + this.game.rnd.integerInRange(0, 5000);
    } else if (globals.score > 5) {
      spawnSpeed = Phaser.Timer.SECOND + this.game.rnd.integerInRange(0, 7000);
    } else {
      spawnSpeed = Phaser.Timer.SECOND + this.game.rnd.integerInRange(0, 9000);
    }
    return spawnSpeed;
  }

  mobCollideHandler(wizard, mob) {
    mob.kill();
    if (globals.lives > 0) {
      globals.lives -= 1;
    }

    if (globals.lives === 0) {
      wizard.die();
      console.log('Game over!');
    }
  }
}
