import axios from 'axios'

const login = (nickname) => {
  return axios.post('api/v1/login', {
    nickname
  })
}

export {
  login
}