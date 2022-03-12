var html = require('choo/html')

const { dayOfYear, dateFromDay, getWeeksFrom, toMonthName, leapYear } = require("./util")
const { now, yearStart } = require("./time")

const month = (days, monthNum) => {
    let counter = 0
    let quarterNum = Math.floor((monthNum - 1) / 3)
    console.log(quarterNum)
    return Array(days).fill(1).map((it) => {
        const evenQuarterColors = monthNum % 2 == 0 ? "bg-yellow" : "bg-light-yellow"
        const oddQuarterColors = monthNum % 2 == 0 ? "bg-light-blue" : "bg-lightest-blue"
        return {
            number: it + counter++,
            background: quarterNum % 2 == 0 ? evenQuarterColors : oddQuarterColors,
            quarter: quarterNum,
            month: monthNum,
            gregorian: "",
            image: "",
            emoji: ""
        }
    })
}

const yearDays = [
    month(31, 1),
    month(30, 2),
    month(30, 3),
    month(31, 4),
    month(30, 5),
    month(leapYear(now.getFullYear()) ? 31 : 30, 6),
    month(31, 7),
    month(30, 8),
    month(30, 9),
    month(31, 10),
    month(30, 11),
    month(31, 12),
].flat()

yearDays.forEach((element, index) => {
    markMoonDays()
    markHolidays()
    applyGregorianDate()

    function applyGregorianDate() {
        const d = dateFromDay(now.getFullYear(), index + 1)
        element.gregorian = html`${toMonthName(d.getMonth())}<br>${d.getDate()}`
    }

    function markHolidays() {
        const holidayFirst = Math.floor((element.month + 1) % 3) == 0 && (element.number == 1)
        const holidaySolar = Math.floor((element.month + 3) % 3) == 0 && (element.number == 20)
        if (holidayFirst || holidaySolar) {
            element.background = "bg-light-purple"
            element.emoji = "🎉"
        }
    }

    function markMoonDays() {
        const isMoonDayNormalYear = (index - 20) % 28 == 0
        let isMoonDayLeapYear
        if (index < 183) {
            isMoonDayLeapYear = (index - 20) % 28 == 0
        } else {
            isMoonDayLeapYear = (index - 21) % 28 == 0
        }

        if (leapYear(now.getFullYear()) ? isMoonDayLeapYear : isMoonDayNormalYear) {
            element.background = "bg-light-gray"
            element.image = "/assets/michael-G9bDsVeHM7I-unsplash.png"
        }
    }
})

yearDays[dayOfYear(yearStart, now)].background = "bg-red"

const weeks = getWeeksFrom(yearDays, leapYear(now.getFullYear()));

(() => {
    let count = 1
    weeks.forEach((it) => {
        it.weekNum = count++
    })
})()

module.exports = { weeks: weeks }