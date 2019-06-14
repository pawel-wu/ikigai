const circle_need = document.querySelector('.c1')
const circle_good = document.querySelector('.c2')
const circle_love = document.querySelector('.c3')
const circle_paid = document.querySelector('.c4')

const text_purpose = document.querySelector('.text-purpose')
const text_mission = document.getElementById('text_mission')
const text_passion = document.getElementById('text_passion')
const text_profession = document.getElementById('text_profession')
const text_vocation = document.getElementById('text_vocation')

const subtext_useless = document.getElementById('useless')
const subtext_well_off = document.getElementById('well_off')
const subtext_empty = document.getElementById('empty')
const subtext_uncertain = document.getElementById('uncertain')

let marked = {}

text_purpose.classList.add('hidden')
text_mission.classList.add('hidden')
text_passion.classList.add('hidden')
text_profession.classList.add('hidden')
text_vocation.classList.add('hidden')

subtext_useless.classList.add('hidden')
subtext_well_off.classList.add('hidden')
subtext_empty.classList.add('hidden')
subtext_uncertain.classList.add('hidden')

const toggleVisibility = (element, fieldName) => {
  if (Object.values(area.filter(a => a.field === fieldName))[0].marked
    .every(item => item === true)) {
      element.classList.remove('hidden')
  }
  else if (!Object.values(area.filter(a => a.field === fieldName))[0].marked
    .every(item => item === true)) {
      element.classList.add('hidden')
  }
}

const select = (element, areas, name, answer) => {
  feelings.filter(f => f.name === name)[0].marked = true
  if (answer === 'y') {
    element.classList.add('filled')
    area.filter(a => a.field === areas[0])[0].marked[areas[1]] = true
    area.filter(a => a.field === areas[2])[0].marked[areas[3]] = true
    area.filter(a => a.field === areas[4])[0].marked[areas[5]] = true
    feelings.filter(f => f.name === name)[0].positive = true
  }
  else if (answer === 'n') {
    element.classList.remove('filled')
    area.filter(a => a.field === areas[0])[0].marked[areas[1]] = false
    area.filter(a => a.field === areas[2])[0].marked[areas[3]] = false
    area.filter(a => a.field === areas[4])[0].marked[areas[5]] = false
    feelings.filter(f => f.name === name)[0].positive = false
  }

  marked = feelings.reduce(
    (mark, count) => ({ ...mark, [count.marked]: (mark[count.marked] || 0) + 1}),
    {}
  )

  toggleVisibility(text_purpose, "purpose")
  toggleVisibility(text_mission, "mission")
  toggleVisibility(text_passion, "passion")
  toggleVisibility(text_profession, "profession")
  toggleVisibility(text_vocation, "vocation")

  if (marked.true >= 4) {
    if (feelings.filter(f => f.name === "love")[0].positive === false) {
      subtext_empty.classList.remove('hidden')
    }
    else if (feelings.filter(f => f.name === "love")[0].positive === true) {
      subtext_empty.classList.add('hidden')
    }

    if (feelings.filter(f => f.name === "need")[0].positive === false) {
      subtext_useless.classList.remove('hidden')
    }
    else if (feelings.filter(f => f.name === "need")[0].positive === true) {
      subtext_useless.classList.add('hidden')
    }

    if (feelings.filter(f => f.name === "paid")[0].positive === false) {
      subtext_well_off.classList.remove('hidden')
    }
    else if (feelings.filter(f => f.name === "paid")[0].positive === true) {
      subtext_well_off.classList.add('hidden')
    }

    if (feelings.filter(f => f.name === "good")[0].positive === false) {
      subtext_uncertain.classList.remove('hidden')
    }
    else if (feelings.filter(f => f.name === "good")[0].positive === true) {
      subtext_uncertain.classList.add('hidden')
    }
  }
}

const area = [
  { field: "profession", marked: [false, false] },
  { field: "mission", marked: [false, false] },
  { field: "vocation", marked: [false, false] },
  { field: "passion", marked: [false, false] },
  { field: "purpose", marked: [false, false, false, false] }
]

const feelings = [
  { name: "love", marked: false, positive: false },
  { name: "need", marked: false, positive: false },
  { name: "good", marked: false, positive: false },
  { name: "paid", marked: false, positive: false }
]


const highlight = (event) => {
  switch (event.name) {
    case 'need':
      select(circle_need, ["vocation", 0, "mission", 1, "purpose", 0], event.name, event.value)
      break
    case 'good':
      select(circle_good, ["passion", 1, "profession", 0, "purpose", 1], event.name, event.value)
      break
    case 'love':
      select(circle_love, ["mission", 0, "passion", 0, "purpose", 2], event.name, event.value)
      break
    case 'paid':
      select(circle_paid, ["vocation", 1, "profession", 1, "purpose", 3], event.name, event.value)
      break
    default:
      break
  }
}
