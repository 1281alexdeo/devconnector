//function that will check if value is
// empty for any data type like
//string,object,undefined,null
//since the validators is-empty method
//only checks for type string.
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

module.exports = isEmpty;
