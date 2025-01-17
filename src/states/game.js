import Phaser from 'phaser-ce';
import globals from '../globals';
import LandMob from '../sprites/land_mob';
import FlyingMob from '../sprites/flying_mob';
import Wizard from '../sprites/wizard';

export default class extends Phaser.State {
  init() {
    this.game.sound.removeByKey('music-2');
    globals.health = 100;
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
    this.healthText = this.game.add.text(20, 50, 'Health: ' + globals.health, { font: '20px Source Code Pro', fill: '#fff' });

    this.game.sound.play('music-2', 1, true);
  }

  update() {
    this.game.physics.arcade.overlap(globals.wizard, globals.mobs, this.mobCollideHandler, null, this);
    this.scoreText.text = 'Score: ' + globals.score;
    this.healthText.text = 'Health: ' + globals.health;

    if (!globals.wizard.alive) {
      this.state.start('End');
    }
  }

  handleKeypress(char) {
    globals.keypressSignal.dispatch(char);
  }

  spawnLandMob() {
    globals.mobs.addAt(new LandMob({ game: this.game, cardAttrs: this.getTextCardAttrs(), x: 1000, y: this.game.rnd.integerInRange(400, 500) }), 0);
    this.game.time.events.add(this.getSpawnSpeed(), this.spawnLandMob, this);
  }

  spawnFlyingMob() {
    var type = this.game.rnd.integerInRange(1, 4);
    globals.mobs.addAt(new FlyingMob({ game: this.game, cardAttrs: this.getTextCardAttrs(), type: type, x: 1000, y: this.game.rnd.integerInRange(0, 350) }), 0);
    this.game.time.events.add(this.getSpawnSpeed(), this.spawnFlyingMob, this);
  }

  getSpawnSpeed() {
    var spawnSpeed;
    if (globals.score > 100) {
      spawnSpeed = Phaser.Timer.SECOND + this.game.rnd.integerInRange(0, 1000);
    } else if (globals.score > 50) {
      spawnSpeed = Phaser.Timer.SECOND + this.game.rnd.integerInRange(0, 3000);
    } else if (globals.score > 20) {
      spawnSpeed = Phaser.Timer.SECOND + this.game.rnd.integerInRange(0, 5000);
    } else if (globals.score > 5) {
      spawnSpeed = Phaser.Timer.SECOND + this.game.rnd.integerInRange(0, 7000);
    } else {
      spawnSpeed = Phaser.Timer.SECOND + this.game.rnd.integerInRange(0, 9000);
    }
    return spawnSpeed;
  }

  getTextCardAttrs() {
    var n = this.game.rnd.integerInRange(0, 3);
    var attrs = {};

    switch (n) {
    case 0:
      attrs = { tile: 'blue-tile', color: '#55A1E7' }
      break;
    case 1:
      attrs = { tile: 'purple-tile', color: '#8282CE' }
      break;
    case 2:
      attrs = { tile: 'red-tile', color: '#F58263' }
      break;
    case 3:
      attrs = { tile: 'turquoise-tile', color: '#4ADCC0' }
      break;
    }

    return attrs;
  }

  mobCollideHandler(wizard, mob) {
    mob.kill();
    if (globals.health > 0) {
      globals.health -= 20;
    }

    if (globals.health === 0) {
      wizard.die();
    }
  }
}
