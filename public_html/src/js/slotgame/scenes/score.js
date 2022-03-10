import * as Constants from '../constants.js';
import StoreData from '../store-data.js'
import BackButton from '../back-button.js';

class Score extends Phaser.Scene {

    constructor() {
        super('Score');
        this.scores = [];
        this.storeData = new StoreData();
    }

    init() {
        this.scores = this.storeData.load();
    }

    preload() {
        this.load.image('backgroud', 'src/assets/images/background.png');
    }

    create(data) {
        this.add.image(Constants.SCREEN_WIDTH / 2, Constants.SCREEN_HEIGHT / 2, 'backgroud');
        let text = '';
        if (this.scores === null || this.scores === 'undefined') {
            text = 'NO SCORES'
        } else {
            let scoresNumber = Math.min(Constants.MAX_SCORES_SHOW, this.scores.length - 1);
            for (let i = scoresNumber; i > -1; i--) {
                text += ('Item: ' + this.scores[i].prize.item + ' - Acum: ' + (this.scores[i].prize.endSlotIndex - this.scores[i].prize.startSlotIndex) +
                    ' - Date: ' + this.scores[i].date);
                text += '\n\n';
            }
        }
        new BackButton(
            this, this.add.image(
                Constants.BUTTON_SIZE / 2 + Constants.BUTTON_MARGIN,
                Constants.BUTTON_SIZE / 2 + Constants.BUTTON_MARGIN, "back"));

        let style = { font: "bold 22px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.add.text(Constants.SCREEN_WIDTH / 2, Constants.SCREEN_HEIGHT / 2, text, style).setOrigin(0.5);
    }
}

export default Score;