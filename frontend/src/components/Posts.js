import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllPosts, addPost, votePost, editPost, getPostsByCategory, deletePost } from '../actions/actions_posts'
import uuidv1 from 'uuid/v1'
import serializeForm from 'form-serialize'
import { timestampToDate } from '../utils/timestamp_date'
import sortBy from 'sort-by'

class Posts extends Component {

  state = {
    sortingMethod: '-voteScore'
  }

  componentDidMount() {
    let currentCategory = ''
    if(this.props.match) {
      currentCategory = this.props.match.params.category
    }
    currentCategory === '' ? this.props.getAllPosts() : this.props.getPostsByCategory(currentCategory)
  }


  addNewPost = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true})

    const newPost = {
      id: uuidv1(),
      timestamp: Date.now(),
      title: values.title,
      body: values.body,
      author: values.author,
      category: values.category
    }
    this.props.addPost(newPost)
  }

  updatePost = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true})

    const updatedPost = {
      id: e.target.id,
      title: values.title,
      body: values.body,
    }
    this.props.editPost(updatedPost)
  }

  changeVote = (postID, vote) => {
    const option = {
      option: vote
    }
    console.log('postID:', postID)
    console.log('vote:', option)
    this.props.votePost(postID, option)
  }

  deleteThisPost = (postID) => {
    this.props.deletePost(postID)
  }

  changeSort = (sortingMethod) => {
    if(sortingMethod === 'voteScore') {
      this.state.sortingMethod === 'voteScore' ? this.setState({sortingMethod: `-${sortingMethod}`}) : this.setState({sortingMethod})
    } else if(sortingMethod === 'timestamp') {
      this.state.sortingMethod === 'timestamp' ? this.setState({sortingMethod: `-${sortingMethod}`}) : this.setState({sortingMethod})
    }
  }

  render() {
    const { posts } = this.props.posts
    posts.sort(sortBy(this.state.sortingMethod, 'title'))
    return (
      <div className="posts">
        <h1>Posts</h1>
        <div className="sortBy">
          Sort by:
          <button onClick={() => this.changeSort('voteScore')} className="selected">Most votes</button>
          <button onClick={() => this.changeSort('timestamp')} className="">Date posted</button>
        </div>
        <ul>
        {posts !== '' && posts.map((post) => (
          <li key={post.id}>
            <Link to={'/posts/'+post.id}><h4>{post.title}</h4></Link>
            <span className="metadata">Posted on {timestampToDate(post.timestamp)} by {post.author} in <Link to={'/'+post.category+'posts'}>{post.category}</Link></span>
            <div>Current vote: {post.voteScore} | <button onClick={() => this.changeVote(post.id, 'upVote')}>Vote Up</button> <button onClick={() => this.changeVote(post.id, 'downVote')}>Vote Down</button></div>


              <form id={post.id} onSubmit={this.updatePost} className="create-contact-form">
                <div className="create-contact-details">
                  <input type="text" name="title" />
                  <input type="text" name="body" />
                  <button>Update Post</button>
                </div>
              </form>

              <button>Edit Post</button>
              <button onClick={() => this.deleteThisPost(post.id)}>Delete</button>


          </li>
        ))}
        </ul>

        <form onSubmit={this.addNewPost} className="create-contact-form">

          <div className="create-contact-details">
            <input type="text" name="title" placeholder="Title" />
            <input type="text" name="body" placeholder="Body" />
            <input type="text" name="author" placeholder="Author" />
            <input type="text" name="category" placeholder="Category" />
            <button>Add Post</button>
          </div>
        </form>

      </div>
    )
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllPosts, addPost, votePost, editPost, getPostsByCategory, deletePost }, dispatch)
}

function mapStateToProps({ posts }) {
  return { posts }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)













//
