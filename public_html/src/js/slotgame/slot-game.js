import * as Constants from './constants.js';
import Game from './scenes/game.js';
import Score from './scenes/score.js';

var config = {
    type: Phaser.AUTO,
    width: Constants.SCREEN_WIDTH,
    height: Constants.SCREEN_HEIGHT,
    autoCenter: true,
    scale: {
        mode: Phaser.Scale.FIT
    },
    scene: [
        Game,
        Score
    ]
};

new Phaser.Game(config);