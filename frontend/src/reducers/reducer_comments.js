export default function reducer(state = {
  posts: [],
  fetching: false,
  fetched: false,
  error: null,
}, action) {
  switch(action.type) {
    case 'GET_ALL_COMMENTS':
      return {...state, fetching: true}

    case "GET_ALL_COMMENTS_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "GET_ALL_COMMENTS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        posts: action.payload
      }
    }
    default : {
      return state
    }
  }
}





















//
