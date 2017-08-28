import React from 'react'
import { fakeData } from '../../fakeData'
import configureStore from './store'
import normalize from './normalize'

// console.log('qwer', Store)
// batch actions

class MobxExample extends React.Component {
  componentDidMount() {
    console.time('[initTime] redux store init')
    const store = configureStore(normalize(fakeData))
    console.timeEnd('[initTime] redux store init')
  }
  state = {}

  render() {
    return <div>initTime redux</div>
  }
}

export default MobxExample
