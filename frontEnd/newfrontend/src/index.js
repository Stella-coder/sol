import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthState } from "./utilities/AuthState";
import { Provider } from "react-redux";
import store  from "./utilities/store";

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthState>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();