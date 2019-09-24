import React, { Component } from 'react';

class Login extends Component {
  state = {
    formData: {
      username: '',
      password: '',
    },
  };

  handleSubmit = e => {
    e.preventDefault();

    const { history } = this.props;

    // Simulate a login process

    history.push('/');
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  render() {
    const { formData } = this.state;

    return (
      <section className="py-5">
        <h1>Login</h1>

        <form className="mt-4" onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6 col-lg-4">
              <label htmlFor="username">Username</label>
              <input
                type="email"
                name="username"
                id="username"
                className="form-control"
                placeholder="Username"
                value={formData.username}
                onChange={this.handleChange}
                required
                autoFocus
                autoComplete="email"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6 col-lg-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Password"
                value={formData.password}
                onChange={this.handleChange}
                required
                autoComplete="current-password"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </section>
    );
  }
}

export default Login;
