class Stats {

    constructor() {
        this.stats = {};
    }

    add(key, name, value) {
        this.stats[key] = {
            name,
            value: (value || 0)
        };

        return this;
    }

    get(key) {
        if (key)
            return this.stats[key].value;

        return Object.keys(this.stats).map(name => {
            return this.stats[name];
        });
    }
    
    set(key, value) {
        this.stats[key].value = value;

        return this;
    }

    clear() {
        for (let key in this.stats) {
            this.stats[key].value = 0;
        }
    }
    
}

export default Stats;
