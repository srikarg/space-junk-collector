import { Bullet } from './Bullet'

export class Bullets extends Phaser.Physics.Arcade.Group {
  #bulletVelocityY

  constructor(
    scene: Phaser.Scene,
    quantity?: number,
    key?: string,
    velocityY?: number,
  ) {
    super(scene.physics.world, scene)

    this.#bulletVelocityY = velocityY

    this.createMultiple({
      quantity: quantity ?? 5,
      key: key ?? 'bullet-medium',
      active: false,
      visible: false,
      classType: Bullet,
    })
  }

  setVelocityY(velocityY: number) {
    this.#bulletVelocityY = velocityY
  }

  fire(x: number, y: number) {
    const bullet = this.getFirstDead(false)

    if (bullet) {
      bullet.fire(x, y, this.#bulletVelocityY)
    }
  }
}
