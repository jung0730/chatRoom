import { login } from '@/api/Environment'

const state = {}
const mutations = {}
const actions = {
  login: async ({ commit, dispatch }, { nickname }) => {
    try {
      const { data } = await login(nickname)
    } catch(e) {}
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}