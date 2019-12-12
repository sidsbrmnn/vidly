import http from './http';

const apiEndpoint = '/users';

export function register(user) {
    return http.post(apiEndpoint, {
        email: user.username,
        password: user.password,
        name: user.name
    });
}

export default { register };
