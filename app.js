
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

const Italic = text =>
  h('span', { class: 'italic' }, text)

const state = {
  answers: [
    '404',
    'congratulations, you played yourself',
    'did you agree to the TOS?',
    'do you hate your life?',
    'LOL SIKE',
    [Italic('NEVER'), ' ask me that again'],
    'no one likes you',
    'no, this is patrick',
    'nope, sorry',
    'o boi',
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
    ['you ', Italic('WOULD'), ' ask a dumb question'],
    'you wyld lmao',
    'YOU\'RE GARBAGE',
    'you\'re not good enough... i don\'t know... maybe you are, but probably not',
    ['yes... your dreams ', Italic('ARE'), ' dead']
  ]
}

//
// # Actions
// =============================================================================

const update = data => data

const shake = d => (state, actions) => {
  const { answers } = state

  const { update } = actions

  update({
    isShaking: true
  })

  setTimeout(() => {
    update({
      isShaking: false,
      result: answers[randomInt(answers.length - 1)]
    })
  }, 1000)
}

const actions = { update, shake }

//
// # View
// =============================================================================

const EightBall = ([ state, actions ]) =>
  h('img', {
    class: state.isShaking && 'shake',
    src: 'favicon.png',
    onclick () {
      actions.shake()
    }
  })

const Placeholder = children =>
  h('span', { class: 'placeholder' }, children)

const Words = ([ state ]) =>
  state.isShaking
    ? Placeholder('shaking dat shit...')
    : state.result || Placeholder('yo playur, shake dat shit')

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
