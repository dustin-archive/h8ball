
const { h, app } = hyperapp // eslint-disable-line

// helpers
const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

const EightBall = {
  state: {
    result: 'yo playur, shake dat shii',
    answers: [
      '404',
      'The spicy bois have sealed yer fate',

      'YOU\'RE GARBAGE',
      'Nope Sorry',
      'o boi',
      'WASTED',

      'Spicy bois got chu.',
      'Yup'
    ]
  },
  actions: {
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
}

const state = {
  EightBall: EightBall.state
}

const actions = {
  EightBall: EightBall.actions
}

const view = (...args) => {
  const [ state, actions ] = args

  return h('div', { class: 'app' }, [
    h('div', { class: 'app-box' }, [

      h('img', {
        class: state.EightBall.isShaking && 'shake',
        src: 'favicon.png'
      }),

      h('h1', null, state.EightBall.isShaking ? 'shaking dat...' : state.EightBall.result),

      h('div', {
        class: 'button',
        onclick () {
          actions.EightBall.shake()
        }
      }, 'shake dat')
    ])
  ])
}

app(state, actions, view, document.body)
