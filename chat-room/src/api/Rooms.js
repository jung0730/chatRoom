import axios from 'axios'

const getRooms = (parameter) => {
  const searchParams = new URLSearchParams()
  parameter.forEach(param => {
    searchParams.append(param.key, param.value)
  })
  return axios.get('/api/v1/club')
}

const postRoom = (parameter) => {
  return axios.post(`${process.env.VUE_APP_API}/api/v1/club`, parameter)
}

export {
  getRooms,
  postRoom
}