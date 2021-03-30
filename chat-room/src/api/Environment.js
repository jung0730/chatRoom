import axios from 'axios'

const login = (nickname) => {
  return axios.post(`${process.env.VUE_APP_ERP_API}/api/v1/login`, {
    nickname
  })
}

export {
  login
}