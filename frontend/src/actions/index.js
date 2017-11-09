import * as PostsAPI from '../utils/api'

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY'
export const GET_POST_DETAILS = 'GET_POST_DETAILS'
export const GET_COMMENTS_BY_POST = 'GET_COMMENTS_BY_POST'
export const GET_COMMENT_DETAILS = 'GET_COMMENT_DETAILS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export function getAllCategories () {
  const allCategories = PostsAPI.getCategories()
  return {
    type: GET_ALL_CATEGORIES,
    payload: allCategories
  }
}

export function getAllPosts () {
  return {
    type: GET_ALL_POSTS,
    payload: PostsAPI.getPosts()
  }
}

export function getPostsByCategory (category) {
  return {
    type: GET_POSTS_BY_CATEGORY,
    payload: PostsAPI.getPostsByCategory(category)
  }
}

export function getPostDetails (postId) {
  return {
    type: GET_POST_DETAILS,
    postId
  }
}

export function getCommentsByPost (postId) {
  return {
    type: GET_COMMENTS_BY_POST,
    postId
  }
}

export function getCommentDetails (commentId) {
  return {
    type: GET_COMMENT_DETAILS,
    commentId
  }
}

export function addPost (post) {
  return {
    type: ADD_POST,
    post
  }
}

export function editPost (post) {
  return {
    type: EDIT_POST,
    post
  }
}

export function deletePost (postId) {
  return {
    type: DELETE_POST,
    postId
  }
}

export function votePost (postId) {
  return {
    type: VOTE_POST,
    postId
  }
}

export function addComment (comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function editComment (comment) {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

export function deleteComment (commentId) {
  return {
    type: DELETE_COMMENT,
    commentId
  }
}

export function voteComment (commentId) {
  return {
    type: VOTE_COMMENT,
    commentId
  }
}




















//
