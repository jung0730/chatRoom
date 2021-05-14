import axios from 'axios'

const leave = () => {
  return axios.get(`${process.env.VUE_APP_API}/api/v1/club/leave`)
}

export {
  leave
}