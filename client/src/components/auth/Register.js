import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authAction';
import TextFieldGroup from '../../common/TextFieldGroup';
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
  }

  //prevent manual routing through URL address Navbar
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  //getting errors from redux state into component state using componentWillReceiveProps
  componentWillReceiveProps(nextProps) {
    //test for errors in this.props.errors exists
    if (nextProps.errors) {
      //errors exists--> set the received props to the component state
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onInputChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  Submit(e) {
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
    e.preventDefault();
  }

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;

    return (
      <div className="register">
        {user && user.name}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.Submit.bind(this)}>
                {/* //Name text field */}
                <TextFieldGroup
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.onInputChangeHandler.bind(this)}
                  error={errors.name}
                />
                {/* Email Address  text field*/}
                <TextFieldGroup
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onInputChangeHandler.bind(this)}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use
                  a Gravatar email"
                />

                {/* password */}
                <TextFieldGroup
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onInputChangeHandler.bind(this)}
                  error={errors.password}
                />
                {/* // confirm password2 */}
                <TextFieldGroup
                  placeholder="Confirm Password"
                  type="password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onInputChangeHandler.bind(this)}
                  error={errors.password2}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//using PropTypes
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
