const { now, yearStart } = require("../domain/time")
const weeks = require("../domain/calendar-generator")

module.exports = function (state, emitter) {
  loadInitialState(state)
  emitter.on('DOMContentLoaded', function () {
    emitter.on('clicks:add', function (count) {
      state.totalClicks += count
      emitter.emit(state.events.RENDER)
    })
  })
}
function loadInitialState(state) {
  state.totalClicks = 0
  state.weeks = weeks
  state.now = now
  state.yearStart = yearStart
}

