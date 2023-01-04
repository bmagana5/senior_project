import axios from "axios";

const baseUrl = '/api/signup';

const signup = (credentials) => {
    const request = axios.post(baseUrl, credentials);
    return request.then(response => response.data);
};

const signupService = {
    signup
};

export default signupService;