import React, { Component } from 'react';
import PropTypes from 'prop-types';
import contentful from 'contentful-management';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import BlogContainer from './BlogContainer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';

import { auth, googleAuthProvider } from './firebase';

import './App.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class App extends Component {
	state = { user: null };
	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user });
			}
		});
		//const client = contentful.createClient({accessToken: })
	}
	handleChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		});
	};
	render() {
		const { user } = this.state;
		return (
			<Router>
				<div className="App">
					<header className="App-header">
						<AppBar position="static">
							<Toolbar>
								<IconButton  color="inherit" aria-label="Menu">
									<MenuIcon />
								</IconButton>
								<Typography variant="h6" color="inherit" >
									News
								</Typography>
								<Button color="inherit">Login</Button>
							</Toolbar>
						</AppBar>

						<Switch>
							<Route exact path="/" component={BlogContainer} />
							<Route path="/blog" component={BlogContainer} />
						</Switch>

						<BlogContainer />
						<p>Welcome to Thom's website.</p>
						{user ? <p>There is a user logged in</p> : <p>no user</p>}
						<Button className="my-button" onClick={() => auth.signInWithPopup(googleAuthProvider)}>
							Sign In
						</Button>
						<form noValidate>
							<TextField
								id="blog-content"
								className="blog-content"
								type="text"
								multiline
								onChange={this.handleChange('name')}
								value={this.state.name}
							/>
						</form>
					</header>

					<main />
				</div>
			</Router>
		);
	}
}

export default App;
