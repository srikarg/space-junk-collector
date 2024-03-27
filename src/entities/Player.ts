export class Player extends Phaser.Physics.Arcade.Sprite {
  #rocketThrustDistanceFromShip = 20
  #rocketThrust: Phaser.GameObjects.Sprite

  constructor(scene: Phaser.Scene) {
    super(
      scene,
      scene.input.activePointer.x,
      scene.input.activePointer.y,
      'ship-white',
    )

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setScale(3)
    this.setCollideWorldBounds(true)

    this.#rocketThrust = scene.add
      .sprite(
        this.x,
        this.y + this.#rocketThrustDistanceFromShip,
        'rocket-thrust',
      )
      .setScale(4)
      .play('rocket-thrust')

    scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.setPosition(pointer.x, pointer.y)
      this.#rocketThrust.setPosition(
        this.x,
        this.y + this.#rocketThrustDistanceFromShip,
      )
    })
  }

  update(scene: Phaser.Scene) {
    const pointerVelocityX = scene.input.activePointer.velocity.x

    this.setFrame(pointerVelocityX < 0 ? 0 : pointerVelocityX === 0 ? 1 : 2)
  }
}
