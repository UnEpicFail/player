var SearchForm = React.createClass({

  getData: function(){
    var searchStr = this.state.searchStr.trim();

    if (searchStr.length === 0) {
      throw new Error("Empty search string");
    }
    //console.log(_config.server_url + _config.actions.search.action);
    http.get(_config.server_url + _config.actions.search.action,{
      q: searchStr,
      access_token: _config.access_token
    })
    .success(function(resp){
      if(resp.error)
        throw new Error(resp.error.error_code+' '+resp.error.error_msg);

      setList(resp.response.slice(1));
    })
    .error(function(){
      console.log('error', arguments);
    })
  },

  getInitialState: function() {
    return {
      searchStr: 'Miracle of Sound',
      list: []
    };
  },

  handleSearchChange: function(e){
    this.setState({searchStr: e.target.value});
  },

  setList: function(list){
    this.setState({list:list});
  },

  render: function(){
    return(
      <div>
        <input
          placeholder="Введите название"
          value={this.state.searchStr}
          onChange={this.handleSearchChange}
          />
        <input type="submit" name="Искать" onClick={this.getData} />
        <PlayList list={this.state.list} />
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
          {list.map(function(song, index){
            return <Song song={song} key={index} index={index} />;
          })}
        </ul>
      </div>
    )
  }
})

// var Player = React.createClass({
//   render: function(
//     <audio controls="controls">
//       <source src="{this.props.url}" type="audio/mpeg">
//     </audio>
//   )
// });

ReactDOM.render(<SearchForm />, document.getElementById('searchForm'));
//ReactDOM.render(<PlayList />, document.getElementById('playList'));
