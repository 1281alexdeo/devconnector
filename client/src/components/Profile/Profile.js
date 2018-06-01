import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProfileAbout from './ProfileAbout';
import ProfileHeader from './ProfileHeader';
import ProfileGithub from './ProfileGithub';
import ProfileCreds from './ProfileCreds';
import Spinner from '../../common/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {
  componentDidMount = () => {
    //   getting the handle from directly from the url using this.props.match.params
    //check if handle is present in the url
    if (this.props.match.params.handle)
      this.props.getProfileByHandle(this.props.match.params.handle);
  };

  render() {
    const { profile, loading } = this.props.profile;
    let profileConent;
    if (profile === null || loading) {
      profileConent = <Spinner />;
    } else {
      profileConent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link className="btn btn-light" to="/dashboard">
                Go Back
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        {profileConent}
        <ProfileHeader />
        <ProfileAbout />
        <ProfileCreds />
        <ProfileGithub />
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, { getProfileByHandle })(Profile);
