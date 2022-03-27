import axios from 'axios'

const url = 'http://localhost:8000/api';

const api = {
  login(email, password) {
    return axios.post(url+'/login', {
      email: email,
      password: password
    });
  },
  register(email, password, name) {
    return axios.post(url+'/register', {
      email: email,
      password: password,
      name: name
    });
  },
  verify(token) {
    return axios.post(url+'/verify', {
      token: token
    });
  },
  getProfile() {
    return axios(url+'/profile', {
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      }
    });
  },
  updateProfile(data) {
    return axios(url+'/profile', {
      method: 'put',
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      },
      data: data
    });
  },
  getDocuments() {
    return axios(url+'/document', {
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      }
    });
  }
}

export default api