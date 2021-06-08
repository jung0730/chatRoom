import Vue from 'vue'
import Vuex from 'vuex'
import Environment from './modules/Environment'
import Rooms from './modules/Rooms'
import Room from './modules/Room'
import CodeTable from './modules/CodeTable'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    initEnvironment: async ({ dispatch}) => {
      dispatch('Environment/init')
    },
    reset({ dispatch }) {
      dispatch('CodeTable/reset')
      dispatch('Rooms/reset')
      dispatch('Environment/reset')
    }
  },
  modules: {
    Environment,
    Rooms,
    Room,
    CodeTable
  }
})
