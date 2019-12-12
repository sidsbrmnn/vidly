import http from './http';

const apiEndpoint = '/genres';

export function getGenres() {
    return http.get(apiEndpoint);
}

export default { getGenres };
