import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../../actions/postActions';
import Spinner from '../../common/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
// import PostItem from '../../components/posts/PostItem';
class Post extends Component {
  componentDidMount = () => {
    this.props.getPost(this.props.match.params.id); //get id from url
  };
  render() {
    const { post, loading } = this.props;
    let postContent;
    if ((post === null && loading) || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = <PostItem post={post.post} showActions={false} />; //customize PostItem  showActions
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed{' '}
              </Link>
              {postContent}
              <CommentForm postId={post.post._id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getPost }
)(Post);
