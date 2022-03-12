class TimeKeeper {
    constructor() {
        this.now = new Date()
        this.yearStart = new Date(this.now.getFullYear(), 0)
    }
}

module.exports = new TimeKeeper()