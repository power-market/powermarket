import axios from "axios";

const GET_ALL_ITEMS = "GET_ALL_ITEMS"

export const getAllItems = (products) => {
    return {
        type: GET_ALL_ITEMS,
        products
    }
}

export default function reduce(products = [], action){
    switch(action.type){
        case GET_ALL_ITEMS:
            return action.products;
        default:
            return products;
    }
}
//thunk
export function getThings(){
    return function(dispatch){
        axios.get('/api/product/')
        .then(res => res.data)
        .then((allProducts) => {
            var allTheProducts = getAllItems(allProducts)
            console.log("ALL THE PRODUCTS -------------------------> ", allProducts);
            return dispatch(allTheProducts);
        })
    }
}

