import axios from 'axios';

axios.defaults.baseURL = 'http://backend-notaria-tambini.test/api';
axios.defaults.withCredentials = true;

export default axios;