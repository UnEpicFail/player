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
    this.props.onSelect(this.props.song.url, this.props.index);
  },
  render: function () {
    var song = this.props.song,
        index = this.props.index,
        hh = Math.floor(song.duration / 60),
        mm = song.duration % 60;

    if (mm < 10) {
      mm = '0' + mm;
    }
    return React.createElement(
      "li",
      null,
      React.createElement("input", { type: "button", onClick: this.select, value: !this.props.active ? '>' : '||' }),
      " ",
      index,
      " | ",
      hh,
      ":",
      mm,
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
      action: 'stop',
      active: -1
    };
  },

  setList: function (list) {
    this.setState({ list: list });
  },

  setUrl: function (url, index) {
    this.setState({
      url: url,
      active: index,
      action: 'play'
    });
    // setTimeout(function(){
    //     document.getElementsByTagName('audio')[0].play();
    // },500);
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
    this.setState({ action: 'stop' });
    // document.getElementsByTagName('audio')[0].pause();
  },

  doPause: function () {
    console.log('doPause');
    if (this.state.action == 'stop' || this.state.action == 'pause') {
      if (this.state.url == '') {
        if (this.state.list.length == 0) {
          return true;
        } else {
          this.setState({
            url: this.state.list[0].url,
            active: 0,
            action: 'play'
          });
        }
      } else {
        this.setState({
          action: 'play'
        });
      }
    } else {
      this.setState({ action: 'pause' });
    }
  },

  doNext: function () {
    console.log('doNext');
    var next;
    if (this.state.active == -1) {
      if (this.state.list.length == 0) {
        return true;
      } else {
        next = 0;
      }
    } else {
      next = this.state.active + 1;
      if (next == this.state.list.length) {
        next = 0;
      }
    }

    this.setState({
      url: this.state.list[next].url,
      active: next,
      action: 'play'
    });
  },

  doPrev: function () {
    console.log('doPrev');
    var prev;
    if (this.state.active == -1) {
      if (this.state.list.length == 0) {
        return true;
      } else {
        prev = this.state.list.length - 1;
      }
    } else {
      prev = this.state.active - 1;
      if (prev == -1) {
        prev = this.state.list.length - 1;
      }
    }
    this.setState({
      url: this.state.list[prev].url,
      active: prev,
      action: 'play'
    });
  },

  addListeners: function () {
    var element = document.getElementsByTagName('body')[0];
    element.addEventListener('STOP', this.doStop);
    element.addEventListener('PAUSE', this.doPause);
    element.addEventListener('NEXT', this.doNext);
    element.addEventListener('PREV', this.doPrev);
  },

  render: function () {
    this.addListeners();
    var list = this.state.list;
    return React.createElement(
      "div",
      null,
      React.createElement(Audio, { url: this.state.url, onEnded: this.doNext, action: this.state.action }),
      React.createElement(SearchForm, { onChange: this.changeSearch, searchStr: this.state.searchStr }),
      React.createElement(
        "ul",
        null,
        list.map((song, index) => {
          return React.createElement(Song, { song: song, key: index, onSelect: this.setUrl, index: index, active: index == this.state.active });
        })
      )
    );
  }
});

var Audio = React.createClass({
  displayName: "Audio",

  componentDidMount: function () {
    this.refs.audioElement.addEventListener('ended', this.props.onEnded);
  },
  componentWillUnmount: function () {
    this.refs.audioElement.removeEventListener('ended', this.props.onEndeds);
  },
  componentWillReceiveProps: function (props) {
    console.log('props', props);
    var action = props.action;
    if (action == 'stop' || action == 'pause') {
      this.refs.audioElement.pause();
    } else {
      setTimeout(() => {
        this.refs.audioElement.play();
      });
    }
  },
  render: function () {
    return React.createElement("audio", { src: this.props.url, ref: "audioElement" });
  }
});

ReactDOM.render(React.createElement(Player, null), document.getElementById('player'));