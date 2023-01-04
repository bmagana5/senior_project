import axios from 'axios';

const baseUrl = '/api/login';

const login = async (path, credentials) => {
    const response = await axios.post(`${baseUrl}/${path}`, credentials);
    return response.data;
};

const loginService = {
    login   
};

export default loginService;