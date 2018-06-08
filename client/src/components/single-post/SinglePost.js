import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../actions/postActions';

class SinglePost extends Component {
  componentDidMount = () => {
    this.props.getPost(this.props.match.params.id);
  };

  render() {
    return (
      <div>
        <h1> POST</h1>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  post: state.post
});
export default connect(mapStateToProps, { getPost })(SinglePost);
