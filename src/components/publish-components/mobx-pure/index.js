import React from 'react'
import { observer } from 'mobx-react'

import { fakeData } from '../../fakeData'
import normalize from '../redux-init-example/normalize'
import Store from './store'

// console.log('qwer', Store)
// batch actions

@observer
class MobxExample extends React.Component {
  componentWillMount() {
    const storeData = normalize(fakeData).entities.elements
    this.store = new Store(storeData)
    this.first = this.store.structure.keys()[0]
    console.log()
  }
  state = {}
  sayHello = () => {
    console.time('[Redux batch actions]')
    this.store.structure.get(this.first).setColor(Math.random())
  }

  render() {
    const state = this.props.entities
    console.log(this.store.structure.toJS())
    return (
      <div>
        {JSON.stringify(
          this.store.structure.get(this.first).reactiveData.toJS()
        )}
        <button onClick={this.sayHello}>Say Hello</button>{' '}
      </div>
    )
  }
}
export default MobxExample
