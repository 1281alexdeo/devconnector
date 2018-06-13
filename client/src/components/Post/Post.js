import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../actions/postActions';

class Post extends Component {
  componentDidMount = () => {
    this.props.getPost(this.props.match.params.id); //get id from url
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
export default connect(
  mapStateToProps,
  { getPost }
)(Post);
