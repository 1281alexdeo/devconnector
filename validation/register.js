const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateRegisterInput(data) {
  let errors = {};
  //making sure that if data.name is empty it has to be an empty string
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    //not valid
    errors.name = 'name must be 2 and 30 characters'; //create a new key name which contains error mesg
  }
  //check if name is empty
  if (Validator.isEmpty(data.name)) {
    //validator is empty expects an empty string in order to work
    errors.name = 'Name field is required';
  }
  //check if Email is in correct format
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  //check if email is isEmpty
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  //check that length of password must be >=6 and <30 characters
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be atleast 6 to 30 characters';
  }
  //check is password is not isEmpty
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  //check if password and password2 matches
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Password must match';
  }
  //check if password2 isEmpty
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required';
  }
  //Is valid
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
