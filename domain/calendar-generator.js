var html = require('choo/html')

const { dayOfYear, dateFromDay, getWeeksFrom, toMonthName, leapYear } = require("./date-manager")
const { now, yearStart } = require("./time")

class CalendarGenerator {
    
    constructor() {
        this.yearDays = [
            this.month(31, 1),
            this.month(30, 2),
            this.month(30, 3),
            this.month(31, 4),
            this.month(30, 5),
            this.month(leapYear(now.getFullYear()) ? 31 : 30, 6),
            this.month(31, 7),
            this.month(30, 8),
            this.month(30, 9),
            this.month(31, 10),
            this.month(30, 11),
            this.month(31, 12),
        ].flat()

        this.yearDays.forEach((element, index) => {
            const leapYearOffset = leapYear(now.getFullYear())
                ? index < 183
                    ? 0
                    : 1
                : 0
            this.markMoonDays(element, index)
            this.markHolidays(element)
            this.applyHolidayDecoration(element, index, leapYearOffset)
            this.applyGregorianDate(element, index)
        })

        this.yearDays[dayOfYear(yearStart, now)].background = "bg-red"

        this.weeks = this.loadWeeks()
    }

    month(days, monthNum) {
        let counter = 0
        let quarterNum = Math.floor((monthNum - 1) / 3)
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

    applyGregorianDate(element, index) {
        const d = dateFromDay(now.getFullYear(), index + 1)
        element.gregorian = html`${toMonthName(d.getMonth())}<br>${d.getDate()}`
    }

    applyHolidayDecoration(element, index, leapYearOffset) {
        switch (index + 1 - leapYearOffset) {
            case 32: element.emoji = "🕯"
                break
            case 81: element.emoji = "🐇"
                break
            case 123: element.emoji = "🔥"
                break
            case 172: element.emoji = "🌱"
                break
            case 214: element.emoji = "🛠"
                break
            case 263: element.emoji = "🍲"
                break
            case 305: element.emoji = "🎃"
                break
            case 354: element.emoji = "🎄"
                break
        }
    }

    markHolidays(element) {
        const holidayFirst = Math.floor((element.month + 1) % 3) == 0 && (element.number == 1)
        const holidaySolar = Math.floor((element.month + 3) % 3) == 0 && (element.number == 20)
        if (holidayFirst || holidaySolar) {
            element.background = "bg-light-purple"
            element.emoji = "🎉"
        }
    }

    markMoonDays(element, index) {
        const isMoonDayNormalYear = (index - 20) % 28 == 0
        const moonDayOffset = index < 183 ? 20 : 21
        const isMoonDayLeapYear = (index - moonDayOffset) % 28 == 0

        if (leapYear(now.getFullYear()) ? isMoonDayLeapYear : isMoonDayNormalYear) {
            element.background = "bg-light-gray"
            element.image = "/assets/michael-G9bDsVeHM7I-unsplash.png"
        }
    }

    loadWeeks() {
        const weeks = getWeeksFrom(this.yearDays, leapYear(now.getFullYear()));

        (() => {
            let count = 1
            weeks.forEach((it) => {
                it.weekNum = count++
            })
        })()
        return weeks
    }
}

module.exports = new CalendarGenerator().weeks
