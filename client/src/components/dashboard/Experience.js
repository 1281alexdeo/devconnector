import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";
class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  delete(exp_id) {
    console.log(exp_id);

    this.props.deleteExperience(exp_id, this.props.history);
  }
  render() {
    const experiences = this.props.experience.map((exp, index) => {
      return (
        <tbody key={index}>
          <tr>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
              <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
              {exp.to === null ? (
                " Present"
              ) : (
                <Moment format="YYYY/MM/DD">{exp.to}</Moment>
              )}
            </td>
            <td>
              <button
                onClick={this.delete.bind(this, exp._id)}
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
export default connect(null, { deleteExperience })(withRouter(Experience));
