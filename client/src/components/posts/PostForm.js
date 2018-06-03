import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';
class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    console.log('submitted');

    const { user } = this.props.auth;
    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addPost(newPost);
    this.setState({
      text: ''
    });
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.errors) {
      this.setState({
        errors: nextProp.errors
      });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  className="form-control form-control-lg"
                  placeholder="Create a post"
                  value={this.state.text}
                  onChange={this.onChange}
                  name="text"
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { addPost })(PostForm);
