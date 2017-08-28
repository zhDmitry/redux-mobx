import { normalize, schema } from 'normalizr'

const elements = new schema.Entity('elements')

elements.define({
  elements: new schema.Array(elements)
})

export default data => {
  const result = normalize(data, elements)
  return result
}
