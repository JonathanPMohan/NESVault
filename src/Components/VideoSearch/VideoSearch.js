import React from 'react';
import SearchField from 'react-search-field';

import YouTube from '../../images/youtube.png';

class VideoSearch extends React.Component {
  state = {
    searchValue: '',
  };

  handleChange = (value) => {
    this.setState({ searchValue: value });
  };

  formSubmit = (e) => {
    const { searchValue } = this.state;
    this.props.handleFormSubmit(searchValue);
  };

  render() {
    const { searchValue } = this.state;

    return (
      <div className="search-field">
        <SearchField
          placeholder="Search YouTube For NES Videos"
          onChange={this.handleChange}
          searchText=""
          classNames="collectionSearch"
          onEnter={this.formSubmit}
          value={searchValue}
        />
        <img src={YouTube} className="youtube-icon" alt="youtube-logo" />
      </div>
    );
  }
}

export default VideoSearch;
