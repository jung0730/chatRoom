import { getCodes } from '@/api/CodeTable'

const state = {
  codes: {}
}
const RAW_STATE = { ...state }
const mutations = {
  SET_CODES(state, data) {
    state.codes = { ...state.codes, ...data }
  },
  RESET(state, resetData) {
    Object.keys(state).forEach(key => {
      state[key] = resetData[key]
    })
  }
}
const actions = {
  reset({ commit }) { commit('RESET', RAW_STATE) },
  fetchCodes: async ({ commit, state, dispatch }, types) => {
    try {
      const { data } = await getCodes([{ key: 'type', value: types }])
      if (data) {
        commit('SET_CODES', data.data)
      } else {
        throw new Error('error')
      }
    } catch (e) {
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