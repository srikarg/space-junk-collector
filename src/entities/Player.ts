export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene) {
    super(
      scene,
      scene.input.activePointer.x,
      scene.input.activePointer.y,
      'ship-white',
    )

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setScale(2)
    this.setCollideWorldBounds(true)

    scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.setX(pointer.x)
      this.setY(pointer.y)
    })
  }

  update(scene: Phaser.Scene) {
    const pointerVelocityX = scene.input.activePointer.velocity.x

    this.setFrame(pointerVelocityX < 0 ? 0 : pointerVelocityX === 0 ? 1 : 2)
  }
}
