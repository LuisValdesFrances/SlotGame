const FILE_NAME = "slotGameRecors";

class StoreData {

    constructor(){ }

    save(date, dataPrize) {
        let data = this.load();
        if (data === null || typeof data === 'undefined') {
            data = [];
        }
        let file = { 
            date: date, 
            prize: dataPrize };
        data.push(file)
        localStorage.setItem(FILE_NAME, JSON.stringify(data));
    }

    load() {
        var data = JSON.parse(localStorage.getItem(FILE_NAME));


        if (data !== null && typeof data !== 'undefined') {
            data.forEach(file => console.log(file.prize.item));
        }
        return data;
    }
}

export default StoreData;