import React, { Component } from 'react'

class IndividualComment extends Component {

  render() {
    const {comment} = this.props
    return (
      <div>
        <h4>{comment.title}</h4>
        <div className="comment-body">{comment.body}</div>
      </div>
    )
  }

}

export default IndividualComment
