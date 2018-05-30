import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaGroup from "../../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profileActions";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCurrentChange = this.onCurrentChange.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    const formData = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addExperience(formData, this.props.history);
    console.log("submited");
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onCurrentChange(e) {
    const d = new Date();
    let Present = {
      date: d.getDate(),
      month: d.getMonth(),
      year: d.getFullYear()
    };
    const today = ` ${Present.year}-${Present.month + 1}-${Present.date}`;

    this.setState({
      [e.target.name]: !this.state.current,
      to: today
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
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="* Job Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    error={errors.title}
                  />
                  <TextFieldGroup
                    placeholder="* Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                    error={errors.company}
                  />
                  <TextFieldGroup
                    placeholder="* Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                  />
                  <h6>From Date</h6>
                  <TextFieldGroup
                    type="date"
                    name="from"
                    value={this.state.from}
                    onChange={this.onChange}
                    error={errors.from}
                  />
                  <h6>To Date</h6>
                  <TextFieldGroup
                    type="date"
                    name="to"
                    value={this.state.to}
                    onChange={this.onChange}
                    disabled={this.state.current === true ? "disabled" : ""}
                  />
                </div>

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    onChange={this.onCurrentChange}
                    value={this.state.current}
                    id="current"
                  />
                  <label className="form-check-label" htmlFor="current">
                    Current Job
                  </label>
                </div>
                <div className="form-group">
                  <TextAreaGroup
                    className="form-control form-control-lg"
                    placeholder="Job Description"
                    name="description"
                    onChange={this.onChange}
                    value={this.state.description}
                  />
                  <small className="form-text text-muted">
                    Some of your responsabilities, etc
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
  profile: state.profile,
  errors: state.errors
});
export default connect(mapStateToProps, { addExperience })(
  withRouter(AddExperience)
);
