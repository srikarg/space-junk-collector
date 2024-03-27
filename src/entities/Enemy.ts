export class Enemy extends Phaser.Physics.Arcade.Sprite {
  #rocketThrustDistanceFromShip = 20
  #rocketThrust: Phaser.GameObjects.Sprite

  constructor(scene: Phaser.Scene) {
    super(
      scene,
      Phaser.Math.Between(0, scene.game.config.width),
      0,
      Phaser.Math.RND.pick([
        'ship-green',
        'ship-orange',
        'ship-purple',
        'ship-red',
      ]),
      1,
    )

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setScale(4)

    this.#rocketThrust = scene.add
      .sprite(
        this.x,
        this.y - this.#rocketThrustDistanceFromShip,
        'rocket-thrust',
      )
      .setFlipY(true)
      .setScale(4)
      .play('rocket-thrust')
  }

  update(scene: Phaser.Scene) {
    this.y += 2

    if (this.y > scene.game.config.height) {
      this.x = Phaser.Math.Between(0, scene.game.config.width)
      this.y = 0
    }

    this.#rocketThrust.setPosition(
      this.x,
      this.y - this.#rocketThrustDistanceFromShip,
    )
  }
}
