import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import Spinner from '../../common/Spinner';

class CommentFeed extends Component {
  render() {
    console.log('COMMENTFEED PROPS:', this.props);
    const { comments, postId } = this.props;
    let commentItem;
    if (comments) {
      return (commentItem = comments.map(comment => (
        <CommentItem key={comment._id} comment={comment} postId={postId} />
      )));
    } else {
      return (commentItem = (
        <div>
          <Spinner />
        </div>
      ));
    }

    return { commentItem };
  }
}

export default CommentFeed;
