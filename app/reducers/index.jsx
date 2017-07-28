import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  products: require('./product').default,
  review: require('./review').default
})

export default rootReducer
