import React from 'react'
import universal from 'react-universal-component'
import styles from '../css/App'
import Loading from './Loading'
import data from './data.json'
import NotFound from './NotFound'
import { pages, nextIndex, indexFromPath } from '../utils'
import Mobx from './publish-components/mobx'

export const Element = universal(
  props => import(`./publish-components/${props.name}`),
  {
    minDelay: 100,
    loading: Loading,
    error: NotFound
  }
)

export default class App extends React.Component {
  render() {
    const { index, done, loading } = this.state
    const page = pages[index]
    const loadingClass = loading ? styles.loading : ''
    const buttonClass = `${styles[page]} ${loadingClass}`

    return (
      <div className={styles.container} style={{ background: 'white' }}>
        <button className={buttonClass} onClick={this.changePage}>
          Go to {pages[index + 1] || pages[0]}
        </button>
        {(data[page.toLowerCase()] || data.default)
          .map((el, i) => <Element key={i} name={el} />)}
      </div>
    )
  }

  constructor(props) {
    super(props)

    const { history } = props
    const index = indexFromPath(history.location.pathname)

    this.state = {
      index,
      loading: false,
      done: false,
      error: false
    }

    history.listen(({ pathname }) => {
      const index = indexFromPath(pathname)
      this.setState({ index })
    })
  }

  changePage = () => {
    if (this.state.loading) return

    const index = nextIndex(this.state.index)
    const page = pages[index]

    this.props.history.push(`/${page}`)
    this.setState({ index })
  }

  beforeChange = ({ isSync }) => {
    if (!isSync) {
      this.setState({ loading: true, error: false })
    }
  }

  afterChange = ({ isSync, isServer, isMount }) => {
    if (!isSync) {
      this.setState({ loading: false, error: false })
    }
    else if (!isServer && !isMount) {
      this.setState({ done: true, error: false })
    }
  }

  handleError = error => {
    this.setState({ error: true, loading: false })
  }

  buttonText() {
    const { loading, error } = this.state
    if (error) return 'ERROR'
    return loading ? 'LOADING...' : 'CHANGE PAGE'
  }
}
