class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    return <h1>Hello</h1>;
  }
}

ReactDOM.render(<Form />, document.getElementById("customForm"));
