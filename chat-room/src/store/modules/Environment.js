import { login } from '@/api/Environment'
import { setLocalstorage, getLocalstorage } from '@/utils/Localstorage'
import axios from 'axios'

const state = {
  uid: '',
  nickname: '',
  id: ''
}
const mutations = {
  SET_UID(state, uid) {
    state.uid = uid
  },
  SET_NICKNAME(state, name) {
    state.nickname = name
  },
  SET_ID(state, id) {
    state.id = id
  }
}
const actions = {
  init: async ({ commit, dispatch }) => {
    const uid = getLocalstorage('UID')
    const nickname = getLocalstorage('nickname')
    const id = getLocalstorage('id')
    if (uid !== null) {
      commit('SET_UID', uid)
      commit('SET_NICKNAME', nickname)
      commit('SET_ID', id)
      axios.defaults.headers.common['X-Request-UID'] = uid
    }
  },
  login: async ({ commit, dispatch }, { nickname }) => {
    try {
      const { data } = await login(nickname)
      if (data) {
        const uid = data.data.uid
        const nickname = data.data.nickname
        const id = data.data.id
        commit('SET_UID', uid)
        commit('SET_NICKNAME', nickname)
        commit('SET_ID', id)
        setLocalstorage('UID', uid)
        setLocalstorage('nickname', nickname)
        setLocalstorage('id', id)
        axios.defaults.headers.common['X-Request-UID'] = uid
      } else {
        throw new Error('error')
      }
    } catch(e) {
      throw e
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}