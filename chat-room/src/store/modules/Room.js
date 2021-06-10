import { getRoom, leaveRoom } from '@/api/Room'

const state = {}
const mutations = {}
const actions = {
  getRoom: async ({ commit, dispatch }, id) => {
    try {
      await getRoom(id)
    } catch(e) {
      throw e
    }
  },
  leave: async ({ commit, dispatch }) => {
    try {
      await leaveRoom()
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