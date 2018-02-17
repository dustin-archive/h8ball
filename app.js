
/* global hyperapp */

const { h, app } = hyperapp

//
// # Functions
// =============================================================================

const { floor, random } = Math

//
// # Helpers
// =============================================================================

const randomInt = max =>
  floor(random() * floor(max))

//
// # State
// =============================================================================

const state = {
  list: 'General'
}

//
// # Actions
// =============================================================================

const update = data => data

const shake = data => (state, actions) => {
  const { list } = state
  const { update } = actions

  update({
    isShaking: true
  })

  setTimeout(() => {
    update({
      isShaking: false,
      result: randomInt(data.Answers[list].length - 1)
    })
  }, 1000)
}

const actions = { update, shake }

//
// # Components
// =============================================================================

const Italic = children =>
  h('span', { class: 'italic' }, children)

const Whitespace = children =>
  h('span', { class: 'whitespace' }, children)

const Placeholder = children =>
  h('span', { class: 'placeholder' }, children)

// const State = ([ state ]) =>
//   h('div', { class: '_code' }, JSON.stringify(state, null, 2))

//
// # Answer Lists
// =============================================================================

const General = [
  '404',
  'congratulations, you played yourself',
  'did you agree to the TOS?',
  'do you hate your life?',
  'LOL SIKE',
  'no one likes you',
  'no, this is patrick',
  'nope, sorry',
  'o boi',
  'rip',
  'siiigh',
  'sorry, what?',
  'spicy bois ain\'t got chu',
  'the spicy bois have sealed yer fate',
  'try again never',
  'try me, bitch',
  'WASTED',
  'what\'s the point?',
  Whitespace('y o u \' r e   p a t h e t i c   i n   a e s t h e t i c'),
  'you don\'t deserve this',
  'you wyld lmao',
  'you\'re dead inside',
  'YOU\'RE GARBAGE',
  'you\'re not good enough... i don\'t know... maybe you are, but probably not',
  ['yes... your dreams ', Italic('ARE'), ' dead'],
  ['you ', Italic('WOULD'), ' ask a dumb question'],
  [Italic('NEVER'), ' ask me that again']
]

const Standard = [
  'It is certain',
  'It is decidedly so',
  'Without a doubt',
  'Yes definitely',
  'You may rely on it',
  'As I see it, yes',
  'Most likely',
  'Outlook good',
  'Yes',
  'Signs point to yes',
  'Reply hazy try again',
  'Ask again later',
  'Better not tell you now',
  'Cannot predict now',
  'Concentrate and ask again',
  'Don\'t count on it',
  'My reply is no',
  'My sources say no',
  'Outlook not so good',
  'Very doubtful'
]

const Answers = {
  General,
  Standard
}

//
// # View
// =============================================================================

const EightBall = ([ state, actions ]) => {
  const { shake } = actions
  const { isShaking } = state

  return h('img', {
    class: isShaking && 'shake',
    src: 'favicon.png',
    onclick () {
      !isShaking && shake({ Answers })
    }
  })
}

const Words = ([ state ]) => {
  const { isShaking, list, result } = state

  return isShaking
    ? Placeholder('shaking dat shit...')
    : Answers[list][result] || Placeholder('yo playur, shake dat shit')
}

const Select = ([ s, actions ]) => {
  const lists = Object.keys(Answers)
  const options = []

  for (let i = 0; i < lists.length; i++) {
    options[i] = h('option', null, lists[i])
  }

  return h('select', {
    onchange (e) {
      actions.update({
        list: lists[e.target.selectedIndex],
        result: null
      })
    }
  }, options)
}

const view = (...args) =>
  h('div', { class: 'app' }, [
    Select(args),
    h('div', { class: 'app-box' }, [
      EightBall(args),
      h('h1', { class: 'words' }, Words(args))
    ])
  ])

//
// # App
// =============================================================================

app(state, actions, view, document.body)
