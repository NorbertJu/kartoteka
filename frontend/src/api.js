import axios from 'axios'

const url = 'http://localhost:8000/api';
//const url = 'https://kartoteka-backend.herokuapp.com/api'

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
  getUsers() {
    return axios(url+'/profile/all', {
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      }
    });
  },
  getDocuments() {
    return axios(url+'/document', {
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      }
    });
  },
  getDocument(id) {
    return axios(url+'/document/'+id, {
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      },
    });
  },
  getDocumentEdit(id) {
    return axios(url+'/document/edit/'+id, {
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      },
    });
  },
  updateDocument(data) {
    return axios(url+'/document', {
      method: 'put',
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      },
      data: data
    });
  },
  createDocument(data) {
    return axios(url+'/document', {
      method: 'post',
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      },
      data: data
    });
  },
  deleteDocument(id) {
    return axios(url+'/document/'+id, {
      method: 'delete',
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      }
    });
  },
  getProgress(id) {
    return axios(url+'/progress/'+id, {
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      }
    });
  },
  updateProgress(data) {
    return axios(url+'/progress', {
      method: 'put',
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      },
      data: data
    });
  },
  createProgress(data) {
    return axios(url+'/progress', {
      method: 'post',
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      },
      data: data
    });
  },
  getDocumentsProgress() {
    return axios(url+'/document/progress', {
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      }
    });
  },
  getNote(id) {
    return axios(url+'/note/'+id, {
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      }
    });
  },
  updateNote(data) {
    return axios(url+'/note', {
      method: 'put',
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      },
      data: data
    });
  },
  createNote(data) {
    return axios(url+'/note', {
      method: 'post',
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      },
      data: data
    });
  },
  getGroups() {
    return axios(url+'/group', {
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      }
    });
  },
  getGroup(id) {
    return axios(url+'/group/'+id, {
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      },
    });
  },
  getGroupEdit(id) {
    return axios(url+'/group/edit/'+id, {
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      },
    });
  },
  updateGroup(data) {
    return axios(url+'/group', {
      method: 'put',
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      },
      data: data
    });
  },
  createGroup(data) {
    return axios(url+'/group', {
      method: 'post',
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      },
      data: data
    });
  },
  deleteGroup(id) {
    return axios(url+'/group/'+id, {
      method: 'delete',
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      }
    });
  },
  getAssignments(id) {
    return axios(url+'/assignment/'+id, {
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      },
    });
  },
  updateAssignments(data) {
    return axios(url+'/assignment', {
      method: 'post',
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      },
      data: data
    });
  },
  getUserAssignments() {
    return axios(url+'/assignment/user', {
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      },
    });
  },
  getAssignmentProgress(id) {
    return axios(url+'/assignment/progress/'+id, {
      headers: {
        'Auth-Token': window.localStorage.getItem('Auth-Token')
      },
    });
  },
}

export default api