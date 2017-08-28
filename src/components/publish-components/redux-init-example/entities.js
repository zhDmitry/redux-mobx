export const SAY_HELLO = 'SAY_HELLO'

export const sayHello = id => ({
  type: SAY_HELLO,
  id
})

const dispatchToChildren = (dispatch, obj, state) => {
  obj.elements.forEach(el => {
    dispatch(sayHello(el))
    if (state[el].elements) {
      dispatchToChildren(dispatch, state[el], state)
    }
  })
}

export const sayHelloAction = id => (dispatch, getState) => {
  const state = getState()
  const entity = state.entities.elements[id]
  dispatch(sayHello(id))
  dispatchToChildren(dispatch, entity, state.entities.elements)
}

export const entityReducer = (initialState = {}, action) => {
  switch (action.type) {
    case SAY_HELLO:
      const el = initialState.elements[action.id]
      return {
        ...initialState,
        elements: {
          ...initialState.elements,
          [action.id]: { ...el, done: true }
        }
      }
    default:
      return initialState
  }
}
