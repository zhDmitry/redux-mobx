import { observable, action } from 'mobx'

class ElementStore {
  elements
  constructor({ elements }) {
    this.elements = observable.array(elements)
    this.reactiveData = observable.map({ color: 'red' })
  }

  setColor(color) {
    this.reactiveData.set('color', color)
  }
}

class Store {
  constructor(data) {
    this.structure = observable.map({})
    this.batchAdd(data)
  }

  @action
  batchAdd = data => {
    this.structure.merge(
      Object.keys(data).reduce((acc, el) => {
        acc[el] = new ElementStore(data[el])
        return acc
      }, {})
    )
  }
}

export default Store
