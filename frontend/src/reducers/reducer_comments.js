export default function reducer(state = {
  comments: [],
  comment: {},
  fetching: false,
  fetched: false,
  posting: false,
  posted: false,
  voting: false,
  voted: false,
  updating: false,
  updated: false,
  deleting: false;
  deleted: false;
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
        comments: action.payload
      }
    }

    case 'ADD_COMMENT': {
      return {...state, posting: true}
    }

    case 'ADD_COMMENT_REJECTED': {
      return {...state, posting: false, error: action.payload}
    }

    case 'ADD_COMMENT_FULFILLED': {
      return {
        ...state,
        posting: false,
        posted: true,
        comments: [...state.comments, action.payload]
      }
    }

    case 'EDIT_COMMENT': {
      return {...state, updating: true}
    }

    case 'EDIT_COMMENT_REJECTED': {
      return {...state, updating: false, error: action.payload}
    }

    case 'EDIT_COMMENT_FULFILLED': {
      const { id } = action.payload
      const newComments = [...state.comments]
      const commentToUpdate = newComments.findIndex(comment => comment.id === id)
      newComments[commentToUpdate] = action.payload

      return {
        ...state,
        updating: false,
        updated: true,
        comments: newComments,
        comment: newComments[commentToUpdate]
      }
    }

    case 'DELETE_COMMENT': {
      return {...state, deleting: true}
    }

    case 'DELETE_COMMENT_REJECTED': {
      return {...state, deleting: false, error: action.payload}
    }

    case 'DELETE_COMMENT_FULFILLED': {
      console.log('payload:', action.payload)
      return {
        ...state,
        deleting: false,
        deleted: true,
        comments: state.comments.filter(comment => comment.id !== action.payload.id)
      }
    }

    case 'VOTE_COMMENT': {
      return {...state, voting: true}
    }

    case 'VOTE_COMMENT_REJECTED': {
      return {...state, voting: false, error: action.payload}
    }

    case 'VOTE_COMMENT_FULFILLED': {
      const { commentID, option } = action.payload
      const voteAmount = option === 'upVote' ? 1 : -1
      console.log('all state:', state.posts)

      let allComments = [...state.comments] || ''
      let commentToUpdate = ''
      let singleComment = state.comment || ''
      if(state.comments.length > 1) {
        commentToUpdate = allComments.findIndex(comment => comment.id === commentID)
        allComments[commentToUpdate].voteScore += voteAmount
      }
      if(singleComment !== '') {
        singleComment.voteScore += voteAmount
      }
      return {
        ...state,
        voting: false,
        voted: true,
        comments: allComments,
        comment: singleComment
      }

    }

    default : {
      return state
    }
  }
}





















//
