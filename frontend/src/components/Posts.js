import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllPosts, addPost, votePost, editPost, getPostsByCategory, deletePost } from '../actions/actions_posts'
import uuidv1 from 'uuid/v1'
import serializeForm from 'form-serialize'
import { timestampToDate, capitalize } from '../utils/helpers'
import sortBy from 'sort-by'
import { getAllCategories } from '../actions/actions_categories'
import Header from './Header'
import Modal from 'react-modal'
import CloseIcon from 'react-icons/lib/fa/close'
import SortIcon from 'react-icons/lib/fa/sort'
import PlusCircleIcon from 'react-icons/lib/fa/plus-circle'
import createHistory from 'history/createBrowserHistory'

class Posts extends Component {

  state = {
    sortingMethod: '-voteScore',
    addPostModalOpen: false,
  }

  componentDidMount() {
    let currentCategory = ''
    if(this.props.match) {
      currentCategory = this.props.match.params.category
    }

    currentCategory === '' ? this.props.getAllPosts() : this.props.getPostsByCategory(currentCategory)
    this.props.getAllCategories()
  }



  openAddPostModal = () => this.setState(() => ({ addPostModalOpen: true }))
  closeAddPostModal = () => this.setState(() => ({ addPostModalOpen: false }))

  updateCategory = (event) => {
    const selectedCategory = event.target.value
    const history = createHistory()
    if(selectedCategory !== 'all') {
      this.props.getPostsByCategory(selectedCategory)
      history.push('/'+selectedCategory+'/posts')
    } else {
      this.props.getAllPosts()
      history.push('/')
    }
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
    this.closeAddPostModal()
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
    this.closeEditPostModal()
    this.props.editPost(updatedPost)
  }

  changeVote = (postID, vote) => {
    const option = {
      option: vote
    }
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
    const { addPostModalOpen } = this.state
    const { categories } = this.props.categories
    const { posts } = this.props.posts
    posts.sort(sortBy(this.state.sortingMethod, 'title'))
    return (
      <div>
        <Header />

        <div className="subheader">
          <button onClick={() => this.openAddPostModal()}><PlusCircleIcon size={20} /> Add a Post</button>
          Category:
          <select onChange={(event) => this.updateCategory(event)}>
            <option value="all">All</option>
          {categories !== '' && categories.map((category) => (
            <option key={category.path} value={category.path}>{capitalize(category.name)}</option>
          ))}
          </select>

          <div className="post-sort-by">
            Sort by:
            <button onClick={() => this.changeSort('voteScore')} className="selected">Most votes <SortIcon size={20} /></button>
            <button onClick={() => this.changeSort('timestamp')} className="">Date posted <SortIcon size={20} /></button>
          </div>
        </div>
        <section>

          <ul id="posts">
          {posts !== '' && posts.map((post) => (
            <li key={post.id}>
              <div className="post-header">
                <Link className="post-title" to={'/posts/'+post.id}><h1>{post.title}</h1></Link>
              </div>


              <div className="post-content">

                <div className="post-metadata">
                  Posted by <span className="post-author">{post.author}</span> in {post.category}

                  <div className="post-time">{timestampToDate(post.timestamp)}</div>
                </div>
              </div>

              <div className="post-vote">
                Current score: {post.voteScore} | Vote: <button onClick={() => this.changeVote(post.id, 'upVote')}>+</button>  <button onClick={() => this.changeVote(post.id, 'downVote')}>-</button>
              </div>

              <div className="post-admin">
                <Link className="btn btn-post-edit"
                  to={{
                  pathname: '/posts/'+post.id
                }}>Edit</Link>
                <button className="btn-post-del" onClick={() => this.deleteThisPost(post.id)}>Delete</button>
              </div>

            </li>
          ))}
          </ul>
        </section>



        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={addPostModalOpen}
          onRequestClose={this.closeAddPostModal}
          contentLabel='Modal'
        >

          <h2 className="modal-title">Add Post</h2>
          <button onClick={() => this.closeAddPostModal()} className='icon-btn post-close'><CloseIcon size={30}/></button>

          <form onSubmit={this.addNewPost} className="modal-form">

            <div className="modal-details">
              <input type="text" name="title" placeholder="Title" />
              <textarea name="body" placeholder="Body" />
              <input type="text" name="author" placeholder="Author" />
              <select name="category">
              {categories !== '' && categories.map((category) => (
                <option key={category.name}  name={category.name}>{category.name}</option>
              ))}
              </select>
              <button type="submit">Add Post</button>
              <button onClick={() => this.closeAddPostModal()}>Cancel</button>
            </div>
          </form>

        </Modal>

      </div>
    )
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllPosts, addPost, votePost, editPost, getPostsByCategory, deletePost, getAllCategories }, dispatch)
}

function mapStateToProps({ posts, categories }) {
  return { posts, categories }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)













//
