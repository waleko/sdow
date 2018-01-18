import axios from 'axios';
import React from 'react';

import {GoButton} from './SearchButton.styles';

import {SDOW_API_URL} from '../resources/constants';

class SearchButton extends React.Component {
  constructor() {
    super();

    this.state = {
      isFetching: false,
    };
  }

  fetchShortestPaths(fromArticleTitle, toArticleTitle, setError, setShortestPaths) {
    console.log(`fetchShortestPaths(${fromArticleTitle}, ${toArticleTitle}) called`);

    // Cancel the previous request
    this.setState({
      isFetching: true,
    });

    setError(null);
    setShortestPaths(null);

    axios({
      method: 'get',
      url: `${SDOW_API_URL}/paths/${fromArticleTitle}/${toArticleTitle}`,
    })
      .then((response) => {
        // TODO: get thumbnails for each page
        // See https://stackoverflow.com/a/20311613/2955366
        // Example URL: https://en.wikipedia.org/w/api.php?action=query&titles=Fortification|Albert%20Einstein&prop=pageimages&format=json&pilimit=2
        setShortestPaths(response.data.paths);

        // TODO: measure the response time
        // See https://www.html5rocks.com/en/tutorials/webperformance/usertiming/

        this.setState({
          isFetching: false,
        });
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  }

  render() {
    const {toArticleTitle, fromArticleTitle, setError, setShortestPaths} = this.props;

    return (
      <GoButton
        onClick={this.fetchShortestPaths.bind(
          this,
          fromArticleTitle,
          toArticleTitle,
          setError,
          setShortestPaths
        )}
      >
        Go!
      </GoButton>
    );
  }
}

export default SearchButton;
