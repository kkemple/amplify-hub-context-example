import React, { Component } from "react";
import { withAuthenticator } from "aws-amplify-react";

import UserConsumer from "./User";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <UserConsumer>
            {user => (
              <p>
                {user.isLoggedIn
                  ? `Hello ${user.username}`
                  : `Edit <code>src/App.js</code> and save to reload.`}
              </p>
            )}
          </UserConsumer>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default withAuthenticator(App, true);
