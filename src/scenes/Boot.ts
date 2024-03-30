import { Scene } from 'phaser'

export class Boot extends Scene {
  constructor() {
    super('Boot')
  }

  preload() {
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
