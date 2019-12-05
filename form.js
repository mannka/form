"use strict";

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return "You liked this.";
    }

    return React.createElement(
      "form",
      null,
      React.createElement("input", {
        type: "text",
        name: "Company",
        placeholder: "legal name of organization"
      })
    );
  }
}

const domContainer = document.querySelector("#customForm");
ReactDOM.render(e(LikeButton), domContainer);
