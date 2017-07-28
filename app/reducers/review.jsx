import axios from 'axios';

// REDUCERS

const reducer = (reviews = [], action) => {

  switch (action.type) {
    case ADD_REVIEW:
      return [action.review, ...reviews]
    case GET_REVIEWS:
      return action.reviews;
    case DELETE_REVIEW:
      return reviews.filter(reviews => reviews.id !== action.id)
    default:
      return reviews
  }
}

// ACTIONS
const ADD_REVIEW = 'ADD_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';
const GET_REVIEWS = 'GET_REVIEWS';

// ACTION-CREATORS

export const addReview = (review) => ({ type: ADD_REVIEW, review });
export const getReviews = (reviews) => ({ type: GET_REVIEWS, reviews })
export const deleteReview = (review) => ({ type: DELETE_REVIEW, review });

// Thunk

export const fetchReviews = (reviews) => {
  dispatch => {
    axios.get(`/api/reviews/`)
      .then(res => res.data)
      .then(reviews => {
        reviews.filter(() => { product_id })
        dispatch(getReview(reviews))
      })
  }
}
export const createNewReview = (review) => {
  return function(dispatch) {
    axios.post('api/reviews/', review)
      .then(res => res.data)
      .then(newReview => {
        dispatch(addReview(newReview))
      })
  }
}
export default reducer
