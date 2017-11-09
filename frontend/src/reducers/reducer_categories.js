export default function reducer(state = {
  categories: [],
  fetching: false,
  fetched: false,
  error: null,
}, action) {
  switch(action.type) {
    case 'GET_ALL_CATEGORIES':
      return {...state, fetching: true}

    case "GET_ALL_CATEGORIES_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "GET_ALL_CATEGORIES_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        categories: action.payload
      }
    }
    default : {
      return state
    }
  }
}





















//
