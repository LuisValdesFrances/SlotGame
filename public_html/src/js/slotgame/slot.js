import * as Constants from './constants.js';

const READY = 0;
const RUN = 1;
const TARGET = 2;
const FINISH = 3;

class Slot {

    constructor(lastSlot, images, items, selectedItem) {
        this.lastSlot = lastSlot;
        this.images = images;
        this.items = items;
        this.selectedItem = selectedItem;
        this.state = READY;
        this.selectedItemPosition = this.getSelectedItemPosition(this.selectedItem);
        this.setInPosition();
    }

    setInPosition() {
        this.images[0].y = this.selectedItemPosition;
        this.images[1].y = this.images[0].y - this.images[0].height
        this.images[2].y = this.images[0].y + this.images[0].height;
    }

    update(delta) {
        switch (this.state) {
            case RUN:
                this.move(delta);
                if (this.lastSlot != null && this.lastSlot.state === READY) {
                    this.state = TARGET;
                }
                break;
            case TARGET:
                this.move(delta);
                if (this.isInTarget()) {
                    this.state = FINISH;
                }
                break;
            case FINISH:
                this.move(delta);
                break;
        }
    }

    play(selectedItem) {
        this.selectedItem = selectedItem;
        this.selectedItemPosition = this.getSelectedItemPosition(this.selectedItem);
        this.state = RUN;
        if (this.lastSlot === null) {
            setTimeout(() => {
                this.state = TARGET;
            }, Constants.SLOTS_DURATION);
        }
    }

    move(delta) {
        this.images[0].y += this.getSpeed(delta);
        //Restart invalid position
        if (this.images[0].y - this.images[0].height / 2 > Constants.SCREEN_HEIGHT / 2) {
            this.images[0].y = Constants.SCREEN_HEIGHT / 2 - this.images[0].height / 2;
        }
        this.images[1].y = this.images[0].y - this.images[0].height;
        this.images[2].y = this.images[0].y + this.images[0].height;
    }

    getSpeed(delta) {
        let distance = Math.ceil(this.selectedItemPosition - this.images[0].y);
        switch (this.state) {
            case TARGET:
                if (distance < 0) {
                    return Constants.SLOTS_SPEED * delta;
                }
                return Math.min(Constants.SLOTS_SPEED, distance * 8) * delta;
            case RUN:
                return Constants.SLOTS_SPEED * delta;
            case FINISH:
                if (distance < 1) {
                    this.setInPosition();
                    this.state = READY;
                    return 0;
                }
                return Math.max(distance * 8, 1) * delta;
        }
    }

    isInTarget() {
        let distance = Math.abs(this.selectedItemPosition - this.images[0].y);
        return distance < 10;
        /*
        let distance = this.selectedItemPosition - this.images[0].y;
        return distance > 0 && distance < 10;
        */
    }

    getSelectedItemPosition(selectedItem) {
        let index = this.getItemIndex(selectedItem);
        let itemHeight = this.images[0].height / this.items.length;
        let targetPosition = Constants.SCREEN_HEIGHT / 2;
        return (targetPosition + this.images[0].height / 2) - (itemHeight * index) - itemHeight / 2;
    }

    getItemIndex(selectedItem) {
        for (let i = 0; i < this.items.length; i++) {
            if (selectedItem === this.items[i]) {
                return i;
            }
        }
    }

    isReady() {
        return this.state === READY;
    }
}

export default Slot;