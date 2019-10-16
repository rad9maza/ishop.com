import axios from 'axios';

const AxiosService = axios.create({
    baseURL: 'http://ishop.com/',
    responseType: 'json',
});

export default AxiosService