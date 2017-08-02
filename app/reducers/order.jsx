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
  axios.get(`/api/orders/${id}/products`)
     .then(res => {
       dispatch(getOrder(res.data))
     })
     .catch(err => console.error('Fetching order products unsuccessful', err));
};
export const removeOrder = (id) => dispatch => {
  axios.put(`/api/orders/${id}`, {status: 'cancelled'})
     .then(res => {
       return axios.get(`/api/orders/${id}`)
     })
     .then(() => dispatch(getOrder(id)))
     .catch(err => console.error('Fetching order products unsuccessful', err));
};
export const fetchOrderPoducts = (id) => dispatch => {
  axios.get(`/api/orders/${id}/products`)
     .then(res => {
       dispatch(getOrder(res.data))
     })
     .catch(err => console.error('Fetching order products unsuccessful', err));
};

// INITIAL STATE

const initialState = {
  allOrders: [],
  selectedOrder: {
    id: null
  }
}
// REDUCERS

//initial state that is an object that has allOrders and selectedOrder on it
// returning an object always (remember object.assign)
// state.orders.allOrders
const reducer = (state = initialState, action) => { // rename orders param to 'state' and initialize it with an initialState variable
  const newState = Object.assign({}, state)

  switch (action.type) {

    case GET_ORDERS:
      newState.allOrders = action.orders
      break;
    case GET_ORDER:
      newState.selectedOrder = action.order
      break;
    case CREATE_ORDER:
      newState.allOrders = [action.order, ...state.allOrders]
      break;
    case CANCEL_ORDER:
      newState.allOrders.filter(order => state.selectedOrder.id !== action.id)
      break;
    case UPDATE_ORDER:
      newState.allOrders.map(order => (
        action.order.id === order.id ? action.order : order
      ))

    default:
      return state // new default would be return state
  }
  return newState
}

export default reducer