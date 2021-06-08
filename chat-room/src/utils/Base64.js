const encode = (str) => btoa(str)
const decode = (data) => atob(data)

export {
  encode,
  decode
}