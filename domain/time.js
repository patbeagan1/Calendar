class TimeKeeper {
    constructor() {
        this.now = new Date()//(2024, 6)
        this.yearStart = new Date(this.now.getFullYear(), 0)
    }
}

module.exports = new TimeKeeper()