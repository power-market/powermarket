import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  products: require('./product').default,
  order: require('./order').default,
  search: require('./search').default,
  reviews: require('./review').default,
  users: require('./users').default
})

export default rootReducer
