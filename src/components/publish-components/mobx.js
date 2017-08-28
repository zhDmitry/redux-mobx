import universal from 'react-universal-component'
import React from 'react'

import Loading from '../Loading'
import NotFound from '../NotFound'

export default universal(props => import('./mobx-example/index'), {
  minDelay: 100,
  loading: Loading,
  error: NotFound
})
