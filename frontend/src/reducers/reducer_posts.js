export default function reducer(state = {
  posts: [],
  post: {},
  fetching: false,
  fetched: false,
  posting: false,
  posted: false,
  voting: false,
  voted: false,
  updating: false,
  updated: false,
  deleting: false,
  deleted: false,
  error: null,
}, action) {
  switch(action.type) {
    case 'GET_ALL_POSTS':
      return {...state, fetching: true}

    case 'GET_ALL_POSTS_REJECTED': {
      return {...state, fetching: false, error: action.payload}
    }
    case 'GET_ALL_POSTS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        posts: action.payload
      }
    }

    case 'GET_POSTS_BY_CATEGORY':
      return {...state, fetching: true}

    case 'GET_POSTS_BY_CATEGORY_REJECTED': {
      return {...state, fetching: false, error: action.payload}
    }
    case 'GET_POSTS_BY_CATEGORY_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        posts: action.payload
      }
    }

    case 'GET_POST_DETAILS':
      return {...state, fetching: true}

    case 'GET_POST_DETAILS_REJECTED': {
      return {...state, fetching: false, error: action.payload}
    }
    case 'GET_POST_DETAILS_FULFILLED': {

      console.log('payload:', action.payload)
      return {
        ...state,
        fetching: false,
        fetched: true,
        post: action.payload
      }
    }

    case 'ADD_POST': {
      return {...state, posting: true}
    }

    case 'ADD_POST_REJECTED': {
      return {...state, posting: false, error: action.payload}
    }

    case 'ADD_POST_FULFILLED': {
      return {
        ...state,
        posting: false,
        posted: true,
        posts: [...state.posts, action.payload]
      }
    }

    case 'EDIT_POST': {
      return {...state, updating: true}
    }

    case 'EDIT_POST_REJECTED': {
      return {...state, updating: false, error: action.payload}
    }

    case 'EDIT_POST_FULFILLED': {
      const { id } = action.payload
      const newPosts = [...state.posts]
      const postToUpdate = newPosts.findIndex(post => post.id === id)
      newPosts[postToUpdate] = action.payload

      return {
        ...state,
        updating: false,
        updated: true,
        posts: newPosts,
        post: newPosts[postToUpdate]
      }
    }

    case 'DELETE_POST': {
      return {...state, deleting: true}
    }

    case 'DELETE_POST_REJECTED': {
      return {...state, deleting: false, error: action.payload}
    }

    case 'DELETE_POST_FULFILLED': {
      console.log('payload:', action.payload)
      return {
        ...state,
        deleting: false,
        deleted: true,
        posts: state.posts.filter(post => post.id !== action.payload.id)
      }
    }

    case 'VOTE_POST': {
      return {...state, voting: true}
    }

    case 'VOTE_POST_REJECTED': {
      return {...state, voting: false, error: action.payload}
    }

    case 'VOTE_POST_FULFILLED': {
      const { postID, option } = action.payload
      const voteAmount = option === 'upVote' ? 1 : -1
      console.log('all state:', state.posts)

      let allPosts = [...state.posts] || ''
      let postToUpdate = ''
      let singlePost = state.post || ''
      if(state.posts.length > 1) {
        postToUpdate = allPosts.findIndex(post => post.id === postID)
        allPosts[postToUpdate].voteScore += voteAmount
      }
      if(singlePost !== '') {
        singlePost.voteScore += voteAmount
      }
      return {
        ...state,
        voting: false,
        voted: true,
        posts: allPosts,
        post: singlePost
      }

    }



    default : {
      return state
    }
  }
}





















//
