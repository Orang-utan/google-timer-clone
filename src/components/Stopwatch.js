import React from "react";

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: 0,
      elapsedTime: 0,
      stopwatchStarted: false
    };
  }

  toggleStopwatch() {
    this.setState({ startTime: new Date().getTime() - this.state.elapsedTime });
    let stopWatch = setInterval(() => {
      if (!this.state.stopwatchStarted) {
        clearInterval(stopWatch);
        return;
      }

      var now = new Date().getTime();
      this.setState({
        elapsedTime: now - this.state.startTime
      });
    }, 1);
  }

  toggleStart() {
    this.setState({ stopwatchStarted: !this.state.stopwatchStarted });
    this.toggleStopwatch();
  }

  reset() {
    this.setState({
      startTime: 0,
      elapsedTime: 0,
      stopwatchStarted: false
    });
  }

  render() {
    const startButton = this.state.stopwatchStarted ? "Pause" : "Start";
    const t = this.state.elapsedTime;
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((t % (1000 * 60)) / 1000);
    var centiseconds = Math.floor((t % 1000) / 10);
    const timeStr =
      days +
      "d " +
      hours +
      "h " +
      minutes +
      "m " +
      seconds +
      "s " +
      centiseconds;

    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <h4>Time elapsed: {timeStr}</h4>
        <form>
          <input
            type="button"
            value={startButton}
            onClick={() => this.toggleStart()}
          />
          <input type="button" value="Reset" onClick={() => this.reset()} />
        </form>
      </div>
    );
  }
}

export default Stopwatch;
