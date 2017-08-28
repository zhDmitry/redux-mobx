import React from 'react'
import { observer } from 'mobx-react'

import Store from './store'
import { fakeData } from '../../fakeData'

const store = Store.create(fakeData)

class MobxExample extends React.Component {
  componentDidMount() {
    window.store = store
  }
  state = {}
  sayHello = () => {
    console.time('batch action start')
    store.sayHello()
  }
  render() {
    console.log('[batchActions] render', store.toJSON())
    console.timeEnd('batch action start')

    return (
      <div>
        <button onClick={this.sayHello}>
          Say Hello {store.done ? 'done' : ''}
        </button>{' '}
        <div style={{ display: 'none' }}>{JSON.stringify(store.toJSON())}</div>
      </div>
    )
  }
}

export default observer(MobxExample)
