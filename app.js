
const { h, app } = hyperapp // eslint-disable-line

const { floor, random } = Math

const randomInt = max => floor(random() * floor(max))

const state = {
  result: 'yo playur, shake dat shiiit',
  answers: [
    '404',
    'do you hate your life?',
    'nope sorry',
    'o boi',
    'siiigh',
    'spicy bois ain\'t got chu',
    'the spicy bois have sealed yer fate',
    'WASTED',
    'YOU\'RE GARBAGE',
    'no one likes you',
    'sorry, what?'
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

  return h('div', { class: 'app' }, [
    h('div', { class: 'app-box' }, [
      h('img', {
        class: state.isShaking && 'shake',
        src: 'favicon.png',
        onclick () {
          actions.shake()
        }
      }),
      h('h1', null, state.isShaking ? 'shaking dat...' : state.result)
    ])
  ])
}

app(state, actions, view, document.body)
