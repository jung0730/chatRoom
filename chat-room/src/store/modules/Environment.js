import { login } from '@/api/Environment'
import { setSessionstorage, getSessionstorage } from '@/utils/Sessionstorage'
import axios from 'axios'

const state = {
  uid: '',
  nickname: '',
  id: '',
  hostId: ''
}
const RAW_STATE = { ...state }
const mutations = {
  RESET(state, resetData) {
    Object.keys(state).forEach(key => {
      state[key] = resetData[key]
    })
  },
  SET_UID(state, uid) {
    state.uid = uid
  },
  SET_NICKNAME(state, name) {
    state.nickname = name
  },
  SET_ID(state, id) {
    state.id = id
  },
  SET_HOST_ID(state, id) {
    state.hostId = id
  }
}
const actions = {
  reset({ commit }) { commit('RESET', RAW_STATE) },
  init: async ({ commit, dispatch }) => {
    const uid = getSessionstorage('UID')
    const nickname = getSessionstorage('nickname')
    const id = getSessionstorage('id')
    const hostId = getSessionstorage('hostId')
    if (uid !== null) {
      commit('SET_UID', uid)
      commit('SET_NICKNAME', nickname)
      commit('SET_ID', id)
      commit('SET_HOST_ID', hostId)
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
        setSessionstorage('UID', uid)
        setSessionstorage('nickname', nickname)
        setSessionstorage('id', id)
        axios.defaults.headers.common['X-Request-UID'] = uid
      } else {
        throw new Error('error')
      }
    } catch(e) {
      throw e
    }
  },
  setHostId: async ({ commit, dispatch }, id) => {
    commit('SET_HOST_ID', id)
    setSessionstorage('hostId', id)
  },
  resetHostId: async ({ commit, dispatch }, id) => {
    commit('SET_HOST_ID', id)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}