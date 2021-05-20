import axios from 'axios'

const getCodes = (parameter) => {
  const searchParams = new URLSearchParams()
  parameter.forEach(param => {
    searchParams.append(param.key, param.value)
  })
  return axios.get(`${process.env.VUE_APP_API}/api/v1/code?${searchParams.toString()}`)
}

export {
  getCodes
}