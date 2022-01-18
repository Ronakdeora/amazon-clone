import axios from 'axios';
//library 
const instance = axios.create({
  baseURL: "http://localhost:5001/clone-938a5/us-central1/api", //cloud function URL
});

export default instance ;