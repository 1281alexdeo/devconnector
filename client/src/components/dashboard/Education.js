import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profileActions";
class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  delete(id) {
    this.props.deleteEducation(id);
  }
  render() {
    const educations = this.props.education.map((education, index) => {
      return (
        <tbody key={index}>
          <tr>
            <td>{education.school}</td>
            <td>{education.degree}</td>
            <td>
              <Moment format="YYYY/MM/DD">{education.from}</Moment>
              -{" "}
              {education.to === null ? (
                " Present"
              ) : (
                <Moment format="YYYY/MM/DD">{education.to}</Moment>
              )}
            </td>
            <td>
              <button
                onClick={this.delete.bind(this, education._id)}
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
        <h4>Education Credential</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
            </tr>
          </thead>
          {educations}
        </table>
      </div>
    );
  }
}
export default connect(null, { deleteEducation })(Education);
