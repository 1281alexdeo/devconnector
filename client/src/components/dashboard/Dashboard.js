import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
class Dashbord extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    return <div>MY COMPONENT</div>;
  }
}

Dashbord.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired
};

export default connect(null, { getCurrentProfile })(Dashbord);
