var SearchForm = React.createClass({

  getInitialState: function (){
    return {
      searchStr: this.props.searchStr
    };
  },

  handleSearchChange: function (e) {
    this.setState({searchStr: e.target.value});
  },

  callOnChange: function () {
    this.props.onChange(this.state.searchStr);
  },

  render: function () {
    return(
      <div>
        <input
          placeholder="Введите название"
          value={this.state.searchStr}
          onChange={this.handleSearchChange}
          />
        <input type="submit" name="Искать" onClick={this.callOnChange} />
      </div>
    );
  }
})

var Song = React.createClass({
  render: function(){
    var song = this.props.song,
      index = this.props.index;

    return (
      <li>{index} | {song.title}</li>
    )
  }
})

var PlayList = React.createClass({
  render: function(){
    var list = this.props.list;

    return (
      <div>
        <ul>
          {list.map((song, index) => {
            return <Song song={song} key={index} index={index} />;
          })}
        </ul>
      </div>
    )
  }
})

var Player = React.createClass({

  getInitialState: () => {
    return {
      searchStr:'Miracle of Sound',
      list: [],
      url: '',
      state: 'stop'
    };
  },


  setList: function (list) {
    this.setState({list:list});
  },

  changeSearch: function (string) {
    this.setState({searchStr:string});
    this.getData(string);
  },

  getData: function (searchStr) {

    if (searchStr.length === 0) {
      throw new Error("Empty search string");
    }

    http.get(_config.server_url + _config.actions.search.action,{
      q: searchStr,
      access_token: _config.access_token
    })
    .success((resp) => {
      if(resp.error)
        throw new Error(resp.error.error_code+' '+resp.error.error_msg);

      this.setList(resp.response.slice(1));
    })
    .error(() => {
      console.log('error', arguments);
    })
  },
  doStop:function(){console.log('doStop')},
  doPause:function(){console.log('doPause')},
  doNext:function(){console.log('doNext')},
  doPrew:function(){console.log('doPrew')},
  addListeners: function () {
    var element = document.getElementsByTagName('body')[0];
    console.log(this.doStop);
    element.addEventListener('STOP', this.doStop);
    element.addEventListener('PAUSE', this.doPause);
    element.addEventListener('NEXT', this.doNext);
    element.addEventListener('PREW', this.doPrew);
  },
  render: function() {
    this.addListeners()
    return (
      <div>
        <SearchForm onChange = {this.changeSearch} searchStr = {this.state.searchStr} />

        <PlayList list = {this.state.list} />
      </div>
    )
  }
});

ReactDOM.render(<Player />, document.getElementById('player'))
