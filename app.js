
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

const Placeholder = children =>
  h('span', { class: 'placeholder' }, children)

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
  'y o u \' r e   p a t h e t i c   i n   a e s t h e t i c',
  'you don\'t deserve this',
  'you wyld lmao',
  'YOU\'RE GARBAGE',
  'you\'re not good enough... i don\'t know... maybe you are, but probably not',
  ['yes... your dreams ', Italic('ARE'), ' dead'],
  ['you ', Italic('WOULD'), ' ask a dumb question'],
  [Italic('NEVER'), ' ask me that again']
]

const Relationships = [
  ''
]

const Answers = { General, Relationships }

//
// # View
// =============================================================================

const EightBall = ([ state, actions ]) => {
  const { isShaking } = state

  return h('img', {
    class: isShaking && 'shake',
    src: 'favicon.png',
    onclick () {
      !isShaking && actions.shake({ Answers })
    }
  })
}

const Words = ([ state ]) =>
  state.isShaking
    ? Placeholder('shaking dat shit...')
    : Answers[state.list][state.result] || Placeholder('yo playur, shake dat shit')

const view = (...args) =>
  h('div', { class: 'app' }, [
    h('div', { class: 'app-box' }, [
      EightBall(args),
      h('h1', { class: 'words' }, Words(args))
    ])
  ])

//
// # App
// =============================================================================

app(state, actions, view, document.body)
