class Form extends React.Component {
  state = { name: "Hello World" };

  render() {
    return (
      <form>
        <fieldset style={{ border: "none" }}>
          <legend>Business / Organization</legend>
          <label>Name</label>
          <input
            type="text"
            name="Company"
            placeHolder="Legal name of Organization"
            maxLenth="100"
            required
          />
          <label>Registered Address</label>
          <input
            type="text"
            name="AddressLine1"
            placeHolder="Address Line 1"
            required
          />
          <input
            type="text"
            name="AddressLine1"
            placeHolder="Address Line 1"
            required
          />
        </fieldset>
      </form>
    );
  }
}

ReactDOM.render(<Form />, document.getElementById("customForm"));
