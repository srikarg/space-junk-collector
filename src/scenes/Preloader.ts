import { Scene } from 'phaser'

export class Preloader extends Scene {
  #background: Phaser.GameObjects.TileSprite

  constructor() {
    super('Preloader')
  }

  init() {
    const GAME_WIDTH = this.game.config.width
    const GAME_HEIGHT = this.game.config.height

    this.#background = this.add.tileSprite(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH,
      GAME_HEIGHT,
      'backgrounds',
      0,
    )

    //  A simple progress bar. This is the outline of the bar.
    const OUTLINE_WIDTH = 400
    const OUTLINE_HEIGHT = 30
    this.add
      .rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, OUTLINE_WIDTH, OUTLINE_HEIGHT)
      .setStrokeStyle(2, 0xffffff)

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(
      GAME_WIDTH / 2 - OUTLINE_WIDTH / 2 + 4,
      GAME_HEIGHT / 2,
      4,
      OUTLINE_HEIGHT - 4,
      0x22c55e,
    )

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'LOADING...', {
        align: 'center',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress: number) => {
      bar.width = (OUTLINE_WIDTH - 4) * progress
    })
  }

  preload() {
    //  Load the assets for the game
    this.load.setPath('assets')

    // Player ship and rocket thrust sprites
    this.load.spritesheet('ship-white', 'sprites/ship-white.png', {
      frameWidth: 8,
      frameHeight: 8,
    })
    this.load.spritesheet('rocket-thrust', 'sprites/rocket-thrust.png', {
      frameWidth: 4,
      frameHeight: 5,
      spacing: 4,
    })

    // Enemy ships sprites
    this.load.spritesheet('ship-green', 'sprites/ship-green.png', {
      frameWidth: 8,
      frameHeight: 8,
    })
    this.load.spritesheet('ship-orange', 'sprites/ship-orange.png', {
      frameWidth: 8,
      frameHeight: 8,
    })
    this.load.spritesheet('ship-purple', 'sprites/ship-purple.png', {
      frameWidth: 8,
      frameHeight: 8,
    })
    this.load.spritesheet('ship-red', 'sprites/ship-red.png', {
      frameWidth: 8,
      frameHeight: 8,
    })

    // Bullet sprites
    this.load.image('bullet-heavy', 'sprites/bullet-heavy.png')
    this.load.image('bullet-medium', 'sprites/bullet-medium.png')

    // Energy sprites
    this.load.image('blue-energy', 'sprites/blue-energy.png')
    this.load.image('pink-energy', 'sprites/pink-energy.png')

    // Explosion sprite
    this.load.spritesheet('explosion', 'sprites/explosion.png', {
      frameWidth: 8,
      frameHeight: 8,
    })

    // UI sprites
    this.load.spritesheet('audio-buttons', 'sprites/audio-buttons.png', {
      frameWidth: 12,
      frameHeight: 13,
    })

    // Music
    this.load.audio('bg', 'music/bg.ogg')
  }

  create() {
    this.anims.create({
      key: 'rocket-thrust',
      frames: this.anims.generateFrameNames('rocket-thrust'),
      frameRate: 20,
      repeat: -1,
    })

    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNames('explosion'),
      frameRate: 20,
      repeat: 1,
    })

    this.scene.start('MainMenu')
  }

  update() {
    this.#background.tilePositionY -= 0.4
  }
}
