import React from "react";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      timerStarted: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  startTimer(addedTime) {
    if (this.state.timerStarted) {
      return;
    }
    this.setState({ timerStarted: true });
    var deadline = new Date().getTime() + addedTime;
    setInterval(() => {
      var now = new Date().getTime();
      var t = deadline - now;
      if (t < 0) {
        clearInterval();
        this.setState({ timerStarted: false });
        return;
      }
      this.setState({ time: t });
    }, 1000);
  }

  handleStart() {
    const addedTime =
      this.state.seconds * 1000 +
      this.state.minutes * 1000 * 60 +
      this.state.hours * 1000 * 60 * 60 * 24;
    this.startTimer(addedTime);
  }

  handleReset() {}

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    const t = this.state.time;
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((t % (1000 * 60)) / 1000);
    const timeStr =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
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
            value="Start"
            onClick={() => this.handleStart()}
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
