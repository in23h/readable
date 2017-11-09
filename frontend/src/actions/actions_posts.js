import * as PostsAPI from '../utils/api'

export function getAllPosts () {
  return dispatch => {
    dispatch({type: 'GET_ALL_POSTS'})
    PostsAPI.getPosts()
      .then((response) => {
        dispatch({type: 'GET_ALL_POSTS_FULFILLED', payload: response})
      })
      .catch((err) => {
        dispatch({type: 'GET_ALL_POSTS_REJECTED', payload: err})
      })
  }
}

export function getPostsByCategory (category) {
  return dispatch => {
    dispatch({type: 'GET_POSTS_BY_CATEGORY'})
    PostsAPI.getPostsByCategory(category)
      .then((response) => {
        dispatch({type: 'GET_POSTS_BY_CATEGORY_FULFILLED', payload: response})
      })
      .catch((err) => {
        dispatch({type: 'GET_POSTS_BY_CATEGORY_REJECTED', payload: err})
      })
  }
}

export function addPost (post) {
  return dispatch => {
    dispatch({type: 'ADD_POST'})
    PostsAPI.addPost(post)
      .then((response) => {
        dispatch({type: 'ADD_POST_FULFILLED', payload: response})
      })
      .catch((err) => {
        dispatch({type: 'ADD_POST_REJECTED', payload: err})
      })
  }
}

export function getPostDetails (postID) {
  return dispatch => {
    dispatch({type: 'GET_POST_DETAILS'})
    PostsAPI.getPostDetails(postID)
      .then((response) => {
        dispatch({type: 'GET_POST_DETAILS_FULFILLED', payload: response})
      })
      .catch((err) => {
        dispatch({type: 'GET_POST_DETAILS_REJECTED', payload: err})
      })
  }
}

export function editPost (post) {
  return dispatch => {
    dispatch({type: 'EDIT_POST'})
    PostsAPI.editPost(post)
      .then((response) => {
        dispatch({type: 'EDIT_POST_FULFILLED', payload: response})
      })
      .catch((err) => {
        dispatch({type: 'EDIT_POST_REJECTED', payload: err})
      })
  }
}

export function votePost (postID, option) {
  return dispatch => {
    dispatch({type: 'VOTE_POST'})
    PostsAPI.votePost(postID, option)
      .then((response) => {
        dispatch({type: 'VOTE_POST_FULFILLED', payload: {postID, option: option.option}})
      })
      .catch((err) => {
        dispatch({type: 'VOTE_POST_REJECTED', payload: err})
      })
  }
}

export function deletePost (postID) {
  return dispatch => {
    dispatch({type: 'DELETE_POST'})
    PostsAPI.deletePost(postID)
      .then((response) => {
        dispatch({type: 'DELETE_POST_FULFILLED', payload: response})
      })
      .catch((err) => {
        dispatch({type: 'DELETE_POST_REJECTED', payload: err})
      })
  }
}
















//
