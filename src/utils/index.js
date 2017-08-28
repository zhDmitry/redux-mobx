export const pages = [
  'redux-init',
  'mobx-init',
  'mobx-batch',
  'redux-batch',
  'mobx-pure'
]

export const nextIndex = index => ++index % pages.length

export const indexFromPath = path => {
  path = path === '/' ? '/mobx-batch' : path
  return pages.indexOf(path.substr(1))
}
