import { login } from '@/api/Environment'
import { setLocalstorage, getLocalstorage } from '@/utils/Localstorage'
import axios from 'axios'

const state = {
  uid: '',
  nickname: ''
}
const mutations = {
  SET_UID(state, uid) {
    state.uid = uid
  },
  SET_NICKNAME(state, name) {
    state.nickname = name
  }
}
const actions = {
  init: async ({ commit, dispatch }) => {
    const uid = getLocalstorage('UID')
    if (uid !== null) {
      commit('SET_UID', uid)
      axios.defaults.headers.common['X-Request-UID'] = uid
    }
  },
  login: async ({ commit, dispatch }, { nickname }) => {
    try {
      const { data } = await login(nickname)
      if (data) {
        const uid = data.data.uid
        const nickname = data.data.nickname
        commit('SET_UID', uid)
        commit('SET_NICKNAME', nickname)
        setLocalstorage('UID', uid)
        axios.defaults.headers.common['X-Request-UID'] = uid
      } else {
        throw new Error('error')
      }
    } catch(e) {}
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}