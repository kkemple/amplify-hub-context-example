import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { UserProvider } from "./User";
import aws_exports from "./aws-exports";

Amplify.configure(aws_exports);
window.LOG_LEVEL = "DEBUG";
ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
