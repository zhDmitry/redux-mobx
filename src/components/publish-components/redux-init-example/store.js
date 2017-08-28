import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { entityReducer } from './entities'

const identity = (d = {}) => d

const rootReducer = combineReducers({
  entities: entityReducer,
  result: identity
})

export default function configureStore(initialState) {
  const middleware = [thunk]

  // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
  let devToolsExtension = f => f
  if (process.env.BROWSER && window.devToolsExtension) {
    devToolsExtension = window.devToolsExtension()
  }

  const enhancer = compose(applyMiddleware(...middleware), devToolsExtension)

  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer)

  return store
}
