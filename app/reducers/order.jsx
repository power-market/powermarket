import axios from 'axios'

// ACTION TYPES

const GET_ORDERS = 'GET_ORDERS'
const GET_ORDER = 'GET_ORDER'
const CREATE_ORDER = 'CREATE_ORDER'
const CANCEL_ORDER = 'CANCEL_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'

// ACTION CREATORS

export const getOrders = orders => ({ type: GET_ORDERS, orders })
export const getOrder = order => ({ type: GET_ORDER, order })
export const createOrder = order => ({ type: CREATE_ORDER, order })
export const cancelOrder = order => ({ type: CANCEL_ORDER, order })
export const updateOrder = order => ({ type: UPDATE_ORDER, order })

// THUNK CREATORS

export const fetchOrders = () => dispatch => {
  axios.get('/api/orders')
    .then(res => {
      dispatch(getOrders(res.data))
    })
    .catch(err => console.error('Fetching orders unsuccessful', err))
}
export const fetchOrder = (id) => dispatch => {
  axios.get(`/api/orders/${id}`)
     .then(res => dispatch(update(res.data)))
     .catch(err => console.error('Fetching order products unsuccessful', err));
};

// REDUCERS

const reducer = (orders = [], action) => {
  switch (action.type) {

    case GET_ORDERS:
      return action.orders
    case GET_ORDER:
      return action.order
    case CREATE_ORDER:
      return [action.order, ...orders]
    case CANCEL_ORDER:
      return orders.filter(order => order.id !== action.id)
    case UPDATE_ORDER:
      return orders.map(order => (
        action.order.id === order.id ? action.order : order
      ))

    default:
      return orders
  }
}

export default reducer