import Phaser from 'phaser-ce';

var loadingText;

export default class extends Phaser.State {
  preload() {
    this.load.onLoadStart.add(this.loadStart, this);
    this.load.onFileComplete.add(this.fileComplete, this);
    this.load.onLoadComplete.add(this.loadComplete, this);

    this.load.text('base-wordlist', 'assets/data/base_wordlist.txt');
    this.load.text('typo-wordlist', 'assets/data/typo_wordlist.txt');
    this.load.image('background', 'assets/background.png');
    this.load.image('fireball', 'assets/fireball.png');
    this.load.image('title', 'assets/title.png');
    this.load.image('black-tile', 'assets/black_tile.png');
    this.load.image('turquoise-tile', 'assets/turquoise_tile.png');
    this.load.image('purple-tile', 'assets/purple_tile.png');
    this.load.image('red-tile', 'assets/red_tile.png');
    this.load.image('blue-tile', 'assets/blue_tile.png');
    this.load.atlasJSONHash('land-mob', 'assets/sprites/land_mob/land_mob.png', 'assets/sprites/land_mob/land_mob.json');
    this.load.atlasJSONHash('flying-mob-1', 'assets/sprites/flying_mob/flying_mob.png', 'assets/sprites/flying_mob/flying_mob.json');
    this.load.atlasJSONHash('flying-mob-2', 'assets/sprites/flying_mob_2/flying_mob_2.png', 'assets/sprites/flying_mob_2/flying_mob_2.json');
    this.load.atlasJSONHash('flying-mob-3', 'assets/sprites/flying_mob_3/flying_mob_3.png', 'assets/sprites/flying_mob_3/flying_mob_3.json');
    this.load.atlasJSONHash('flying-mob-4', 'assets/sprites/flying_mob_4/flying_mob_4.png', 'assets/sprites/flying_mob_4/flying_mob_4.json');
    this.load.atlasJSONHash('wizard', 'assets/sprites/wizard/wizard.png', 'assets/sprites/wizard/wizard.json');
    this.load.audio('music-2', ['assets/audio/music_2.ogg']);
    this.load.audio('hit', ['assets/audio/hit.wav']);
  }

  create() {
    this.game.add.image(0, 0, 'background');

    var title = this.game.add.image(500, 100, 'title');
    title.anchor.set(0.5);

    var startText = this.game.add.text(500, 400, 'Press any key to start!', { font: '32px Source Code Pro', fill: '#FFF' });
    startText.anchor.set(0.5);
    this.game.input.keyboard.addCallbacks(this, null, null, this.handleKeypress);
  }

  loadStart() {
    loadingText = this.game.add.text(20, 20, 'Loading: 0%', { font: '20px Source Code Pro', fill: '#FFF' });
  }

  fileComplete(progress) {
    loadingText.setText('Loading: ' + progress + '%');
  }

  loadComplete() {
    loadingText.visible = false;
  }

  handleKeypress() {
    this.state.start('Game');
  }
}
