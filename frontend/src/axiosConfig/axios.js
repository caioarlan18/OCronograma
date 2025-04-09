import axios from 'axios';
import baseurl from '../baseurl/Baseurl';
const api = axios.create(
    { baseURL: baseurl }
)


export default api