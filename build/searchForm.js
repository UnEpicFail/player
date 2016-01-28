var SearchForm = React.createClass({
  displayName: "SearchForm",

  getData: function () {

    ReactDOM.render(React.createElement(PlayList, null), document.getElementById('list'));
  },

  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement("input", { name: "q", placeholder: "Введите название" }),
      React.createElement("input", { type: "submit", name: "Искать", onClick: this.getData }),
      React.createElement("div", { id: "list" })
    );
  }
});

var PlayList = React.createClass({
  displayName: "PlayList",

  render: function () {
    return React.createElement(
      "div",
      null,
      "!!!!"
    );
  }
});
ReactDOM.render(React.createElement(SearchForm, null), document.getElementById('searchForm'));