import React from 'react';
import SearchField from 'react-search-field';

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
        {/* <SearchField
          placeholder="Search YouTube For NES Videos"
          onChange={this.handleChange}
          searchText=""
          classNames="nes-videos-search"
          onEnter={this.formSubmit}
          value={searchValue}
        /> */}

        <SearchField
          placeholder="Search YouTube For NES Videos"
          onChange={this.handleChange}
          searchText=""
          classNames="collectionSearch"
          onEnter={this.formSubmit}
          value={searchValue}
        />
      </div>
    );
  }
}

export default VideoSearch;
