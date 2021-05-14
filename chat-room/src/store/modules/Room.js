import { leave } from '@/api/Room'

const state = {}
const mutations = {}
const actions = {
  leave: async ({ commit, dispatch }) => {
    try {
      const { data } = await leave()
      if (data) {
        console.log(data)
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