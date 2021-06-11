import { getRoom, leaveRoom } from '@/api/Room'

const state = {}
const mutations = {}
const actions = {
  getRoom: async ({ commit, dispatch }, id) => {
    try {
      await getRoom(id)
    } catch(e) {
      throw e.response.data.error.message
    }
  },
  leave: async ({ commit, dispatch }) => {
    try {
      await leaveRoom()
    } catch(e) {
      throw e.response.data.error.message
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}