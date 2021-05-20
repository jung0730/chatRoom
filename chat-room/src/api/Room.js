import axios from 'axios'

const leave = () => {
  return axios.post(`${process.env.VUE_APP_API}/api/v1/club/leave`)
}

const getRoom = (id) => {
  return axios.post(`${process.env.VUE_APP_API}/api/v1/club/join/${id}`)
}

export {
  leave,
  getRoom
}