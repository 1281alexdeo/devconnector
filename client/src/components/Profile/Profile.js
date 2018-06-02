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
              <Link className="btn btn-light mb-3   float-left" to="/profiles">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            experience={profile.experience}
            education={profile.education}
          />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">{profileConent}</div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, { getProfileByHandle })(Profile);
