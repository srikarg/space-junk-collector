import { Scene } from 'phaser'

export class Preloader extends Scene {
  #background: Phaser.GameObjects.TileSprite

  constructor() {
    super('Preloader')
  }

  init() {
    const GAME_WIDTH = this.game.config.width
    const GAME_HEIGHT = this.game.config.height

    //  We loaded this image in our Boot Scene, so we can display it here
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
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath('assets')
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start('MainMenu')
  }

  update() {
    this.#background.tilePositionY -= 0.4
  }
}
