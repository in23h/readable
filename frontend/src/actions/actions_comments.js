import * as PostsAPI from '../utils/api'

export function getCommentsFromPost (postID) {
  return dispatch => {
    dispatch({type: 'GET_ALL_COMMENTS'})
    PostsAPI.getCommentsFromPost(postID)
      .then((response) => {
        dispatch({type: 'GET_ALL_COMMENTS_FULFILLED', payload: response})
      })
      .catch((err) => {
        dispatch({type: 'GET_ALL_COMMENTS_REJECTED', payload: err})
      })
  }
}

export function addComment (comment) {
  return dispatch => {
    dispatch({type: 'ADD_COMMENT'})
    PostsAPI.addComment(comment)
      .then((response) => {
        dispatch({type: 'ADD_COMMENT_FULFILLED', payload: response})
      })
      .catch((err) => {
        dispatch({type: 'ADD_COMMENT_REJECTED', payload: err})
      })
  }
}

export function editComment (comment) {
  return dispatch => {
    dispatch({type: 'EDIT_COMMENT'})
    PostsAPI.editComment(comment)
      .then((response) => {
        dispatch({type: 'EDIT_COMMENT_FULFILLED', payload: response})
      })
      .catch((err) => {
        dispatch({type: 'EDIT_COMMENT_REJECTED', payload: err})
      })
  }
}

export function voteComment (commentID, option) {
  return dispatch => {
    dispatch({type: 'VOTE_COMMENT'})
    PostsAPI.voteComment(commentID, option)
      .then((response) => {
        dispatch({type: 'VOTE_COMMENT_FULFILLED', payload: {commentID, option: option.option}})
      })
      .catch((err) => {
        dispatch({type: 'VOTE_COMMENT_REJECTED', payload: err})
      })
  }
}

export function deletePost (commentID) {
  return dispatch => {
    dispatch({type: 'DELETE_COMMENT'})
    PostsAPI.deletePost(commentID)
      .then((response) => {
        dispatch({type: 'DELETE_COMMENT_FULFILLED', payload: response})
      })
      .catch((err) => {
        dispatch({type: 'DELETE_COMMENT_REJECTED', payload: err})
      })
  }
}
