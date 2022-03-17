const weekFactory = require("../domain/calendar-generator")

module.exports = function (state, emitter) {
  loadInitialState(state)
  emitter.on('DOMContentLoaded', function () {
    emitter.on('clicks:add', function (count) {
      state.totalClicks += count
      emitter.emit(state.events.RENDER)
    })
  })
}

const now = new Date()//(2024, 6)
const yearStart = new Date(now.getFullYear(), 0)
function loadInitialState(state) {
  state.now = now
  state.yearStart = yearStart
  state.totalClicks = 0
  state.weeks = weekFactory(now, yearStart)
}

