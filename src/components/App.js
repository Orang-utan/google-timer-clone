import React from "react";
import Timer from "./Timer";
import Stopwatch from "./Stopwatch";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Google Timer Clone</h1>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Timer</Link>
            </li>
            <li>
              <Link to="/stopwatch">Stopwatch</Link>
            </li>
          </ul>
          <Switch>
            <Route path="/stopwatch">
              <Stopwatch />
            </Route>
            <Route path="/">
              <Timer />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
