import React, { Component } from 'react';
import contentful from 'contentful-management';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import BlogContainer from './BlogContainer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import logo from './logo.svg';

import { auth, googleAuthProvider, } from './firebase';

import './App.css';

class App extends Component {
  state ={user: null}
  componentDidMount() {
    auth.onAuthStateChanged((user) =>{
      if (user){
        this.setState({user})
      }

    })
    //const client = contentful.createClient({accessToken: })
  }
  handleChange = name => event => {
    this.setState({
      [name] : event.target.value,
    })
  }
  render() {
    const {user} = this.state;
    return (
      <Router>

      <div className="App">
        <header className="App-header">
        <Switch>
          <Route exact path='/' component={BlogContainer}/>
          <Route path='/blog' component={BlogContainer}/>
        </Switch>
        
        <BlogContainer/>
          <p>
            Welcome to Thom's website.
          </p>
          {user
            ? <p>There is a user logged in</p>:<p>no user</p>
          }
          <Button className="my-button" onClick={() => auth.signInWithPopup(googleAuthProvider)}>
          Sign In
        </Button>
        <form noValidate>
        <TextField id="blog-content" className="blog-content" type="text"  multiline onChange={this.handleChange('name')} value={this.state.name}/>
        </form>
        </header>

        <main>
        </main>
      </div>
      </Router>

    );
  }
}

export default App;
