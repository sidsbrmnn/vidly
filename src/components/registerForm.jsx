import Joi from "joi-browser";
import React from "react";
import * as auth from "../services/auth";
import * as user from "../services/user";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(6).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const { headers } = await user.register(this.state.data);
      auth.loginWithJwt(headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="row py-5">
        <div className="col-lg-6 col-12">
          <h3>Register</h3>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username", "text", true)}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("name", "Name", "text")}
            {this.renderButton("Register")}
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
