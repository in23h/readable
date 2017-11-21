import React, { Component } from 'react'
import Posts from './Posts'
import IndividualPost from './IndividualPost'
import { Route } from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <div>
            <Posts />
          </div>
        )} />
        <Route path="/:category/posts" component={Posts} />

        <Route path="/posts/:id" component={IndividualPost} />
      </div>
    )
  }
}

export default App




























//
