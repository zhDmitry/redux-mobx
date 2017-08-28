import React from 'react'
import { Provider, connect } from 'react-redux'

import { fakeData } from '../../fakeData'
import configureStore from '../redux-init-example/store'
import normalize from '../redux-init-example/normalize'
import { sayHelloAction } from '../redux-init-example/entities'

// console.log('qwer', Store)
// batch actions
const store = configureStore(normalize(fakeData))

class MobxExample extends React.Component {
  componentDidMount() {
    window.store = store
  }
  state = {}
  sayHello = () => {
    console.time('[Redux batch actions]')
    this.props.dispatch(sayHelloAction('root'))
  }

  render() {
    const state = this.props.entities
    console.log('render')
    console.timeEnd('[Redux batch actions]')
    return (
      <div>
        <button onClick={this.sayHello}>Say Hello</button>{' '}
        <div style={{ display: 'none' }}>{JSON.stringify(state)}</div>
      </div>
    )
  }
}
const MobxExampleEnhanced = connect(state => ({ entities: state.entities }))(
  MobxExample
)

export default () =>
  <Provider store={store}>
    <MobxExampleEnhanced />
  </Provider>
