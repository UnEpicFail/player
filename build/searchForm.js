var SearchForm = React.createClass({
  displayName: 'SearchForm',


  getData: function () {
    var searchStr = this.state.searchStr.trim();
    if (searchStr.length === 0) {
      throw new Error("Empty search string");
    }
    //console.log(_config.server_url + _config.actions.search.action);
    http.post(_config.server_url + _config.actions.search.action, {
      q: searchStr,
      access_token: _config.access_token
    }).success(function () {
      console.log('success', arguments);
    }).error(function () {
      console.log('error', srgumetns);
    });
    //(settings.server_url+settings.actions.search.action+'?q='+searchStr);
    //ReactDOM.render(<PlayList />, document.getElementById('list'));
  },

  getInitialState: function () {
    return { searchStr: '' };
  },

  handleSearchChange: function (e) {
    this.setState({ searchStr: e.target.value });
  },

  render: function () {
    return React.createElement(
      'div',
      null,
      React.createElement('input', {
        placeholder: 'Введите название',
        value: this.searchStr,
        onChange: this.handleSearchChange
      }),
      React.createElement('input', { type: 'submit', name: 'Искать', onClick: this.getData }),
      React.createElement('div', { id: 'list' })
    );
  }
});

var PlayList = React.createClass({
  displayName: 'PlayList',

  render: function () {
    return React.createElement(
      'div',
      null,
      '!!!!'
    );
  }
});
ReactDOM.render(React.createElement(SearchForm, null), document.getElementById('searchForm'));