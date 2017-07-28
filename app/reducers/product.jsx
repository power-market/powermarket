import axios from 'axios'

const GET_PRODUCTS = "GET_PRODUCTS"
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const WRITE_PRODUCT = 'WRITE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const GET_PRODUCT = 'GET_PRODUCT'

export const getProducts = products => ({ type: GET_PRODUCTS, products })
export const getProduct = product => ({ type: GET_PRODUCT, product })

// thunk
export const getThings = () => dispatch => {
    axios.get('/api/products')
        .then(res => res.data)
        .then(products => {
            const action = getProducts(products)
            dispatch(action)
        })
}

export default function reduce(products = [], action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return action.products
        default:
            return products
    }
}
