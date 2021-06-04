const setSessionstorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value))
}

const getSessionstorage = (key) => {
  if (sessionStorage.getItem(key) === null) {
    return null
  } else {
    try {
      return JSON.parse(sessionStorage.getItem(key))
    } catch(e) {
      return null
    }
  }
}

const removeSessionstorage = (key = null) => {
  if (key === null) {
    sessionStorage.clear()
  } else {
    sessionStorage.removeItem(key)
  }
}

export {
  setSessionstorage,
  getSessionstorage,
  removeSessionstorage
}