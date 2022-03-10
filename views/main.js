var html = require('choo/html');
const { default: collect } = require('collect.js');

var TITLE = 'calendar - main'

module.exports = view

function view(state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)


  const d = new Date();
  const current = d.getTime()
  const yearStart = new Date(2022, 0)
  const thisYear = new Date(current - yearStart)

  return html`
    <body class="code lh-copy">
      <main class="pa3 cf center">
      <div class="card">
  <div class="content">
    <div class="front">
      Front
    </div>
    <div class="back">
      Back!
    </div>
  </div>
</div>
        <h2 class="tc">Beagan Calendar</h2>
        <p class="tc">Day ${dayOfYear()} of ${d.getFullYear()}</p>
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

const month = (days, monthNum) => {
  let counter = 0
  let quarterNum = Math.floor((monthNum - 1) / 3)
  console.log(quarterNum);
  return Array(days).fill(1).map((it) => {
    const evenQuarterColors = monthNum % 2 == 0 ? "bg-gold" : "bg-yellow";
    const oddQuarterColors = monthNum % 2 == 0 ? "bg-light-blue" : "bg-lightest-blue";
    return {
      number: it + counter++,
      background: quarterNum % 2 == 0 ? evenQuarterColors : oddQuarterColors
    }
  })
}

const dayOfYear = () => {
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  return day
}

const year = [
  month(31, 1),
  month(30, 2),
  month(30, 3),
  month(31, 4),
  month(30, 5),
  month(30, 6),
  month(31, 7),
  month(30, 8),
  month(30, 9),
  month(31, 10),
  month(30, 11),
  month(30, 12),
].flat()

year[dayOfYear()].background = "bg-red"
const weeks = collect(year).chunk(7).all();

(() => {
  let count = 1
  weeks.forEach((it) => {
    it.weekNum = count++
  })
})()

const weeknumComponent = (weekNum) => html`<td class='pa3'>${weekNum}</td>`
const calendar = () => html`<table class="center">${weeks.map((it) => { return row(it.weekNum, it.items) })}</table>`
const row = (weekNum, days) => html`<tr>
${weeknumComponent(weekNum)}
${calRow(days)}
</tr>`
const calRow = (calText) => calText.map((it) => html`<td class="ba pa3 tc ${it.background}">${calendarDay(it)}</td>`)
const calendarDay = (number) => html`<div class="center tc">${number.number}</div>`

