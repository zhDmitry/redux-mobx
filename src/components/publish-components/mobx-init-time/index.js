import React from 'react'
import { observer } from 'mobx-react'
import normalize from '../redux-init-example/normalize'
import { fakeData } from '../../fakeData'
import Store from '../mobx-example/store'

// console.log('qwer', Store)
// batch actions

class MobxExample extends React.Component {
  componentDidMount() {
    const storeData = normalize(fakeData).entities.elements

    console.time('[initTime] mobx store init')
    console.log(storeData)
    window.store = Store.create({ structure: storeData })
    console.timeEnd('[initTime] mobx store init')
  }
  state = {}

  render() {
    return <div>initTime mobx</div>
  }
}

export default MobxExample
