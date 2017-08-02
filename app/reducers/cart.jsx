import axios from 'axios'

export const GET_ALL_ITEMS = "GET_ALL_ITEMS"

export const ADD_ITEM = "ADD_ITEM"


export const getAllItems = (allItems) => {
  return {
    type: GET_ALL_ITEMS,
    allItems
  }
}
export const addItem = (item) => {
    return {
        type: ADD_ITEM,
        item
    }
}

export default function reducer(allItems = [], action) {
  switch (action.type) {
    case GET_ALL_ITEMS:
      return action.allItems
    case ADD_ITEM:
      return [action.item, ...allItems]
    default:
      return allItems
  }
}
export const allProductsInCart = () => dispatch => {
axios.get(`/api/cartItem/user/`)
    .then(res => res.data)
    .then(entireCart => {
      console.log("All Items in the Cart ===========> ", entireCart)
      const thingsInCart = getAllItems(entireCart)
      dispatch(thingsInCart)
    })
}
export const addProduct = (quantity, itemId) => dispatch => { //change this from itemId to item
    axios.post(`/api/cartItem/user/`, {quantity: quantity, itemId: itemId}) 
    .then(res => res.data)
    .then(addedItem => {
        console.log("REACHEDDDDDDDDDDDD")
        console.log("Added Item ========>", addedItem)
        const newItem = addItem(addedItem)
        dispatch(newItem)
    })
}
//change Products

