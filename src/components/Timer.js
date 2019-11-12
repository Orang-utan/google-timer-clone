import React from "react";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStarted: false,
      deadline: 0,
      addedTime: 0,
      timeDiff: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  toggleTimer() {
    var deadline;
    if (this.state.timeDiff !== 0) {
      deadline = new Date().getTime() + this.state.timeDiff;
    } else {
      deadline = new Date().getTime() + this.state.addedTime;
      console.log(deadline);
    }
    setInterval(() => {
      const now = new Date().getTime();
      const timeDiff = deadline - now;
      this.setState({ timeDiff: timeDiff });
    }, 1);
  }

  toggleStart() {
    this.setState({ timerStarted: !this.state.timerStarted });
    const addedTime =
      this.state.seconds * 1000 +
      this.state.minutes * 1000 * 60 +
      this.state.hours * 1000 * 60 * 60 * 24;
    this.setState({ addedTime: addedTime });
    this.toggleTimer();
  }

  handleReset() {}

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    const t = this.state.timeDiff;
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((t % (1000 * 60)) / 1000);
    const timeStr =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    const startButton = this.state.timerStarted ? "Pause" : "Start";
    return (
      <div className="timer">
        <h2>Timer</h2>
        <h4>Time Remaining: {timeStr}</h4>
        <form>
          <label>
            Hours:
            <input type="text" name="hours" onChange={this.handleChange} />
          </label>
          <label>
            Minutes:
            <input type="text" name="minutes" onChange={this.handleChange} />
          </label>
          <label>
            Seconds:
            <input type="text" name="seconds" onChange={this.handleChange} />
          </label>
          <input
            type="button"
            value={startButton}
            onClick={() => this.toggleStart()}
          />
          <input
            type="button"
            value="Reset"
            onClick={() => this.handleReset()}
          />
        </form>
      </div>
    );
  }
}

export default Timer;
