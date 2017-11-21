import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPostDetails, votePost, editPost, deletePost } from '../actions/actions_posts'
import serializeForm from 'form-serialize'
import { timestampToDate } from '../utils/timestamp_date'
import Header from './Header'
import Modal from 'react-modal'
import CloseIcon from 'react-icons/lib/fa/close'
import PlusCircleIcon from 'react-icons/lib/fa/plus-circle'
import Comments from './Comments'


class IndividualPost extends Component {

  state = {
    editPostModalOpen: false
  }

  componentDidMount() {
    if(this.props.match.params.edit) {
      this.openEditPostModal()
    }

    const currentPost = this.props.match.params.id
    this.props.getPostDetails(currentPost)
  }

  openEditPostModal = () => this.setState(() => ({ editPostModalOpen: true }))
  closeEditPostModal = () => this.setState(() => ({ editPostModalOpen: false }))

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
    const { editPostModalOpen } = this.state
    return (
      <div>
        <Header />

        <section>
          

          <div className="post-header">
            <div className="post-title"><h1>{ post.title }</h1></div>
          </div>


          <div className="post-content">

            <div className="post-metadata">
              Posted by <span className="post-author">{post.author}</span> in {post.category}

              <div className="post-time">{timestampToDate(post.timestamp)}</div>
            </div>

            <div className="post-body">{ post.body }</div>

          </div>

          <div className="post-vote">
            Current score: {post.voteScore} | Vote: <button onClick={() => this.changeVote(post.id, 'upVote')}>+</button>  <button onClick={() => this.changeVote(post.id, 'downVote')}>-</button>
          </div>

          <div className="post-admin">
            <button className="btn-post-edit" onClick={() => this.openEditPostModal()}>Edit</button>
            <button className="btn-post-del" onClick={() => this.deleteThisPost(post.id)}>Delete</button>
          </div>

        </section>

        <section id="comments">

          <Comments thepostid={ post.id } />
        </section>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={editPostModalOpen}
          onRequestClose={this.closeEditPostModal}
          contentLabel='Modal'
        >

          <button onClick={() => this.closeEditPostModal()} className='icon-btn post-close'><CloseIcon size={30}/></button>

          <form id={post.id} onSubmit={this.updatePost} className="create-contact-form">
            <div className="create-contact-details">
              <input type="text" name="title" value={post.title} />
              <textarea name="body" value={post.body} />
              <button>Update Post</button>
            </div>
          </form>

        </Modal>

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
