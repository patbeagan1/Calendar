var html = require('choo/html')
const { dayOfYear } = require("../domain/date-manager")

var TITLE = 'calendar - main'

module.exports = view

function view(state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  const dayOfYearDisplay = dayOfYear(state.yearStart, state.now) + 1
  return html`
    <body class="code lh-copy bg-washed-blue">
      <main class="pa3 cf center">
        <h2 class="tc">Beagan Calendar</h2>
        <p class="tc">Day ${dayOfYearDisplay} of ${state.now.getFullYear()}</p>
        <table class="center">${state.weeks.map((it) => row(it.weekNum, it))}</table>
      </main>
    </body>
  `
}


const row = (weekNum, days) => html`
  <tr>
  ${html`<td class='pa3'>${weekNum}</td>`}
  ${days.map((it) => html`<td class="tc">${calendarDay(it)}</td>`)}
  </tr>
`
const maybeImage = (element) => !element.image ? null : html`
    <div class="center tc">${element.number}</div>
    <img class="w-100 hideback" src=${element.image}/>`

const maybeEmoji = (element) => {
  return !element.emoji ? null : html`
  <div class="absolute tc">${element.number}</div>
  <div class="f2">${element.emoji}</div>`
}

const content = (element) => {
  const image = maybeImage(element)
  const emoji = maybeEmoji(element)
  if (image) {
    return image
  }
  if (emoji) {
    return emoji
  }
  return html`<div class="center tc">${element.number}</div>`
}

const calendarDay = (element) => html`
<div class="card">
  <div class="content ba ${element.background}">
    <div class="front hideback clip-content">
      ${content(element)}
    </div>
    <div class="back">
      <div class="center tc">${element.gregorian}</div>
    </div>
  </div>
</div>`

