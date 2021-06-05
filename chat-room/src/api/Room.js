import axios from 'axios'

const getRoom = (id) => {
  return axios.post(`${process.env.VUE_APP_API}/api/v1/club/join/${id}`)
}

export {
  getRoom
}