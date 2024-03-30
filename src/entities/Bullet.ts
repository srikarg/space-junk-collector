export class Bullet extends Phaser.Physics.Arcade.Sprite {
  #GAME_WIDTH
  #GAME_HEIGHT
  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key)

    this.#GAME_WIDTH = scene.game.config.width
    this.#GAME_HEIGHT = scene.game.config.height

    this.setScale(4)
  }

  fire(x: number, y: number, bulletVelocityY: number) {
    this.body.reset(x, y)

    this.setActive(true)
    this.setVisible(true)

    this.setVelocityY(bulletVelocityY)
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta)

    if (this.y <= -32 || this.y >= this.#GAME_HEIGHT + 32) {
      this.setActive(false)
      this.setVisible(false)
    }
  }
}
