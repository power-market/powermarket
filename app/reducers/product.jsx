import axios from "axios";

const GET_PRODUCTS = "GET_PRODUCTS"

export const getProducts = (products) => {
    return {
        type: GET_PRODUCTS,
        products
    }
}

export default function reduce(products = [], action){
    switch(action.type){
        case GET_PRODUCTS:
            return action.products;
        default:
            return products;
    }
}
//thunk
export function fetchProducts(){
    return function(dispatch){
        axios.get('/api/product/')
        .then(res => res.data)
        .then((allProducts) => {
            var allTheProducts = fetchProducts(allProducts)
            console.log("ALL THE PRODUCTS -------------------------> ", allProducts);
            return dispatch(allTheProducts);
        })
    }
}

