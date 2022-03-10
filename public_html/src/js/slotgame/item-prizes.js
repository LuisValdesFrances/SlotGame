import * as Constants from './constants.js';

class ItemPrizes {

    constructor(images) {
        this.images = images
        this.slotPrizes = null;
        this.slotMachine = null;
        this.currentIndex = 0;
        this.images.forEach(slot => slot.forEach(image => image.setVisible(false)));
    }

    update(delta) {
        if (this.getCurrentImage().alpha <= 0) {
            this.getCurrentImage().alpha = 1;
            this.getCurrentImage().setVisible(false);
            if (this.isNext()) {
                this.startItemPrize();
            } else {
                this.slotMachine.showPanel(this.slotPrizes);
            }
            return;
        }
        let currentScale = this.getCurrentImage().scale + ((delta * (Constants.MAX_SCALE_ITEM - 1)) / Constants.DURATION_SCALE_ITEM);
        this.getCurrentImage().setScale(currentScale);
        let alpha = 1 - ((this.getCurrentImage().scale - 1) / ((Constants.MAX_SCALE_ITEM - 1) - this.getCurrentImage().scale));
        this.getCurrentImage().alpha = alpha;
        //this.getCurrentImage().z = -1;
    }

    start(slotPrizes, slotMachine) {
        this.slotPrizes = slotPrizes;
        this.slotMachine = slotMachine;
        this.currentIndex = slotPrizes.startSlotIndex;
        this.startItemPrize();
    }

    startItemPrize() {
        this.getCurrentImage().setVisible(true);
        this.getCurrentImage().x = this.slotMachine.slots[this.currentIndex].images[0].x;
        this.getCurrentImage().y = Constants.SCREEN_HEIGHT / 2;
        this.getCurrentImage().setScale(1);
        this.getCurrentImage().alpha = 1;
    }

    isNext() {
        this.currentIndex++;
        return this.currentIndex <= this.slotPrizes.endSlotIndex;
    }

    getCurrentImage() {
        return this.images[this.currentIndex][this.slotPrizes.item];
    }
}

export default ItemPrizes;