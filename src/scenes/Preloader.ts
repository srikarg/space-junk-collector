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
      0,
      0,
      'backgrounds',
      0,
    )

    //  A simple progress bar. This is the outline of the bar.
    this.add
      .rectangle(GAME_WIDTH, GAME_HEIGHT, 468, 32)
      .setStrokeStyle(1, 0xffffff)

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(GAME_WIDTH - 230, 384, 4, 28, 0xffffff)

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress: number) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress
    })
  }

  preload() {
    //  Load the assets for the game
    this.load.setPath('assets')

    // Player ship and rocket thrust sprites
    this.load.spritesheet('ship-white', 'ship-white.png', {
      frameWidth: 8,
      frameHeight: 8,
    })
    this.load.spritesheet('rocket-thrust', 'rocket-thrust.png', {
      frameWidth: 4,
      frameHeight: 5,
      spacing: 4,
    })

    // Enemy ships sprites
    this.load.spritesheet('ship-green', 'ship-green.png', {
      frameWidth: 8,
      frameHeight: 8,
    })
    this.load.spritesheet('ship-orange', 'ship-orange.png', {
      frameWidth: 8,
      frameHeight: 8,
    })
    this.load.spritesheet('ship-purple', 'ship-purple.png', {
      frameWidth: 8,
      frameHeight: 8,
    })
    this.load.spritesheet('ship-red', 'ship-red.png', {
      frameWidth: 8,
      frameHeight: 8,
    })

    // Bullet sprites
    this.load.image('bullet-heavy', 'bullet-heavy.png')
    this.load.image('bullet-medium', 'bullet-medium.png')

    // Energy sprites
    this.load.image('blue-energy', 'blue-energy.png')
    this.load.image('pink-energy', 'pink-energy.png')

    // Explosion sprite
    this.load.spritesheet('explosion', 'explosion.png', {
      frameWidth: 8,
      frameHeight: 8,
    })
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
