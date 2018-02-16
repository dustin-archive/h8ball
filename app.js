
const { h, app } = hyperapp // eslint-disable-line

// helpers
const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

const state = {
  result: 'yo playur, shake dat shiiit',
  answers: [
    '404',
    'do you hate your life?',
    'nope sorry',
    'o boi',
    'siiigh',
    'spicy bois got chu',
    'the spicy bois have sealed yer fate',
    'WASTED',
    'YOU\'RE GARBAGE'
  ]
}

const actions = {
  update: data => data,
  shake: d => (state, actions) => {
    const { answers } = state

    actions.update({ isShaking: true })

    setTimeout(() => {
      actions.update({
        result: answers[getRandomInt(answers.length - 1)]
      })

      actions.update({ isShaking: false })
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
