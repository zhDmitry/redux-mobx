import { types, getParent } from 'mobx-state-tree'

const Structure = types
  .model('Structure', {
    id: types.string,
    elements: types.array(types.string),
    done: types.maybe(types.boolean)
  })
  .actions(self => ({
    getParent() {
      return getParent(self)
    },
    sayHello() {
      if (self.elements.length > 0) {
        self.elements.forEach(el => {
          el.sayHello()
        })
        if (self.id === 'root') {
          console.log('done')
        }
        self.done = true
      }
    }
  }))

const Store = types.model('Store', {
  structure: types.map(Structure)
})

export default Store
