import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authAction';
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
  //getting errors from redux state into component state using componentWillReceiveProps
  componentWillReceiveProps(nextProps) {
    //test for errors in this.props exists
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
    this.props.registerUser(newUser);

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
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames('form-control form-control-lg', {
                      //classnames takes in string and object as args
                      'is-invalid': errors.name //if errors.name exists
                    })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onInputChangeHandler.bind(this)}
                  />
                  {errors.name ? ( //conditionaly render a some JSX
                    <div className="invalid-feedback">{errors.name} </div> //iferror.name exists then render this div
                  ) : (
                    //else
                    <div> </div> //render empty div
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onInputChangeHandler.bind(this)}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email} </div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onInputChangeHandler.bind(this)}
                  />
                  {errors.password ? (
                    <div className="invalid-feedback">{errors.password} </div>
                  ) : (
                    <div> </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onInputChangeHandler.bind(this)}
                  />
                  {errors.password2 ? (
                    <div className="invalid-feedback">{errors.password2} </div>
                  ) : (
                    <div> </div>
                  )}
                </div>
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

export default connect(mapStateToProps, { registerUser })(Register);
