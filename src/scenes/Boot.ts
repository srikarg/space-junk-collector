import { Scene } from 'phaser'

export class Boot extends Scene {
  constructor() {
    super('Boot')
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
    // https://gvituri.itch.io/space-shooter
    this.load.spritesheet('backgrounds', 'assets/bgs.png', {
      frameWidth: 128,
      frameHeight: 256,
      spacing: 1,
    })
  }

  create() {
    this.scene.start('Preloader')
  }
}
