import { combineReducers } from 'redux'
import categories from './reducer_categories'
import posts from './reducer_posts'

export default combineReducers({
  categories,
  posts
})
