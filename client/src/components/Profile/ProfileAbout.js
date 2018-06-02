import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;
    const firstname = profile.user.name.trim().split(' ')[0]; //spliting the user fullname  into an array of first and last name [0,1] and getting the first element waw
    let skillset;
    //check if user have any skill in skill array
    if (profile.skills.length > 0) {
      skillset = profile.skills.map((skill, index) => {
        return (
          <div className="p-3" key={index}>
            <i className="fa fa-check" /> {skill}
          </div>
        );
      });
    } else {
      null;
    }
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstname}'s Bio</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                `${firstname} does not have a bio`
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skillset}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileAbout;
