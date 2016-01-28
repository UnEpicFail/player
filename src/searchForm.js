var SearchForm = React.createClass({

  getData: function(){


    ReactDOM.render(<PlayList />, document.getElementById('list'));
  },

  render: function(){
    return(
      <div>
        <input name="q" placeholder="Введите название" />
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
