import * as PostsAPI from '../utils/api'

export function getAllCategories () {
  return function(dispatch) {
    dispatch({type: 'GET_ALL_CATEGORIES'})
    PostsAPI.getCategories()
      .then((response) => {
        dispatch({type: 'GET_ALL_CATEGORIES_FULFILLED', payload: response})
      })
      .catch((err) => {
        dispatch({type: 'GET_ALL_CATEGORIES_REJECTED', payload: err})
      })
  }
}
