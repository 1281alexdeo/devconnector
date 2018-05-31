import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';
class Experience extends Component {
  delete(exp_id) {
    console.log(exp_id);

    this.props.deleteExperience(exp_id);
  }
  render() {
    const experiences = this.props.experience.map((experience, index) => {
      return (
        <tbody key={index}>
          <tr>
            <td>{experience.company}</td>
            <td>{experience.title}</td>
            <td>
              <Moment format="YYYY/MM/DD">{experience.from}</Moment> -
              {experience.to === null ? (
                'Present'
              ) : (
                <Moment format="YYYY/MM/DD">{experience.to}</Moment>
              )}
            </td>
            <td>
              <button
                onClick={this.delete.bind(this, experience._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      );
    });

    return (
      <div>
        <h4>Experience Credential</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
            </tr>
          </thead>
          {experiences}
        </table>
      </div>
    );
  }
}
export default connect(null, { deleteExperience })(Experience);
