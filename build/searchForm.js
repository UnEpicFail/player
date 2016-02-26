var SearchForm = React.createClass({
  displayName: "SearchForm",


  getInitialState: function () {
    return {
      searchStr: this.props.searchStr
    };
  },

  handleSearchChange: function (e) {
    this.setState({ searchStr: e.target.value });
  },

  callOnChange: function () {
    this.props.onChange(this.state.searchStr);
  },

  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement("input", {
        placeholder: "Введите название",
        value: this.state.searchStr,
        onChange: this.handleSearchChange
      }),
      React.createElement("input", { type: "submit", name: "Искать", onClick: this.callOnChange })
    );
  }
});

var Song = React.createClass({
  displayName: "Song",

  select: function (e) {
    this.props.onSelect(e.target.src);
  },
  render: function () {
    var song = this.props.song,
        index = this.props.index;

    return React.createElement(
      "li",
      null,
      React.createElement("input", { type: "button", onClick: this.select, src: song.url, value: ">" }),
      index,
      " | ",
      song.title
    );
  }
});

var Player = React.createClass({
  displayName: "Player",


  getInitialState: () => {
    return {
      searchStr: 'Miracle of Sound',
      list: [],
      url: '',
      state: 'stop'
    };
  },

  setList: function (list) {
    this.setState({ list: list });
  },

  setUrl: function (url) {
    this.setState({ url: url });
    setTimeout(function () {
      document.getElementsByTagName('audio')[0].play();
    }, 500);
  },

  changeSearch: function (string) {
    this.setState({ searchStr: string });
    this.getData(string);
  },

  getData: function (searchStr) {

    if (searchStr.length === 0) {
      throw new Error("Empty search string");
    }

    http.get(_config.server_url + _config.actions.search.action, {
      q: searchStr,
      access_token: _config.access_token
    }).success(resp => {
      if (resp.error) throw new Error(resp.error.error_code + ' ' + resp.error.error_msg);

      this.setList(resp.response.slice(1));
    }).error(() => {
      console.log('error', arguments);
    });
  },
  doStop: function () {
    console.log('doStop');
    document.getElementsByTagName('audio')[0].pause();
  },
  doPause: function () {
    console.log('doPause');
    document.getElementsByTagName('audio')[0].play();
  },
  doNext: function () {
    console.log('doNext');
  },
  doPrew: function () {
    console.log('doPrew');
  },
  addListeners: function () {
    var element = document.getElementsByTagName('body')[0];
    element.addEventListener('STOP', this.doStop);
    element.addEventListener('PAUSE', this.doPause);
    element.addEventListener('NEXT', this.doNext);
    element.addEventListener('PREW', this.doPrew);
  },
  render: function () {
    this.addListeners();
    var list = this.state.list;
    return React.createElement(
      "div",
      null,
      React.createElement(Audio, { url: this.state.url }),
      React.createElement(SearchForm, { onChange: this.changeSearch, searchStr: this.state.searchStr }),
      React.createElement(
        "ul",
        null,
        list.map((song, index) => {
          return React.createElement(Song, { song: song, key: index, onSelect: this.setUrl, index: index });
        })
      )
    );
  }
});

var Audio = React.createClass({
  displayName: "Audio",


  render: function () {

    return React.createElement("audio", { src: this.props.url });
  }
});

ReactDOM.render(React.createElement(Player, null), document.getElementById('player'));