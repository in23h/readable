import React, { Component } from 'react'
import { getCommentsFromPost, addComment, voteComment, editComment, deleteComment } from '../actions/actions_comments'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import uuidv1 from 'uuid/v1'
import serializeForm from 'form-serialize'
import { timestampToDate } from '../utils/helpers'
import Modal from 'react-modal'
import CloseIcon from 'react-icons/lib/fa/close'
import PlusCircleIcon from 'react-icons/lib/fa/plus-circle'

class Comments extends Component {

  state = {
    addCommentModalOpen: false,
    editCommentModalOpen: false,
    currentCommentID: '',
    currentCommentBody: '',
  }

  componentDidMount() {
    this.props.getCommentsFromPost(this.props.thepostid)
  }


  openAddCommentModal = () => this.setState(() => ({ addCommentModalOpen: true }))
  closeAddCommentModal = () => this.setState(() => ({ addCommentModalOpen: false }))

  openEditCommentModal = (commentID, commentBody) => this.setState(() => ({
    currentCommentID: commentID,
    currentCommentBody: commentBody,
    editCommentModalOpen: true
  }))
  closeEditCommentModal = () => this.setState(() => ({ editCommentModalOpen: false }))

  addNewComment = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true})

    const newComment = {
      id: uuidv1(),
      parentId: this.props.thepostid,
      timestamp: Date.now(),
      body: values.body,
      author: values.author,
    }
    this.closeAddCommentModal()
    this.props.addComment(newComment)
  }

  updateComment = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true})

    const updatedComment = {
      id: this.state.currentCommentID,
      body: values.body,
    }
    this.closeEditCommentModal()
    this.props.editComment(updatedComment)
  }

  changeVote = (commentID, vote) => {
    const option = {
      option: vote
    }
    this.props.voteComment(commentID, option)
  }

  deleteThisComment = (commentID) => {
    this.props.deleteComment(commentID)
  }

  render() {
    const { addCommentModalOpen, editCommentModalOpen } = this.state
    const { comments } = this.props.comments
    return (
      <div>
        <ul>
          {comments !== '' && comments.map((comment) => (
            <li key={comment.id}>

              <div className="comment-content">
                <p>{comment.body}</p>
                <div className="comment-metadata">
                  Posted by <span className="comment-author">{comment.author}</span>

                  <div className="comment-time">{timestampToDate(comment.timestamp)}</div>
                </div>
              </div>

              <div className="comment-vote">
                Current score: {comment.voteScore} | Vote: <button onClick={() => this.changeVote(comment.id, 'upVote')}>+</button>  <button onClick={() => this.changeVote(comment.id, 'downVote')}>-</button>
              </div>

              <div className="comment-admin">
                <button className="btn-comment-edit" onClick={() => this.openEditCommentModal(comment.id, comment.body)}>Edit</button>
                <button className="btn-comment-del" onClick={() => this.deleteThisComment(comment.id)}>Delete</button>
              </div>

            </li>
          ))}
        </ul>



        <button onClick={() => this.openAddCommentModal()}><PlusCircleIcon size={20} /> Add a Comment</button>


        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={addCommentModalOpen}
          onRequestClose={this.closeAddCommentModal}
          contentLabel='Modal'
        >

        <h2 className="modal-title">Add Comment</h2>
        <button onClick={() => this.closeAddCommentModal()} className='icon-btn post-close'><CloseIcon size={30}/></button>

          <form onSubmit={this.addNewComment} className="modal-form">

            <div className="modal-details">
              <textarea name="body" placeholder="Body" />
              <input type="text" name="author" placeholder="Author" />

              <button type="submit">Add Comment</button>
              <button onClick={() => this.closeAddCommentModal()}>Cancel</button>
            </div>
          </form>

        </Modal>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={editCommentModalOpen}
          onRequestClose={this.closeEditCommentModal}
          contentLabel='Modal'
        >

        <h2 className="modal-title">Edit Comment</h2>
        <button onClick={() => this.closeEditCommentModal()} className='icon-btn post-close'><CloseIcon size={30}/></button>

          <form onSubmit={this.updateComment} className="modal-form">

            <div className="modal-details">
              <textarea name="body" placeholder="Body" defaultValue={this.state.currentCommentBody} />

              <button type="submit">Update Comment</button>
              <button onClick={() => this.closeEditCommentModal()}>Cancel</button>
            </div>
          </form>

        </Modal>
      </div>
    )
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCommentsFromPost, addComment, voteComment, editComment, deleteComment }, dispatch)
}

function mapStateToProps({ comments }) {
  return { comments }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
