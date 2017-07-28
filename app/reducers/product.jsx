import axios from 'axios'

/* **************** ACTION TYPES ************** */

const GET_PRODUCTS = 'GET_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

/* **************** ACTION CREATORS ************** */

export const getProducts = products => ({ type: GET_PRODUCTS, products })
export const createProduct = product => ({ type: CREATE_PRODUCT, product })
export const removeProduct = id => ({ type: REMOVE_PRODUCT, id })
export const updateProduct = product => ({ type: UPDATE_PRODUCT, product })

/* **************** THUNK CREATORS ************** */

export const fetchProducts = () => dispatch => {
    axios.get('/api/products')
        .then(res => {
            const action = getProducts(res.data)
            dispatch(action)
        })
        .catch(err => console.error(`Fetching products unsuccessful`, err))
}

export const addProduct = product => dispatch => {
    axios.post('/api/products', product)
        .then(res => {
            const action = createProduct(res.data)
            dispatch(action);
        })
        .catch(err => console.error(`Creating product: ${product} unsuccessful`, err))
}

export const deleteProduct = id => dispatch => {
    const action = removeProduct(id)
    dispatch(action)
    axios.delete(`/api/products/${id}`)
        .catch(err => console.error(`Removing product: ${id} unsuccessful`, err));
}

export const changeProduct = (id, product) => dispatch => {
    axios.put(`/api/products/${id}`, product)
        .then(res => {
            const action = updateProduct(res.data)
            dispatch(action)
        })
        .catch(err => console.error(`Updating product: ${product} unsuccessful`, err))
}

/* **************** REDUCER ************** */

const reducer = (products = [], action) => {

    switch (action.type) {

        case GET_PRODUCTS:
            return action.products

        case CREATE_PRODUCT:
            return [action.product, ...products]

        case REMOVE_PRODUCT:
            return products.filter(product => product.id !== action.id)

        case UPDATE_PRODUCT:
            return products.map(product => (
                action.product.id === product.id ? action.product : product
            ))

        default:
            return products
    }
}

export default reducer
