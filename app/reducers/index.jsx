import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  products: require('./product').default,
  reviews: require('./review').default
})

export default rootReducer
