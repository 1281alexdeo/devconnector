import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import { addEducation } from "../../actions/profileActions";

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      fieldofstudy: "",
      degree: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const formData = {
      school: this.state.school,
      fieldofstudy: this.state.fieldofstudy,
      degree: this.state.degree,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(formData, this.props.history);
    console.log("submitted");
  }
  onCurrentChecked() {
    this.setState({
      current: !this.state.current
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  render() {
    const { errors, current } = this.state;

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School Or Bootcamp"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="* Degree Or Certificate"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="* Field Of Study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  disabled={this.state.current === true ? "disabled" : ""}
                />

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    onChange={this.onCurrentChecked.bind(this)}
                  />
                  <label className="form-check-label" htmlFor="current">
                    Current Job
                  </label>
                </div>
                <div className="form-group">
                  <TextAreaFieldGroup
                    className="form-control form-control-lg"
                    placeholder="Program Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    Tell us about your experience and what you learned
                  </small>
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
const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
