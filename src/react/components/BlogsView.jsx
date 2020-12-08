import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlogs } from 'state/actions';
import { formatDate } from 'utils';

class BlogsView extends Component {
	componentDidMount() {
		this.props.fetchBlogs();
	}
	render() {
		return <div className='BlogsView'>{this.renderBlogs()}</div>;
	}

	renderBlogs = () => {
		const { blogs } = this.props;
		if (!blogs || !blogs.length) {
			return <p className='BlogsView__none'>You have no blogs to view</p>;
		} else {
			const abbreviatedBlogs = blogs.slice(0, 3);
			const renderedBlogs = [];
			renderedBlogs.push(
				...abbreviatedBlogs.map((blog, index) => {
					return (
						<React.Fragment key={index}>
							<div className='BlogsView__list-blog'>
								<p className='BlogsView__list-blog-field'>
									<b>Title: </b>
									{blog.title}
								</p>
								<p
									className='BlogsView__list-blog-field'
									style={{ maxWidth: '30%' }}
								>
									<b>Content: </b>
									{blog.content}
								</p>
								<p className='BlogsView__list-blog-field'>
									<b>Created: </b>
									{formatDate(blog.created_on).date}
								</p>
							</div>
						</React.Fragment>
					);
				})
			);
			if (blogs.length > 3) {
				renderedBlogs.push(
					<p className='BlogsView__see-more' key={'uniqueKey'}>
						...Go to your blogs to see more!
					</p>
				);
			}
			return renderedBlogs;
		}
	};
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs.blogs
	};
};

const mapDispatchToProps = {
	fetchBlogs
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogsView);
