class Form extends React.Component {
  state = { name: "Hello World" };

  render() {
    return <h1>{this.state.name}</h1>;
  }
}

ReactDOM.render(<Form />, document.getElementById("customForm"));
