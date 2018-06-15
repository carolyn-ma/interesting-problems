class DataLake {
    constructor() {
        if (!DataLake.instance) {
            this._data = [];
            DataLake.instance = this;
        }
        return DataLake.instance;
    }
    
    add(item) {
        this._data.push(item);
    }
    
    get(id) {
        this._data.find(item => item.id === id)
    }   
}

const dataLake = new DataLake();
Object.freeze(dataLake);
export default dataLake;
