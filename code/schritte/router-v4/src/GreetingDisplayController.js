import React from "react";
import LinkButtonBar from "./LinkButtonBar";

const BACKEND_URL = "http://localhost:7000/greetings";

export default class GreetingDisplayController extends React.Component {
  componentDidMount() {
    this.loadGreeting(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadGreeting(nextProps);
  }

  async loadGreeting(props) {
    const { match } = props;

    let greeting = null;
    try {
      const response = await fetch(`${BACKEND_URL}/${match.params.greetingId}`);
      greeting = await response.json();
    } catch (err) {
      console.error("LOADING GREETINGS FAILED:", err);
      return;
    }

    this.setState({ greeting });
  }

  render() {
    if (!this.state) {
      return <h1>No Greeting loaded</h1>;
    }

    const { greeting } = this.state;

    // In a real-world, more complex example the rendering of the greeting would go to it's own dump component
    return (
      <React.Fragment>
        <p>
          Your person greeting, <b>{greeting.name}</b>: <b>{greeting.greeting}</b>
        </p>
        <LinkButtonBar links={[{ title: "Home", target: "/" }, { title: "Add Greeting", target: "/add" }]} />
      </React.Fragment>
    );
  }
}
