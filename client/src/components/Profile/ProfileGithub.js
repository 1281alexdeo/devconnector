import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: 'f90affd1266de1ce69b2',
      clientSecret: '2dbf24cb21d9c4b767080d1e876f4fa2b825be24',
      count: 5,
      sort: 'created: asc',
      repos: []
    };
  }
  componentDidMount = () => {
    const { username } = this.props;
    const { clientId, clientSecret, count, sort } = this.state;
    fetch(
      `https://api.github.com/users/${username}/repos?&per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({
            repos: data
          });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { repos } = this.state;
    console.log('REPO', repos);
    const repoItems = repos.map(repo => {
      return (
        <div className="card card-body mb-1" key={repo.id}>
          <div className="row">
            <div className="col-md-6">
              <h4>
                <Link to={repo.html_url} className="text-info" target="_blank">
                  {repo.name}
                </Link>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">
                Stars:{repo.stargazers_count}
              </span>
              <span className="badge badge-secondary mr-1">
                Watchers:{repo.watchers_count}
              </span>
              <span className="badge badge-success ">
                Forks:{repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      );
    });

    return (
      // have to put ref to fix the error (can't call setState or (force update) on unmounted component,indicated memory leak in you applciaiotn
      <div ref="myRef">
        <hr />
        {repos.length === 0 ? null : (
          <div>
            <h4 className="display-5">Latest Github Repos</h4>
            <span>{repoItems}</span>
          </div>
        )}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};
export default ProfileGithub;
