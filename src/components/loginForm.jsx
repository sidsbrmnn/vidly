import React from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/auth';

class LoginForm extends Form {
    state = {
        data: { username: '', password: '' },
        errors: {}
    };

    schema = {
        username: Joi.string()
            .email()
            .required()
            .label('Username'),
        password: Joi.string()
            .min(6)
            .required()
            .label('Password')
    };

    doSubmit = async () => {
        try {
            const { username, password } = this.state.data;
            await auth.login(username, password);

            const { state } = this.props.location;
            window.location = state ? state.from.pathname : '/';
        } catch ({ response }) {
            if (response && response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = response.data;
                this.setState({ errors });
            }
        }
    };

    render() {
        if (auth.getCurrentUser()) return <Redirect to='/' />;
        return (
            <div className='row py-5'>
                <div className='col-lg-6 col-12'>
                    <h3>Login</h3>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput('username', 'Username', 'text', true)}
                        {this.renderInput('password', 'Password', 'password')}
                        {this.renderButton('Login')}
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;
