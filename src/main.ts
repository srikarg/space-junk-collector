import { Boot } from './scenes/Boot'
import { Game as MainGame } from './scenes/Game'
import { GameOver } from './scenes/GameOver'
import { MainMenu } from './scenes/MainMenu'
import { Preloader } from './scenes/Preloader'

import { Game, Types } from 'phaser'

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 128,
  height: 256,
  parent: 'game-container',
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 200,
      },
      debug: false,
    },
  },
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
}

export default new Game(config)
