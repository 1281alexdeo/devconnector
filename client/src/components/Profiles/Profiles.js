import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import { getProfiles } from '../../actions/profileActions';
import ProfileItem from './ProfileItem';
class Profiles extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = () => {
    this.props.getProfiles();
  };

  render() {
    const { profiles, loading } = this.props.profile;
    let profilesItem;
    if (profiles === null || loading) {
      profilesItem = <Spinner />;
    } else {
      if (profiles.length > 0) {
        // profiles exisits so display profiles
        profilesItem = profiles.map((profile, index) => {
          return <ProfileItem key={index} profile={profile} />;
        });
      } else {
        profilesItem = (
          <div>
            <h4>Profile no found...</h4>
          </div>
        );
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with Developers
              </p>
              {profilesItem}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, { getProfiles })(Profiles);
