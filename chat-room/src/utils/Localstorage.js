const setLocalstorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getLocalstorage = (key) => {
  if (localStorage.getItem(key) === null) {
    return null
  } else {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch(e) {
      return null
    }
  }
}

export {
  setLocalstorage,
  getLocalstorage
}