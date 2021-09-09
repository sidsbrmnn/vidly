import { Component } from "react";
import * as auth from "../services/auth";

class Logout extends Component {
  state = {};

  componentDidMount() {
    auth.logout();
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
