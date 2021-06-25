import { StrictMode } from "react";
import ReactDOM from "react-dom";
//import './index.css';
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";
import { BrowserRouter as Router } from "react-router-dom";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </StrictMode>,
  rootElement
);
