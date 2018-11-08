import React from 'react';
import { createClient } from 'contentful';
import BlogLayout from './BlogLayout';


class BlogContainer extends React.Component {
	state={
		blogs: [],
	}
	async componentWillMount() {
		let blogSpace, blogAccessToken;

		blogSpace = process.env.REACT_APP_CONTENTFUL_BLOG_SPACE;
		blogAccessToken= process.env.REACT_APP_CONTENTFUL_BLOG_ACCESS_TOKEN;
		
		const client = createClient({
			space: blogSpace,
			accessToken: blogAccessToken
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
			return <BlogLayout blogs={blogs}/> v4
		}
		else {
			return <div/>
		}
	}
}
export default BlogContainer;
