import universal from 'react-universal-component'
import Loading from '../Loading'
import NotFound from '../NotFound'

export default universal(props => import(`./${props.name}`), {
  minDelay: 1200,
  loading: Loading,
  error: NotFound
})
