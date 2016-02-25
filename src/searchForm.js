var SearchForm = React.createClass({

  getData: function(){
    var searchStr = this.state.searchStr.trim();
    if(searchStr.length === 0){
      throw new Error("Empty search string");
    }
    console.log(settings.server_url+settings.actions.search.action);
    //(settings.server_url+settings.actions.search.action+'?q='+searchStr);
    //ReactDOM.render(<PlayList />, document.getElementById('list'));
  },

  getInitialState: function() {
    return {searchStr: ''};
  },

  handleSearchChange: function(e){
    this.setState({searchStr: e.target.value});
  },

  render: function(){
    return(
      <div>
        <input
          placeholder="Введите название"
          value={this.searchStr}
          onChange={this.handleSearchChange}
          />
        <input type="submit" name="Искать" onClick={this.getData} />
        <div id="list">
        </div>
      </div>
    );
  }
})


var PlayList = React.createClass({
  render: function(){
    return (
      <div>
      !!!!
      </div>
    )
  }
})
ReactDOM.render(<SearchForm />, document.getElementById('searchForm'));
