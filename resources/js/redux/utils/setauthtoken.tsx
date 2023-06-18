import axios from 'axios';

// add a global header

const setAuthToken = (token:any) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] ="Bearer "+ token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
