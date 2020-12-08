import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import ContainerView from 'react/components/ContainerView';
import ModuleLayout from 'react/components/ModuleLayout';
import Modal from 'react/components/Modal';
import {
	deleteBlog,
	fetchBlogs,
	fetchUsers,
	postBlog,
	updateBlog
} from 'state/actions';
import { formatDate } from 'utils';

class BlogContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentBlog: {},
			editBlog: {
				title: null,
				content: null
			},
			modalView: 'none',
			newBlog: {
				content: null,
				title: null,
				videoFile: null
			}
		};

		this.interval = null;
	}

	componentDidMount() {
		const { fetchBlogs, fetchUsers } = this.props;
		fetchBlogs();
		fetchUsers(0, true);
		fetchUsers(1, true);

		this.interval = setInterval(() => {
			fetchBlogs();
		}, 20000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		return (
			<ModuleLayout hasHeader>
				<ContainerView>
					<div className='BlogContainer'>
						<div className='BlogContainer__header'>
							<p className='BlogContainer__header-label'>
								Your Blogs
							</p>
							{[0, 1].includes(this.props.role) && (
								<React.Fragment>
									{this.renderModal()}
									<button
										className='BlogContainer__header-button button'
										onClick={() =>
											this.setState({
												modalView: 'add_blog'
											})
										}
									>
										Create Blog
									</button>
								</React.Fragment>
							)}
						</div>
						<div className='BlogContainer__list'>
							{this.renderBlogs()}
						</div>
					</div>
				</ContainerView>
			</ModuleLayout>
		);
	}

	renderBlogs = () => {
		const {
			props: { blogs, deleteBlog, role, users }
		} = this;
		if (blogs && blogs.length && blogs.length > 0) {
			const authors = {};
			for (let i = 0; i < users.length; i++) {
				authors[
					users[i].id
				] = `${users[i].first_name} ${users[i].last_name}`;
			}

			return blogs.map((blog, index) => (
				<React.Fragment key={index}>
					<hr />
					<div className='BlogContainer__list-item'>
						<p>
							<b>Title: </b> {blog.title}
						</p>
						<p>
							<b>Author: </b> {authors[blog.author]}
						</p>
						<p>
							<b>Created: </b> {formatDate(blog.created_on).date}
						</p>
						<p>
							<b>Last Updated: </b>{' '}
							{formatDate(blog.update_on).date}
						</p>
						<p>
							<b>Content: </b> {blog.content}
						</p>
						{blog.videofile && (
							<video width='80%' height='50%' controls>
								<source src={blog.videofile} type='video/mov' />
								<source src={blog.videofile} type='video/mp4' />
								<source src={blog.videofile} type='video/flv' />
								<source src={blog.videofile} type='video/wmv' />
								<source
									src={blog.videofile}
									type='video/webm'
								/>
								<source
									src={blog.videofile}
									type='video/mpeg'
								/>
								<source src={blog.videofile} type='video/m4v' />
								<source src={blog.videofile} type='video/avi' />
								Your browser does not support the video tag.
							</video>
						)}
						{[0, 1].includes(role) && (
							<div className='BlogContainer__list-item-footer'>
								<button
									className='BlogContainer__list-item-footer-cancel button'
									onClick={() => deleteBlog(blog.id)}
								>
									Delete
								</button>
								<button
									className='BlogContainer__list-item-footer-submit button'
									onClick={() => {
										const blogCopy = { ...blog };
										const blogCop2 = { ...blog };
										this.setState({
											currentBlog: { ...blogCopy },
											editBlog: {
												content: blogCop2.content,
												title: blogCop2.title
											},
											modalView: 'edit_blog'
										});
									}}
								>
									Edit
								</button>
							</div>
						)}
					</div>
				</React.Fragment>
			));
		} else {
			return (
				<div className='BlogContainer__list-empty'>
					{[0, 1].includes(role)
						? 'There are no blogs. Click "Create Blog" to create one!'
						: 'There are no blogs for you to view right now.'}
				</div>
			);
		}
	};

	renderModal = () => {
		const {
			props: { fetchBlogs, id, postBlog, updateBlog },
			state: { modalView }
		} = this;
		if (modalView === 'add_blog') {
			return (
				<Modal
					cancelText='Cancel'
					cancel={() => {
						this.setState({
							modalView: 'none',
							newBlog: {
								content: null,
								title: null,
								videoFile: null
							}
						});
					}}
					canSubmit={() => {
						return (
							this.state.newBlog.content &&
							this.state.newBlog.content.trim() !== '' &&
							this.state.newBlog.title &&
							this.state.newBlog.title.trim() !== ''
						);
					}}
					submitText='Post'
					submit={() => {
						postBlog({
							author: id,
							content: this.state.newBlog.content,
							title: this.state.newBlog.title,
							videoFile: this.state.newBlog.videoFile
						});
						this.setState(
							{
								modalView: 'none',
								newBlog: {
									content: null,
									title: null,
									videoFile: null
								}
							},
							fetchBlogs
						);
					}}
					title='Create a New Blog'
				>
					<div className='BlogContainer__modal'>
						<div className='BlogContainer__modal-row'>
							<p className='BlogContainer__modal-row-label'>
								<b>Blog Title: </b>
							</p>
							<input
								className='BlogContainer__modal-row-input'
								type='text'
								placeholder='Blog Title...'
								onChange={(e) =>
									this.setState({
										newBlog: {
											...this.state.newBlog,
											title: e.target.value
										}
									})
								}
							/>
						</div>
						<div className='BlogContainer__modal-row'>
							<p className='BlogContainer__modal-row-label'>
								<b>Video Attachment? (Optional)</b>
								{this.state.newBlog.videoFile && (
									<FontAwesomeIcon
										className='BlogContainer__modal-row-label-icon'
										icon={faCheckCircle}
									/>
								)}
							</p>
							<label className='BlogContainer__modal-row-inputWrapper button'>
								Choose File
								<input
									accept='video/*'
									className='BlogContainer__modal-row-fileInput'
									type='file'
									onChange={(e) => {
										e.preventDefault();
										this.setState({
											newBlog: {
												...this.state.newBlog,
												videoFile: e.target.files[0]
											}
										});
									}}
								/>
							</label>
						</div>
						<textarea
							className='BlogContainer__modal-textarea'
							placeholder='Blog Content...'
							onChange={(e) =>
								this.setState({
									newBlog: {
										...this.state.newBlog,
										content: e.target.value
									}
								})
							}
						/>
					</div>
				</Modal>
			);
		} else if (modalView === 'edit_blog') {
			return (
				<Modal
					cancelText='Cancel'
					cancel={() => {
						this.setState({
							currentBlog: {},
							editBlog: {
								title: null,
								content: null
							},
							modalView: 'none'
						});
					}}
					canSubmit={() => {
						return (
							(this.state.editBlog.content &&
								this.state.editBlog.content !==
									this.state.currentBlog.content) ||
							(this.state.editBlog.title &&
								this.state.editBlog.title !==
									this.state.currentBlog.title)
						);
					}}
					submitText='Edit'
					submit={() => {
						updateBlog(
							{
								...this.state.editBlog,
								author: this.state.currentBlog.author,
								slug: this.state.currentBlog.slug
							},
							this.state.currentBlog.id
						);
						this.setState({
							currentBlog: {},
							editBlog: {
								title: null,
								content: null
							},
							modalView: 'none'
						});
					}}
					title='Edit This Blog'
				>
					<div className='BlogContainer__modal'>
						<div className='BlogContainer__modal-row'>
							<p className='BlogContainer__modal-row-label'>
								<b>Blog Title: </b>
							</p>
							<input
								className='BlogContainer__modal-row-input'
								type='text'
								placeholder='Blog Title...'
								value={this.state.editBlog.title}
								onChange={(e) =>
									this.setState({
										editBlog: {
											...this.state.editBlog,
											title: e.target.value
										}
									})
								}
							/>
						</div>
						<p className='BlogContainer__modal-row-label'>
							<b>Blog Content: </b>
						</p>
						<textarea
							className='BlogContainer__modal-textarea'
							placeholder='Blog Content...'
							value={this.state.editBlog.content}
							onChange={(e) =>
								this.setState({
									editBlog: {
										...this.state.editBlog,
										content: e.target.value
									}
								})
							}
						/>
					</div>
				</Modal>
			);
		}
	};
}

const MapStateToProps = (state) => {
	return {
		blogs: state.blogs.blogs,
		id: state.user.info.id,
		role: state.user.info.role,
		users: state.user.users
	};
};

const MapDispatchToProps = {
	deleteBlog,
	fetchBlogs,
	fetchUsers,
	postBlog,
	updateBlog
};

export default connect(MapStateToProps, MapDispatchToProps)(BlogContainer);
