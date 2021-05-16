import { leave, getRoom } from '@/api/Room'

const state = {}
const mutations = {}
const actions = {
  leave: async ({ commit, dispatch }) => {
    try {
      await leave()
    } catch(e) {
      throw e
    }
  },
  getRoom: async ({ commit, dispatch }, id) => {
    try {
      const data = await getRoom(id)
      if (data) {
        console.log(data)
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