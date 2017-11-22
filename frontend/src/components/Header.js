import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAllCategories } from '../actions/actions_categories'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Header extends Component {

  componentDidMount() {
    this.props.getAllCategories()
  }

  changeCategory = (e) => {
    console.log(e.target.value+'/posts');


  }

  render() {
    const { categories } = this.props.categories
    return (
      <div id="header">
        <h1>Project 2 - Readable</h1>
        <Link to="/" className="top-nav">Home</Link>
        Category:
        <select onChange={(event) => this.changeCategory(event)}>
          <option name="all">All</option>
        {categories !== '' && categories.map((category) => (
          <option key={category.name}  name={category.name}>{category.name}</option>
        ))}
        </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header)





















//
