import _ from 'lodash'
import uuid from 'uuid'

const getFakeData = num => {
  if (!num) {
    return []
  }

  return _.times(5).map(el => ({
    id: uuid(),
    elements: getFakeData(num - 1)
  }))
}
export const fakeData = {
  id: 'root',
  elements: getFakeData(4)
}
