import React from 'react';
import Markdown from 'markdown-to-jsx';
import {Route} from 'react-router-dom';

import './blog.css';

const BlogSmallCard = (props) => (
	<a className="blog-site-link" href={`/blog/${props.id}`}>
		<div className="mobile-small-relative-card">
			<div className="mobile-small-absolute-card">
				<p className="blog-small-title">{props.title}</p>
			</div>
		</div>
	</a>
);
const BlogLargeCard = (props) => (
	<a className="site-link-big" href={`/blog/${props.id}`}>
		<div className="mobile-large-card">
			<div className="mobile-text-container">
				<p className="mobile-large-header">{props.title}</p>
				<p className="mobile-large-para">{props.text}</p>
			</div>
		</div>
	</a>
);

class BlogLayout extends React.Component {
	getBlog = (searchId) => {
		const { blogs } = this.props;
		return blogs.find((item) => item.sys.id === searchId);
	};
	trimText = (text) => {
		let result = text;
		let resultArray = text.split(' ');
		if (resultArray.length > 10) {
			resultArray = resultArray.slice(0, 10);
			result = resultArray.join(' ') + '...';
		}
		return result;
	};

	render() {
		const { isDesktop } = this.props;

		const blogEntries = this.props.blogs.map((blog, i) => {
			const { title, body } = blog.fields;
			console.log({title, body})	
			const { id } = blog.sys;
			if (i === 0)
				
				return (
					<BlogLargeCard
						id={id}
						title={title}
						text={"this.trimText(body)"}
					/>
				);
			return <BlogSmallCard id={id} title={title}  isDesktop={isDesktop}/>;
		});
		const BlogReaderWithBlog = ({ match }) => <BlogReader blog={this.getBlog(match.params.blogId)} />;
		return (
			<div>
				<Route path={`/blog/:blogId`} component={BlogReaderWithBlog}/>	
				<Route
					exact
					path={'/blog'}
					render={() => (
						<div className="blog">
							<div className="main-blog-container">
								{blogEntries.shift()}

								<div className="small-card-container">{blogEntries}</div>
							</div>
						</div>
					)}/>
				<Route 
					exact
					path={'/'}
					render={() => (
						<div className="main-panel-blog">
							<div className="main-blog-container in-main">
								{blogEntries.shift()}

								<div className="small-card-container">{blogEntries}</div>
							</div>
						</div>
					
					)}/>

				</div>
		);
	}
}
export class BlogReader extends React.Component {
	render() {
		const { blog } = this.props;
		

		return (
			<div className="blog">
				{blog != undefined && (
					<div className="main-reader-container">
						<p className="mobile-large-header reader-header">{`${blog.fields.title}`}</p>

						<img className="blog-large-image" id="big-image" src={blog.fields.titleImage.fields.file.url} alt="large card image" />

						<Markdown className="reader-copy" children={blog.fields.markdown}/>
					</div>
				)}
			</div>
		);
	}
}

export default BlogLayout;
