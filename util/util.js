const leapYear = (year) => {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
}

module.exports = {
    dayOfYear(yearStart, now) {
        var diff = now - yearStart
        var oneDay = 1000 * 60 * 60 * 24
        var day = Math.floor(diff / oneDay)
        return day
    },
    dateFromDay(year, day) {
        var date = new Date(year, 0)
        return new Date(date.setDate(day))
    },
    leapYear,
    getWeeksFrom(year, isLeapYear) {
        let allWeeks = []
        let thisWeek = []
        const longWeeks = [52]
        if (isLeapYear) {
            longWeeks.push(26)
        }
        year.forEach(element => {
            thisWeek.push(element)
            const weekLength = longWeeks.includes(allWeeks.length + 1) ? 8 : 7
            if (thisWeek.length == weekLength) {
                allWeeks.push(thisWeek)
                thisWeek = []
            }
        });
        return allWeeks
    },
    toMonthName(monthNum) {
        switch (monthNum) {
            case 0: return "Jan"
            case 1: return "Feb"
            case 2: return "Mar"
            case 3: return "Apr"
            case 4: return "May"
            case 5: return "Jun"
            case 6: return "Jul"
            case 7: return "Aug"
            case 8: return "Sept"
            case 9: return "Oct"
            case 10: return "Nov"
            case 11: return "Dec"
            default: return "---"
        }
    }
}