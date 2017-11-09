import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPostDetails, votePost, editPost, deletePost } from '../actions/actions_posts'
import serializeForm from 'form-serialize'
import { timestampToDate } from '../utils/timestamp_date'


class IndividualPost extends Component {

  componentDidMount() {
    const currentPost = this.props.match.params.id
    this.props.getPostDetails(currentPost)
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

  render() {
    const { post } = this.props.posts
    return (
      <div>
        <Link to='/'><h4>Back to home</h4></Link>
        <div className="post-title">{ post.title }</div>
        <span>Posted on {timestampToDate(post.timestamp)} by {post.author} in {post.category}</span>
        <hr />
        <div className="post-body">{ post.body }</div>

        <div>{post.voteScore}/5 | <button onClick={() => this.changeVote(post.id, 'upVote')}>+</button> <button onClick={() => this.changeVote(post.id, 'downVote')}>-</button></div>


          <form id={post.id} onSubmit={this.updatePost} className="create-contact-form">
            <div className="create-contact-details">
              <input type="text" name="title" />
              <input type="text" name="body" />
              <button>Update Post</button>
            </div>
          </form>

          <button onClick={() => this.deleteThisPost(post.id)}>X</button>
      </div>
    )
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPostDetails, votePost, editPost, deletePost }, dispatch)
}

function mapStateToProps({ posts }) {
  return { posts }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualPost)




















//
