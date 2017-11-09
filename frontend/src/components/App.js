import React, { Component } from 'react'
import Posts from './Posts'
import Categories from './Categories'
import IndividualPost from './IndividualPost'
import { Route } from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <div>
            <Categories />
            <Posts />
          </div>
        )} />
        <Route name="postsByCategory" path="/:category/posts" component={Posts} />

        <Route name="postDetail" path="/posts/:id" component={IndividualPost} />
      </div>
    )
  }
}

export default App




























//
