import axios from 'axios'

export const GET_SEARCHED_PRODUCTS = "GET_SEARCHED_PRODUCTS"

export const getSearchedProducts = (searchedProducts) => {
  return {
    type: GET_SEARCHED_PRODUCTS,
    searchedProducts
  }
}
export default function reducer(allSearched = [], action) {
  switch (action.type) {
    case GET_SEARCHED_PRODUCTS:
      return action.searchedProducts
    default:
      return allSearched
  }
}
//get all Products - Unfilitered
export const unfilteredProducts = () => dispatch => {
  axios.get('/api/products')
    .then(res => res.data)
    .then(products => {
      const action = getUnfilteredProducts(products)
      dispatch(action)
    })
}
//change Products
export const filterProducts = (searchedItem) => dispatch => {
  axios.get("/api/products")
    .then(res => res.data)
    .then(products => {
      var filteredProducts = []
      products.forEach(eachProduct => {
        console.log(eachProduct) //KH/ET: KEEP CONSOLE.LOGS OUT OF MASTER!
        if (eachProduct.name.includes(searchedItem) && searchedItem.length > 1)
          filteredProducts.push(eachProduct)
      })
      const action = getSearchedProducts(filteredProducts)
      dispatch(action)
    })
}
