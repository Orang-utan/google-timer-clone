import React from "react";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStarted: false,
      timeDiff: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  toggleTimer() {
    console.log(this.state);
    var deadline = new Date().getTime() + this.state.timeDiff;
    if (this.state.timeDiff === 0) {
      const addedTime =
        this.state.seconds * 1000 +
        this.state.minutes * 1000 * 60 +
        this.state.hours * 1000 * 60 * 60;
      deadline = new Date().getTime() + addedTime;
    }
    let timer = setInterval(() => {
      console.log(this.state);
      if (!this.state.timerStarted) {
        clearInterval(timer);
        return;
      }

      if (this.state.timeDiff < 0) {
        clearInterval(timer);
        this.setState({
          timerStarted: false,
          timeDiff: 0
        });
        return;
      }
      const now = new Date().getTime();
      const timeDiff = deadline - now;
      this.setState({ timeDiff: timeDiff });
    }, 1);
  }

  toggleStart() {
    const addedTime =
      this.state.seconds * 1000 +
      this.state.minutes * 1000 * 60 +
      this.state.hours * 1000 * 60 * 60;
    if (addedTime === 0) {
      return;
    }
    this.setState({ timerStarted: !this.state.timerStarted });
    this.toggleTimer();
  }

  handleReset() {
    this.setState({
      timerStarted: false,
      timeDiff: 0
    });
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    const t = this.state.timeDiff;
    var days;
    var hours;
    var minutes;
    var seconds;
    if (t > 0) {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((t % (1000 * 60)) / 1000);
    } else {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    }
    var timeStr = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    const startButton = this.state.timerStarted ? "Pause" : "Start";
    return (
      <div className="timer">
        <h2>Timer</h2>
        <h4>Time Remaining: {timeStr}</h4>
        <form>
          <ul>
            <li>
              <label>
                Hours:
                <input type="text" name="hours" onChange={this.handleChange} />
              </label>
            </li>
            <li>
              <label>
                Minutes:
                <input
                  type="text"
                  name="minutes"
                  onChange={this.handleChange}
                />
              </label>
            </li>
            <li>
              <label>
                Seconds:
                <input
                  type="text"
                  name="seconds"
                  onChange={this.handleChange}
                />
              </label>
            </li>
          </ul>
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
