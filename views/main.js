var html = require('choo/html')
const { dayOfYear } = require("../util/util")
const { now, yearStart } = require("../util/time")
const { year, weeks } = require("../util/calendar-generator")

var TITLE = 'calendar - main'

module.exports = view

const dayOfYearDisplay = dayOfYear(yearStart, now) + 1

function view(state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy bg-washed-blue">
      <main class="pa3 cf center">
        <h2 class="tc">Beagan Calendar</h2>
        <p class="tc">Day ${dayOfYearDisplay} of ${now.getFullYear()}</p>
        ${calendar()}
        <br>
        <p>${state.totalClicks}</p>
        <button onclick=${handleClick}>test</button>
      </main>
    </body>
  `

  function handleClick() {
    emit('clicks:add', 1)
  }
}

const calendar = () => html`<table class="center">${weeks.map((it) => { return row(it.weekNum, it) })}</table>`

const row = (weekNum, days) => html`
  <tr>
  ${html`<td class='pa3'>${weekNum}</td>`}
  ${days.map((it) => html`<td class="tc">${calendarDay(it)}</td>`)}
  </tr>
`

const calendarDay = (element) => html`
<div class="card">
  <div class="content ba ${element.background}">
    <div class="front hideback clip-content">
      <div class="center tc">${element.number}</div>
      ${element.image
    ? html`<img class="w-100 hideback" src=${element.image}/>`
    : null}
      ${element.emoji
    ? html`<div class="bg-yellow br-pill">${element.emoji}</div>`
    : null}
    </div>
    <div class="back">
      <div class="center tc">${element.gregorian}</div>
    </div>
  </div>
</div>`

