import React from "react";

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      stopwatchStarted: false
    };
  }

  toggleStart() {
    this.setState(prevState => ({
      ...prevState,
      stopwatchStarted: !this.state.stopwatchStarted
    }));
  }

  render() {
    const startButton = this.state.stopwatchStarted ? "Pause" : "Start";
    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <h4>Time elapsed: {this.state.time}</h4>
        <form>
          <input
            type="button"
            value={startButton}
            onClick={() => this.toggleStart()}
          />
          <input type="button" value="Reset" />
        </form>
      </div>
    );
  }
}

export default Stopwatch;
