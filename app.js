
const { h, app } = hyperapp // eslint-disable-line

const { floor, random } = Math

const randomInt = max => floor(random() * floor(max))

// # Sound Effects
// + gta5 wasted
// + boing
// + price is right losing horn
// +
// +
// +

// # Images
// +
// +
// +

const state = {
  result: 'yo playur, shake dat shit',
  answers: [
    '404',
    'did you agree to the TOS?',
    'do you hate your life?',
    'LOL SIKE',
    'never ask me that again',
    'no one likes you',
    'no, this is patrick',
    'nope, sorry',
    'o boi',
    'siiigh',
    'sorry, what?',
    'spicy bois ain\'t got chu',
    'the spicy bois have sealed yer fate',
    'try again never',
    'try me bitch',
    'WASTED',
    'what\'s the point?',
    'you don\'t deserve this',
    'you would ask a dumb question',
    'you wyld lmao',
    'YOU\'RE GARBAGE',
    'you\'re not good enough',
    'you\'re p a t h e t i c in a e s t h e t i c',
    'wordart, wordart everywhere'
  ]
}

const actions = {
  update: data => data,
  shake: d => (state, actions) => {
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
}

const view = (...args) => {
  const [ state, actions ] = args

  const { isShaking, result } = state
  const { shake } = actions

  return h('div', { class: 'app' }, [
    h('div', { class: 'app-box' }, [
      h('img', {
        class: isShaking && 'shake',
        src: 'favicon.png',
        onclick () {
          shake()
        }
      }),
      h('h1', null, isShaking ? 'shaking dat shit...' : result)
    ])
  ])
}

app(state, actions, view, document.body)
