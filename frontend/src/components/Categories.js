import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllCategories } from '../actions/actions_categories'

class Categories extends Component {

  componentDidMount() {
    this.props.getAllCategories()
    
  }

  render() {
    const { categories } = this.props.categories
    return (
      <div>
        <h1>Categories</h1>
        {categories !== '' && categories.map((category) => (
          <div className="cat-btn" key={category.name}>
            <Link to={category.name+'/posts' }>{category.name}</Link>
          </div>
        ))}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllCategories }, dispatch)
}

function mapStateToProps({ categories }) {
  return { categories }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)













//
