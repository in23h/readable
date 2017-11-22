import { combineReducers } from 'redux'
import categories from './reducer_categories'
import posts from './reducer_posts'
import comments from './reducer_comments'

export default combineReducers({
  categories,
  posts,
  comments
})
