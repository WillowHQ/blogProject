import React from 'react';
import { createClient } from 'contentful';
import BlogLayout from './BlogLayout';


class BlogContainer extends React.Component {
	state={
		blogs: [],
	}
	async componentWillMount() {
		let space, accessToken;

		space = process.env.REACT_APP_CONTENTFUL_BLOG_SPACE;
		accessToken= process.env.REACT_APP_CONTENTFUL_BLOG_ACCESS_TOKEN;
		console.log({space, accessToken})
		const client = createClient({
			space: space,
			accessToken: accessToken
		});

		const entries = await client.getEntries({
			content_type: 'blogArticle',
			order: '-sys.createdAt'
		});

		this.setState({ blogs: entries.items});
	}
	render() {
		const {blogs} = this.state
		
		if (blogs.length >= 1) {
			return <BlogLayout blogs={blogs}/> 
		}
		else {
			return <div/>
		}
	}
}
export default BlogContainer;
