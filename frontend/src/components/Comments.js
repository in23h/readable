import React, { Component } from 'react'
import { getCommentsFromPost, addComment, voteComment, editComment, deleteComment } from '../actions/actions_comments'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import uuidv1 from 'uuid/v1'
import serializeForm from 'form-serialize'
import { timestampToDate } from '../utils/timestamp_date'
import Modal from 'react-modal'
import CloseIcon from 'react-icons/lib/fa/close'
import PlusCircleIcon from 'react-icons/lib/fa/plus-circle'

class Comments extends Component {

  state = {
    addCommentModalOpen: false,
    editCommentModalOpen: false
  }

  componentDidMount() {
    console.log('thepostid', this.props)
    //this.props.getCommentsFromPost(this.props.postID)
  }


  openAddCommentModal = () => this.setState(() => ({ addCommentModalOpen: true }))
  closeAddCommentModal = () => this.setState(() => ({ addCommentModalOpen: false }))

  openEditCommentModal = () => this.setState(() => ({ editCommentModalOpen: true }))
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
      id: e.target.id,
      title: values.title,
      body: values.body,
    }
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
    const { comments } = this.props
    return (
      <div>
        <ul>
          <li>Loop through comments here</li>
        </ul>



        <button onClick={() => this.openAddCommentModal()}><PlusCircleIcon size={20} /> Add a Comment</button>


        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={addCommentModalOpen}
          onRequestClose={this.closeAddCommentModal}
          contentLabel='Modal'
        >

        <button onClick={() => this.closeAddCommentModal()} className='icon-btn post-close'><CloseIcon size={30}/></button>

          <section>
            <h2>Add Comment</h2>
            <form onSubmit={this.addNewComment} className="create-contact-form">

              <div className="create-contact-details">
                <textarea name="body" placeholder="Body" />
                <input type="text" name="author" placeholder="Author" />

                <button type="submit">Add Comment</button>
              </div>
            </form>
          </section>


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
