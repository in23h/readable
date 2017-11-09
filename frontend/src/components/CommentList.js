import React, { Component } from 'react'
import IndividualComment from './IndividualComment'

class CommentList extends Component {

  render() {
    const { comments } = this.props
    return (
      <div>
        <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
          <IndividualComment comment={comment}/>
          </li>
        ))}
        </ul>
      </div>
    )
  }

}

export default CommentList
