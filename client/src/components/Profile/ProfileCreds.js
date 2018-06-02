import React, { Component } from 'react';
import Moment from 'react-moment';
import isEmpty from '../../validation/is-empty';
class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;
    const experiences = experience.map((exp, index) => {
      return (
        <div key={index}>
          <ul className="list-group">
            <li className="list-group-item mb-1">
              <h4>{exp.company}</h4>
              <p>
                {isEmpty(exp.from) ? null : (
                  <Moment format="YYYY/MM/DD">{exp.from}</Moment>
                )}{' '}
                -{' '}
                {isEmpty(exp.to) ? (
                  'Present'
                ) : (
                  <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                )}
              </p>
              <p>
                <strong>Position:</strong> {exp.title}
              </p>
              <p>
                <strong>Description:</strong> {exp.description}
              </p>
            </li>
          </ul>
        </div>
      );
    });
    const educations = education.map((edu, index) => {
      return (
        <ul key={index} className="list-group">
          <li className="list-group-item mb-1">
            <h4>{edu.school}</h4>
            <p>
              {isEmpty(edu.from) ? null : (
                <Moment format="YYYY/MM/DD">{edu.from}</Moment>
              )}{' '}
              -{' '}
              {isEmpty(edu.to) ? (
                'Present'
              ) : (
                <Moment format="YYYY/MM/DD">{edu.to}</Moment>
              )}
            </p>
            <p>
              <strong>Degree: </strong>
              {edu.degree}
            </p>
            <p>
              <strong>Field Of Study: </strong>
              {edu.fieldofstudy}
            </p>

            <p>
              <strong>Description:</strong> {edu.description}
            </p>
          </li>
        </ul>
      );
    });
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {experiences}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {educations}
        </div>
      </div>
    );
  }
}
export default ProfileCreds;
